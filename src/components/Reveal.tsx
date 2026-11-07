import type { CSSProperties, HTMLAttributes } from 'react'
import { useInView } from '../useInView'

type Props = HTMLAttributes<HTMLElement> & {
  as?: 'div' | 'li'
  // Position in its list, so items arrive one after another.
  index?: number
}

export default function Reveal({ as: Tag = 'div', index = 0, className = '', ...rest }: Props) {
  const [ref, inView] = useInView(0.15)
  return (
    <Tag
      ref={ref}
      className={`reveal ${className} ${inView ? 'in' : ''}`}
      style={{ '--n': index } as CSSProperties}
      {...rest}
    />
  )
}
