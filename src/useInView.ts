import { useEffect, useState } from 'react'

// Flips to true the first time the element scrolls into view, and stays true.
export function useInView(threshold = 0.2) {
  const [element, setElement] = useState<Element | null>(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    if (!element) return
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return
      setInView(true)
      observer.disconnect()
    }, { threshold })
    observer.observe(element)
    return () => observer.disconnect()
  }, [element, threshold])

  return [setElement, inView] as const
}
