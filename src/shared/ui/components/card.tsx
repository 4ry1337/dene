import { View, type ViewProps } from 'react-native'
import { Text, TextStyleContext } from './text'
import { useTheme } from '@/shared/hooks/useTheme'
import { shadow_sm } from '../styles/shadow'
import Color from 'color'
import { TextSize } from '../styles'

function Card( { style, ...props }: ViewProps & React.RefAttributes<View> ) {
  const theme = useTheme()
  return (
    <TextStyleContext.Provider value={{
      color: theme.surface_foreground
    }}>
      <View
        style={[ {
          display: 'flex',
          flexDirection: 'column',
          borderColor: theme.border,
          backgroundColor: theme.surface,
          gap: 24,
          borderRadius: theme.radius + 4,
          paddingVertical: 24,
          ...shadow_sm,
          shadowColor: Color( '#000' ).alpha( 0.5 ).hexa()
        },
          style ]}
        {...props}
      />
    </TextStyleContext.Provider>
  )
}

function CardHeader( { style, ...props }: ViewProps & React.RefAttributes<View> ) {
  return <View
    style={[
      {
        display: 'flex',
        flexDirection: 'column',
        gap: 6,
        paddingHorizontal: 24
      },
      style
    ]}
    {...props} />
}

function CardTitle( {
  style,
  size = 'xl',
  ...props
}: React.ComponentProps<typeof Text> & React.RefAttributes<Text> & { size?: TextSize } ) {
  return (
    <Text
      size={size}
      role="heading"
      aria-level={3}
      style={[
        {
          fontWeight: 'semibold',
        },
        style
      ]}
      {...props}
    />
  )
}

function CardDescription( {
  style,
  size = 'sm',
  ...props
}: React.ComponentProps<typeof Text> & React.RefAttributes<Text> & { size?: TextSize } ) {
  const theme = useTheme()

  return <Text
    size={size}
    style={[
      {
        color: theme.muted_foreground,
      },
      style
    ]}
    {...props} />
}

function CardContent( { style, ...props }: ViewProps & React.RefAttributes<View> ) {
  return <View
    style={[
      {
        paddingHorizontal: 24
      },
      style
    ]}
    {...props} />
}

function CardFooter( { style, ...props }: ViewProps & React.RefAttributes<View> ) {
  return <View
    style={[
      {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 24
      },
      style
    ]}
    {...props} />
}

export { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle }
