import { useEffect, useState } from 'react'
import Rise from './Rise'
import Scramble from './Scramble'

const SWAP_MS = 2400

export default function DayOff({ lead, activities }: { lead: string; activities: string[] }) {
  const [active, setActive] = useState(0)

  useEffect(() => {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const id = setInterval(() => setActive((i) => (i + 1) % activities.length), SWAP_MS)
    return () => clearInterval(id)
  }, [activities.length])

  const previous = (active - 1 + activities.length) % activities.length

  return (
    <section className="day-off">
      <p className="label"><Scramble text="(off the clock)" /></p>
      <div className="day-off-body">
        <p><Rise text={lead} /></p>
        {/* Every item stays in the DOM, so screen readers get the whole list and the height never jumps. */}
        <ul className="activities">
          {activities.map((activity, i) => (
            <li key={activity} className={i === active ? 'on' : i === previous ? 'was' : undefined}>
              {activity}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
