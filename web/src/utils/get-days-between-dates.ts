import dayjs from 'dayjs'
import duration from 'dayjs/plugin/duration'
dayjs.extend(duration)

function padWithLeadingZeros(num: number, totalLength: number) {
  return String(num).padStart(totalLength, '0')
}

export function getDaysBetweenDates(
  startDate: Date | undefined,
  endDate: Date | undefined,
  type: 'x' | 'y',
) {
  const dayStart = dayjs(startDate)
  const dayEnd = dayjs(endDate)

  const duration = dayjs.duration(dayEnd.diff(dayStart))

  const days = padWithLeadingZeros(duration.days(), 2)
  const hours = padWithLeadingZeros(duration.hours(), 2)
  const minutes = padWithLeadingZeros(duration.minutes(), 2)
  const seconds = padWithLeadingZeros(duration.seconds(), 2)

  const time =
    type === 'x'
      ? [`${days}D, ${hours}:${minutes}:${seconds}`]
      : [`${days}D`, `${hours}h`, `${minutes}m`, `${seconds}s`]

  return time
}
