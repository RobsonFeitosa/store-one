export function convertMinutesToTime(totalMinutes: number | undefined) {
  if (!totalMinutes) {
    return ''
  }
  const hours = String(Math.floor(totalMinutes / 60))
  const hoursFormat = ('0' + hours).slice(-2)
  const minutes = String(totalMinutes % 60).slice(-2)
  const minutesFormat = ('0' + minutes).slice(-2)

  return `${hoursFormat}:${minutesFormat}`
}
