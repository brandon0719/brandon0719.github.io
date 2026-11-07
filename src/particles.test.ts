import assert from 'node:assert/strict'
import { test } from 'node:test'
import { DRIFT, assignTargets, burst, createParticles, pixelsToTargets, step } from './particles.ts'

const particleAt = (x: number, y: number) => {
  const [p] = createParticles(1, 0, 0)
  return Object.assign(p, { x, y, tx: x, ty: y })
}

test('particles spring back to their targets', () => {
  const p = particleAt(500, 500)
  p.tx = 10
  p.ty = 20
  for (let i = 0; i < 400; i++) step(p, null, 0)
  assert.ok(Math.hypot(p.x - 10, p.y - 20) < DRIFT * 2)
})

test('the pointer pushes nearby particles away and lights them up', () => {
  const p = particleAt(100, 100)
  step(p, { x: 80, y: 100, vx: 0, vy: 0 }, 0)
  assert.ok(p.x > 100)
  assert.ok(p.glow > 0)
})

test('the pointer leaves distant particles alone', () => {
  const near = particleAt(100, 100)
  const free = { ...near }
  step(near, { x: 2000, y: 2000, vx: 50, vy: 50 }, 0)
  step(free, null, 0)
  assert.deepEqual(near, free)
})

test('a pointer exactly on a particle does not produce NaN', () => {
  const p = particleAt(100, 100)
  step(p, { x: 100, y: 100, vx: 0, vy: 0 }, 0)
  assert.ok(Number.isFinite(p.x) && Number.isFinite(p.y))
})

test('burst pushes close particles and skips far ones', () => {
  const near = particleAt(100, 0)
  const far = particleAt(5000, 0)
  burst([near, far], 0, 0)
  assert.ok(near.vx > 0)
  assert.equal(far.vx, 0)
})

test('every particle gets a target when there are fewer targets than particles', () => {
  const particles = createParticles(10, 100, 100)
  const targets = [{ x: 1, y: 1 }, { x: 2, y: 2 }, { x: 3, y: 3 }]
  assignTargets(particles, targets)
  assert.ok(particles.every((p) => targets.some((t) => t.x === p.tx && t.y === p.ty)))
  assert.equal(new Set(particles.map((p) => p.tx)).size, 3)
})

test('every particle gets a target when there are more targets than particles', () => {
  const particles = createParticles(2, 100, 100)
  const targets = [{ x: 1, y: 1 }, { x: 2, y: 2 }, { x: 3, y: 3 }]
  assignTargets(particles, targets)
  assert.deepEqual(particles.map((p) => p.tx), [1, 2])
})

test('no targets leaves particles where they were', () => {
  const p = particleAt(5, 6)
  assignTargets([p], [])
  assert.equal(p.tx, 5)
})

test('only filled pixels become targets', () => {
  const pixels = new Uint8ClampedArray(2 * 2 * 4)
  pixels[3] = 255 // top-left pixel
  const targets = pixelsToTargets(pixels, 2, 2, 1, () => 0)
  assert.deepEqual(targets, [{ x: 0, y: 0 }])
})
