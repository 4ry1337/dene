import * as Slot from '@rn-primitives/slot'
import * as React from 'react'
import { Text as RNText, StyleProp, TextStyle } from 'react-native'

const TextStyleContext = React.createContext<StyleProp<TextStyle> | undefined>( undefined )

function Text( {
  className,
  asChild = false,
  style,
  ...props
}: React.ComponentProps<typeof RNText> &
  React.RefAttributes<RNText> & {
    asChild?: boolean
  } ) {
  const TextStyleProps = React.useContext( TextStyleContext )
  const Component = asChild ? Slot.Text : RNText
  return (
    <Component
      style={[
        TextStyleProps,
        style
      ]}
      {...props}
    />
  )
}

export { Text, TextStyleContext }
