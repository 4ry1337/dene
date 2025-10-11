// Convert cm to total inches
export const cmToInches = ( cm: number ) => {
  return Math.round( cm / 2.54 )
}

// Convert total inches to cm
export const inchesToCm = ( inches: number ) => {
  return Math.round( inches * 2.54 )
}

// Format total inches as "5' 9"" for display
export const formatInches = ( totalInches: number ) => {
  const feet = Math.floor( totalInches / 12 )
  const inches = totalInches % 12
  return `${feet}' ${inches}"`
}

// Parse "5' 9"" back to total inches (if needed for input)
export const parseHeightString = ( heightStr: string ) => {
  const match = heightStr.match( /(\d+)'\s*(\d+)"/ )
  if ( !match ) return null
  const [ , feet, inches ] = match
  return parseInt( feet ) * 12 + parseInt( inches )
}

// Convert kg to lbs
export const kgToLbs = ( kg: number ) => {
  return Math.round( kg * 2.20462 )
}

// Convert lbs to kg
export const lbsToKg = ( lbs: number ) => {
  return Math.round( lbs / 2.20462 )
}

// Format weight for display
export const formatWeight = ( value: number, unit: 'metric' | 'imperial' ) => {
  return unit === 'imperial' ? `${value} lbs` : `${value} kg`
}
