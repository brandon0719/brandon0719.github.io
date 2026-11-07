const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
const MONTH = `(${MONTHS.join('|')})`
const DATE_RANGE = new RegExp(`^${MONTH} (\\d{4}) [–-] (?:${MONTH} (\\d{4})|Present)$`)
const monthNumber = (year: string, month: string) => Number(year) * 12 + MONTHS.indexOf(month)

// 'May 2025 – Aug 2025' becomes '4 mos'. Counts both end months, like LinkedIn. Returns '' for any other format.
export function tenure(dates: string, now = new Date()) {
  const match = dates.match(DATE_RANGE)
  if (!match) return ''
  const [, startMonth, startYear, endMonth, endYear] = match
  const end = endMonth ? monthNumber(endYear, endMonth) : now.getFullYear() * 12 + now.getMonth()
  const total = end - monthNumber(startYear, startMonth) + 1
  if (total < 1) return ''
  const years = Math.floor(total / 12)
  const months = total % 12
  return [
    years && `${years} ${years === 1 ? 'yr' : 'yrs'}`,
    months && `${months} ${months === 1 ? 'mo' : 'mos'}`,
  ].filter(Boolean).join(' ')
}
