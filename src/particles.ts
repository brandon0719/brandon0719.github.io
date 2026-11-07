export type Point = { x: number; y: number }
export type Pointer = Point & { vx: number; vy: number }
export type Particle = {
  x: number
  y: number
  vx: number
  vy: number
  tx: number
  ty: number
  glow: number
  seed: number
  spring: number
}

const TAU = Math.PI * 2
const SPRING = 0.05
const DAMPING = 0.85
const REPEL_RADIUS = 110
const REPEL_FORCE = 3.2
const WIND = 0.06
const GLOW_FADE = 0.95
const BURST_RADIUS = 320
const BURST_FORCE = 26
export const DRIFT = 1.2

export function createParticles(count: number, width: number, height: number, random = Math.random): Particle[] {
  return Array.from({ length: count }, () => {
    const x = random() * width
    const y = random() * height
    return { x, y, vx: 0, vy: 0, tx: x, ty: y, glow: 0, seed: random() * TAU, spring: SPRING * (0.7 + random() * 0.6) }
  })
}

// Targets are shuffled, so wrapping spreads particles evenly and cutting off the extras still covers the whole shape.
export function assignTargets(particles: Particle[], targets: Point[]) {
  if (!targets.length) return
  particles.forEach((p, i) => {
    const target = targets[i % targets.length]
    p.tx = target.x
    p.ty = target.y
  })
}

export function pixelsToTargets(alpha: Uint8ClampedArray, width: number, height: number, gap: number, random = Math.random): Point[] {
  const targets: Point[] = []
  for (let y = 0; y < height; y += gap) {
    for (let x = 0; x < width; x += gap) {
      if (alpha[(y * width + x) * 4 + 3] > 128) targets.push({ x: x + random() * gap, y: y + random() * gap })
    }
  }
  for (let i = targets.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1))
    ;[targets[i], targets[j]] = [targets[j], targets[i]]
  }
  return targets
}

export function step(p: Particle, pointer: Pointer | null, time: number) {
  p.vx += (p.tx + Math.sin(time * 0.0006 + p.seed) * DRIFT - p.x) * p.spring
  p.vy += (p.ty + Math.cos(time * 0.0005 + p.seed * 1.7) * DRIFT - p.y) * p.spring

  if (pointer) {
    const dx = p.x - pointer.x
    const dy = p.y - pointer.y
    const distSq = dx * dx + dy * dy
    if (distSq > 0 && distSq < REPEL_RADIUS * REPEL_RADIUS) {
      const dist = Math.sqrt(distSq)
      const strength = 1 - dist / REPEL_RADIUS
      p.vx += (dx / dist) * strength * REPEL_FORCE + pointer.vx * strength * WIND
      p.vy += (dy / dist) * strength * REPEL_FORCE + pointer.vy * strength * WIND
      p.glow = Math.max(p.glow, strength * 1.6)
    }
  }

  p.vx *= DAMPING
  p.vy *= DAMPING
  p.x += p.vx
  p.y += p.vy
  p.glow *= GLOW_FADE
}

export function burst(particles: Particle[], x: number, y: number) {
  for (const p of particles) {
    const dx = p.x - x
    const dy = p.y - y
    const dist = Math.hypot(dx, dy)
    if (dist === 0 || dist > BURST_RADIUS) continue
    const strength = 1 - dist / BURST_RADIUS
    p.vx += (dx / dist) * strength * BURST_FORCE
    p.vy += (dy / dist) * strength * BURST_FORCE
    p.glow = 1
  }
}
