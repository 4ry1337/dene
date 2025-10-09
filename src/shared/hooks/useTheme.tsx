import { useColorScheme } from 'nativewind'
import { THEME } from '../lib'

export function useTheme() {
  const { colorScheme } = useColorScheme()

  return THEME[ colorScheme ?? "dark" ]
}
