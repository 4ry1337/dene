import { useTheme } from '@/shared/hooks/useTheme'
import { Theme } from '@/shared/themes'
import * as Slot from '@rn-primitives/slot'
import * as React from 'react'
import { Text as RNText, StyleProp, TextStyle } from 'react-native'
import { TextSize, TextSizeStyle } from '../styles'

const TextStyleContext = React.createContext<StyleProp<TextStyle> | undefined>( undefined )

type TextProps = React.ComponentProps<typeof RNText> &
  React.RefAttributes<RNText> & {
    size?: TextSize,
    asChild?: boolean,
  }

const Text = ( {
  className,
  asChild = false,
  style,
  size = 'md',
  ...props
}: TextProps ) => {
  const theme = useTheme()
  const TextStyleProps = React.useContext( TextStyleContext )
  const Component = asChild ? Slot.Text : RNText
  return (
    <Component
      style={[
        {
          color: theme.foreground,
          fontSize: 18,
        },
        TextSizeStyle[ size ],
        TextStyleProps,
        style
      ]}
      {...props}
    />
  )
}

export { Text, TextStyleContext }
