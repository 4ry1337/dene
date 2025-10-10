// Convert cm to feet and inches
export const cmToFeetInches = ( cm: number ) => {
  const totalInches = cm / 2.54
  const feet = Math.floor( totalInches / 12 )
  const inches = Math.round( totalInches % 12 )
  return { feet, inches }
}

// Convert feet and inches to cm
export const feetInchesToCm = ( feet: number, inches: number ) => {
  return Math.round( ( feet * 12 + inches ) * 2.54 )
}
