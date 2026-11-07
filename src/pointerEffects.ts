import type { PointerEvent } from 'react'

// Spread onto an element to pull it toward the cursor; strength is the share of the cursor's offset from center.
export const magnet = (strength: number) => ({
  onPointerMove(e: PointerEvent<HTMLElement>) {
    if (e.pointerType !== 'mouse' || matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const rect = e.currentTarget.getBoundingClientRect()
    const x = (e.clientX - rect.left - rect.width / 2) * strength
    const y = (e.clientY - rect.top - rect.height / 2) * strength
    e.currentTarget.style.translate = `${x}px ${y}px`
  },
  onPointerLeave(e: PointerEvent<HTMLElement>) {
    e.currentTarget.style.translate = ''
  },
})

// Tells the element's CSS where the cursor is, for the glow that follows it.
export function spotlight(e: PointerEvent<HTMLElement>) {
  const rect = e.currentTarget.getBoundingClientRect()
  e.currentTarget.style.setProperty('--x', `${e.clientX - rect.left}px`)
  e.currentTarget.style.setProperty('--y', `${e.clientY - rect.top}px`)
}
