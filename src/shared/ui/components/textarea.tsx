import { useTheme } from '@/shared/hooks/useTheme'
import { TextInput, type TextInputProps } from 'react-native'
import { shadow_sm } from '../styles/shadow'
import { TextSize, TextSizeStyle } from '../styles'

type TextareaProps = TextInputProps & React.RefAttributes<TextInput> & {
  size?: TextSize
}

const Textarea = ( {
  style,
  multiline = true,
  editable,
  numberOfLines = 4,
  placeholderTextColor,
  size = 'md',
  ...props
}: TextareaProps ) => {
  const theme = useTheme()
  return (
    <TextInput
      style={[
        shadow_sm,
        {
          display: 'flex',
          flexDirection: 'row',
          width: '100%',
          minHeight: 64,
          paddingHorizontal: 12,
          paddingVertical: 8,
          color: theme.foreground,
          backgroundColor: theme.background,
          borderWidth: 1,
          borderColor: theme.input,
          borderRadius: theme.radius,
          userSelect: 'contain',
        },
        TextSizeStyle[ size ],
        editable === false && {
          opacity: 0.5
        },
        style,
      ]}
      placeholderTextColor={placeholderTextColor ?? theme.muted_foreground}
      multiline={multiline}
      numberOfLines={numberOfLines}
      textAlignVertical="top"
      {...props}
    />
  )
}

export { Textarea }
