/**
 * Returns the date formatted as YYYY-MM-DD, ensuring timezone doesn't affect
 * the result.
 */
export function toDateId( date: Date ) {
  const year = date.getFullYear()
  const month = date.getMonth() + 1 // getMonth() returns 0-11
  const day = date.getDate()

  // Pad single digit month and day with leading zeros
  const monthFormatted = month < 10 ? `0${month}` : month
  const dayFormatted = day < 10 ? `0${day}` : day

  return `${year}-${monthFormatted}-${dayFormatted}`
}

/**
 * Converts a date ID to a `Date` object, correctly accounting for timezone.
 */
export function fromDateId( dateId: string ) {
  const [ year, month, day ] = dateId.split( "-" ).map( Number )
  return new Date( year, month - 1, day )
}

/**
 * Returns the first day of the month for the given date.
 */
export function startOfMonth( date: Date ) {
  return new Date( date.getFullYear(), date.getMonth(), 1 )
}

/**
 * Returns the last day of the month for the given date.
 */
export function endOfMonth( date: Date ) {
  const nextMonth = new Date( date.getFullYear(), date.getMonth() + 1, 1 )
  const lastDay = new Date( nextMonth.getTime() - 1 )
  return new Date( lastDay )
}
