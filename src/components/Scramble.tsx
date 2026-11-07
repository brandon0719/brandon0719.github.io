import { useEffect, useState } from 'react'
import { useInView } from '../useInView'

const GLYPHS = '!<>/[]{}=+*?#_'
const MS_PER_CHARACTER = 45

// Text decodes from random symbols when it scrolls into view, and again on hover.
export default function Scramble({ text }: { text: string }) {
  const [ref, inView] = useInView()
  const [run, setRun] = useState(0)
  const [shown, setShown] = useState(text)

  useEffect(() => {
    if (!inView || matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const start = performance.now()
    let frameId = 0
    const tick = (now: number) => {
      const decoded = Math.floor((now - start) / MS_PER_CHARACTER)
      setShown(text.split('').map((character, i) => (
        i < decoded || character === ' ' ? character : GLYPHS[Math.floor(Math.random() * GLYPHS.length)]
      )).join(''))
      if (decoded < text.length) frameId = requestAnimationFrame(tick)
    }
    frameId = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frameId)
  }, [inView, run, text])

  return (
    <span
      ref={ref}
      onPointerEnter={(e) => {
        if (e.pointerType === 'mouse') setRun((n) => n + 1)
      }}
    >
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">{shown}</span>
    </span>
  )
}
