import { useEffect, useRef } from 'react'
import { assignTargets, burst, createParticles, pixelsToTargets, step } from '../particles'
import type { Particle, Point } from '../particles'

const FONT = 'Archivo, "Helvetica Neue", Arial, sans-serif'
const MAX_PARTICLES = 10000
// Share of sampled text points that get a particle; high enough to keep small letters readable.
const COVERAGE = 0.8
const DOT_RADIUS = 0.75
const WIDE_SCREEN = 700
const DOT_COLOR = '#f4f4ef'
// Glow fades from the last accent at the cursor down to the first, then to DOT_COLOR. Read from CSS, where they animate.
const GLOW_ACCENTS = ['--accent-2', '--accent-3', '--accent-1']

type Props = {
  text: string
  onReady?: () => void
}

export default function ParticleStage({ text, onReady }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const textRef = useRef(text)
  const onReadyRef = useRef(onReady)
  const morphRef = useRef<() => void>(() => {})

  useEffect(() => {
    textRef.current = text
    morphRef.current()
  }, [text])

  useEffect(() => {
    const canvas = canvasRef.current!
    const ctx = canvas.getContext('2d')!
    const sampler = document.createElement('canvas')
    const samplerCtx = sampler.getContext('2d', { willReadFrequently: true })!
    const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches
    const targetCache = new Map<string, Point[]>()

    let particles: Particle[] = []
    let width = 0
    let height = 0
    let frameId = 0
    let onScreen = false
    let disposed = false
    let resizeTimer = 0
    let pointer: Point | null = null
    let lastPointer: Point | null = null

    function targetsFor(value: string) {
      const cached = targetCache.get(value)
      if (cached) return cached
      const lines = width < WIDE_SCREEN ? value.toUpperCase().split(' ') : [value.toUpperCase()]
      const lineHeight = 0.92
      sampler.width = width
      sampler.height = height
      samplerCtx.font = `900 100px ${FONT}`
      const widest = Math.max(...lines.map((line) => samplerCtx.measureText(line).width))
      const size = Math.min((100 * width * 0.92) / widest, (height * 0.8) / (lines.length * lineHeight))
      samplerCtx.font = `900 ${size}px ${FONT}`
      samplerCtx.textAlign = 'center'
      samplerCtx.textBaseline = 'middle'
      samplerCtx.fillStyle = '#fff'
      lines.forEach((line, i) => {
        samplerCtx.fillText(line, width / 2, height / 2 + (i - (lines.length - 1) / 2) * size * lineHeight)
      })
      const targets = pixelsToTargets(samplerCtx.getImageData(0, 0, width, height).data, width, height, 2)
      targetCache.set(value, targets)
      return targets
    }

    function draw() {
      ctx.clearRect(0, 0, width, height)
      const styles = getComputedStyle(document.documentElement)
      const colors = [DOT_COLOR, ...GLOW_ACCENTS.map((name) => styles.getPropertyValue(name))]
      // Grouped by color so each frame only needs a few fills.
      const paths = colors.map(() => new Path2D())
      for (const p of particles) {
        const path = paths[Math.min(colors.length - 1, Math.round(p.glow * (colors.length - 1)))]
        path.moveTo(p.x + DOT_RADIUS, p.y)
        path.arc(p.x, p.y, DOT_RADIUS, 0, Math.PI * 2)
      }
      paths.forEach((path, i) => {
        ctx.fillStyle = colors[i]
        ctx.fill(path)
      })
    }

    function frame(time: number) {
      const rect = canvas.getBoundingClientRect()
      const local = pointer && { x: pointer.x - rect.left, y: pointer.y - rect.top }
      const moved = local && lastPointer
        ? { ...local, vx: local.x - lastPointer.x, vy: local.y - lastPointer.y }
        : local && { ...local, vx: 0, vy: 0 }
      lastPointer = local
      for (const p of particles) step(p, moved, time)
      draw()
      frameId = requestAnimationFrame(frame)
    }

    function syncLoop() {
      const shouldRun = onScreen && !document.hidden && !reduced && particles.length > 0
      if (shouldRun && !frameId) frameId = requestAnimationFrame(frame)
      if (!shouldRun && frameId) {
        cancelAnimationFrame(frameId)
        frameId = 0
      }
    }

    function snapIfReduced() {
      if (!reduced) return
      for (const p of particles) {
        p.x = p.tx
        p.y = p.ty
      }
      draw()
    }

    function layout() {
      const rect = canvas.getBoundingClientRect()
      const nextWidth = Math.round(rect.width)
      const nextHeight = Math.round(rect.height)
      if (!nextWidth || !nextHeight || (nextWidth === width && nextHeight === height)) return
      width = nextWidth
      height = nextHeight
      const dpr = Math.min(devicePixelRatio, 2)
      canvas.width = width * dpr
      canvas.height = height * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      targetCache.clear()
      const targets = targetsFor(textRef.current)
      particles = createParticles(Math.min(MAX_PARTICLES, Math.round(targets.length * COVERAGE)), width, height)
      assignTargets(particles, targets)
      snapIfReduced()
      syncLoop()
    }

    morphRef.current = () => {
      if (!particles.length) return
      assignTargets(particles, targetsFor(textRef.current))
      snapIfReduced()
    }

    const onPointerMove = (e: PointerEvent) => {
      pointer = { x: e.clientX, y: e.clientY }
    }
    const onPointerEnd = (e: PointerEvent) => {
      if (e.type === 'pointerleave' || e.pointerType === 'touch') {
        pointer = null
        lastPointer = null
      }
    }
    const onPointerDown = (e: PointerEvent) => {
      if (reduced || !onScreen) return
      const rect = canvas.getBoundingClientRect()
      burst(particles, e.clientX - rect.left, e.clientY - rect.top)
    }
    const root = document.documentElement
    window.addEventListener('pointermove', onPointerMove, { passive: true })
    window.addEventListener('pointerdown', onPointerDown, { passive: true })
    window.addEventListener('pointerup', onPointerEnd, { passive: true })
    window.addEventListener('pointercancel', onPointerEnd, { passive: true })
    root.addEventListener('pointerleave', onPointerEnd)
    document.addEventListener('visibilitychange', syncLoop)

    const visibility = new IntersectionObserver(([entry]) => {
      onScreen = entry.isIntersecting
      syncLoop()
    })
    visibility.observe(canvas)

    const resize = new ResizeObserver(() => {
      if (!width) return
      clearTimeout(resizeTimer)
      resizeTimer = window.setTimeout(layout, 150)
    })
    resize.observe(canvas)

    // Sample only once the font is in, or after 2s fall back to the system font in FONT.
    const timeout = new Promise((done) => setTimeout(done, 2000))
    Promise.race([document.fonts.load(`900 100px ${FONT}`), timeout])
      .catch(() => {})
      .then(() => {
        if (disposed) return
        layout()
        onReadyRef.current?.()
      })

    return () => {
      disposed = true
      cancelAnimationFrame(frameId)
      clearTimeout(resizeTimer)
      morphRef.current = () => {}
      visibility.disconnect()
      resize.disconnect()
      window.removeEventListener('pointermove', onPointerMove)
      window.removeEventListener('pointerdown', onPointerDown)
      window.removeEventListener('pointerup', onPointerEnd)
      window.removeEventListener('pointercancel', onPointerEnd)
      root.removeEventListener('pointerleave', onPointerEnd)
      document.removeEventListener('visibilitychange', syncLoop)
    }
  }, [])

  return <canvas ref={canvasRef} aria-hidden="true" />
}
