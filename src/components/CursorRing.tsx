import { useEffect, useRef } from 'react'

const FOLLOW = 0.16
const LINK_SCALE = 2.2

export default function CursorRing() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!matchMedia('(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)').matches) return
    const ring = ref.current!
    const goal = { x: 0, y: 0, scale: 1 }
    const now = { x: 0, y: 0, scale: 1 }
    let frameId = 0
    let shown = false

    function frame() {
      now.x += (goal.x - now.x) * FOLLOW
      now.y += (goal.y - now.y) * FOLLOW
      now.scale += (goal.scale - now.scale) * FOLLOW
      ring.style.transform = `translate(${now.x}px, ${now.y}px) scale(${now.scale})`
      const settled = Math.abs(goal.x - now.x) + Math.abs(goal.y - now.y) + Math.abs(goal.scale - now.scale) < 0.05
      frameId = settled ? 0 : requestAnimationFrame(frame)
    }
    const wake = () => {
      if (!frameId) frameId = requestAnimationFrame(frame)
    }
    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') return
      goal.x = e.clientX
      goal.y = e.clientY
      if (!shown) {
        shown = true
        now.x = goal.x
        now.y = goal.y
        ring.style.opacity = '1'
      }
      wake()
    }
    const onOver = (e: PointerEvent) => {
      goal.scale = (e.target as Element).closest('a') ? LINK_SCALE : 1
      wake()
    }
    const onLeave = () => {
      shown = false
      ring.style.opacity = '0'
    }

    const root = document.documentElement
    window.addEventListener('pointermove', onMove, { passive: true })
    window.addEventListener('pointerover', onOver, { passive: true })
    root.addEventListener('pointerleave', onLeave)
    return () => {
      cancelAnimationFrame(frameId)
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerover', onOver)
      root.removeEventListener('pointerleave', onLeave)
    }
  }, [])

  return <div ref={ref} className="cursor-ring" aria-hidden="true" />
}
