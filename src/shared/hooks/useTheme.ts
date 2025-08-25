import { useColorScheme } from 'react-native'
import { DarkTheme, LightTheme, Theme } from '../themes'

/**
 * Hook that provides theme based on the device's color scheme
 * @returns {Theme} Theme object and utility properties
 */
export const useTheme = (): Theme => {
  const colorScheme = useColorScheme()

  return ( colorScheme ?? 'light' ) == 'light' ? LightTheme : DarkTheme
}
