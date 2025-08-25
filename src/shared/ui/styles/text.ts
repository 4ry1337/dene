import { TextStyle } from 'react-native'

type TextSize = 'sm' | 'md' | 'lg' | 'xl'

const TextSizeStyle: Record<TextSize, TextStyle> = {
  'sm': {
    fontSize: 16,
  },
  'md': {
    fontSize: 18,
  },
  'lg': {
    fontSize: 20,
  },
  'xl': {
    fontSize: 24,
  },
}

export { type TextSize, TextSizeStyle }
