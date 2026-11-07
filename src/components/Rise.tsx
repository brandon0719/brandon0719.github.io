import { Fragment } from 'react'
import type { CSSProperties } from 'react'
import { useInView } from '../useInView'

// Words slide up from behind a mask the first time the text scrolls into view.
export default function Rise({ text }: { text: string }) {
  const [ref, inView] = useInView()

  return (
    <span ref={ref} className={inView ? 'in' : undefined}>
      {text.split(' ').map((word, i) => (
        <Fragment key={i}>
          <span className="word">
            <span style={{ '--i': i } as CSSProperties}>{word}</span>
          </span>{' '}
        </Fragment>
      ))}
    </span>
  )
}
