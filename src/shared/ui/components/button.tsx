import { Platform, Pressable, processColor, StyleProp, useColorScheme, ViewStyle } from 'react-native'
import { TextStyleContext } from './text'
import { Theme } from '@/shared/themes'
import { TextStyle } from 'react-native/Libraries/StyleSheet/StyleSheetTypes'
import { useTheme } from '@/shared/hooks/useTheme'
import Color from 'color'
import { shadow_xs } from '../styles/shadow'

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'link' | 'destructive'
type ButtonSize = 'sm' | 'md' | 'lg' | 'icon'

const ButtonVariantStyle = ( theme: Theme, pressed?: boolean ): Record<ButtonVariant, StyleProp<ViewStyle>> => {
  return {
    'primary': {
      backgroundColor: theme.primary,
      ...( pressed && {
        backgroundColor: Color( theme.primary ).darken( 0.1 ).hexa()
      } ),
      ...shadow_xs,
    },
    'secondary': {
      backgroundColor: theme.secondary,
      ...( pressed && {
        backgroundColor: Color( theme.secondary ).darken( 0.2 ).hexa()
      } ),
      ...shadow_xs,
    },
    'outline': {
      borderWidth: 1,
      borderColor: theme.input,
      backgroundColor: theme.background,
      ...( pressed && {
        backgroundColor: theme.accent
      } ),
      ...shadow_xs,
    },
    'ghost': {
      backgroundColor: theme.background,
      ...( pressed && {
        backgroundColor: theme.accent
      } )
    },
    'link': {
      backgroundColor: theme.background,
    },
    'destructive': {
      backgroundColor: theme.destructive,
      ...( pressed && {
        backgroundColor: Color( theme.destructive ).darken( 0.1 ).hexa(),
      } ),
      ...shadow_xs,
    },
  }
}

const ButtonSizeStyle = ( theme: Theme, pressed?: boolean ): Record<ButtonSize, StyleProp<ViewStyle>> => {
  return {
    'sm': {
      height: 40,
      paddingHorizontal: 12,
      gap: 6,
    },
    'md': {
      height: 44,
      paddingHorizontal: 16,
      paddingVertical: 8,
    },
    'lg': {
      height: 48,
      paddingHorizontal: 24,
    },
    'icon': {
      height: 44,
      width: 44,
    },
  }
}

const TextVariantStyle = ( theme: Theme, pressed?: boolean ): Record<ButtonVariant, StyleProp<TextStyle>> => {
  return {
    'primary': {
      color: theme.primary_foreground
    },
    'secondary': {
      color: theme.secondary_foreground
    },
    'outline': {
      color: theme.foreground,
      ...( pressed && {
        color: theme.accent_foreground
      } )
    },
    'ghost': {
      color: theme.foreground,
      ...( pressed && {
        color: theme.accent_foreground
      } )
    },
    'link': {
      color: theme.primary,
      ...( pressed && {
        textDecorationLine: 'underline',
      } )
    },
    'destructive': {
      color: '#fff',
    },
  }
}

type ButtonProps = React.ComponentProps<typeof Pressable> &
  React.RefAttributes<typeof Pressable> & {
    variant?: ButtonVariant,
    size?: ButtonSize
  }

const Button = ( { style, variant = 'primary', size = 'md', disabled, children, ...props }: ButtonProps ) => {
  const theme = useTheme()
  return (
    <Pressable
      // className={cn( props.disabled && 'opacity-50', buttonVariants( { variant, size } ), className )}
      style={( { pressed } ) => [
        {
          display: "flex",
          flexDirection: 'row',
          borderRadius: theme.radius,
          alignItems: 'center',
          justifyContent: 'center',
          gap: 8,
        },
        ButtonSizeStyle( theme, pressed )[ size ],
        ButtonVariantStyle( theme, pressed )[ variant ],
        disabled && {
          opacity: 0.5
        }
      ]}
      disabled={disabled}
      role="button"
      accessibilityRole="button"
      {...props}
    >
      {( { hovered, pressed } ) => (
        <TextStyleContext.Provider
          value={[
            TextVariantStyle( theme, pressed )[ variant ],
            {
              fontSize: 14,
              fontWeight: '500',
              flexShrink: 0,
              textAlign: 'center',
            },
          ]}
        >
          {typeof children === 'function' ? children( { hovered, pressed } ) : children}
        </TextStyleContext.Provider>
      )}
    </Pressable>
  )
}

export { Button }
export type { ButtonProps }
