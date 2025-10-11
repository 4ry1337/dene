import { useTheme } from '@/shared/hooks'
import { withOpacity } from '@/shared/lib'
import { Picker } from '@react-native-picker/picker'
import { View } from 'react-native'

const HeightPicker = ( {
  selectedValue,
  onValueChange,
  unit = "metric",
  ...props
}: React.ComponentProps<typeof Picker> & {
  unit?: "metric" | "imperial",
} ) => {
  const { colorScheme, theme } = useTheme()

  const metricOptions = Array.from( { length: 151 }, ( _, i ) => ( {
    label: `${100 + i} cm`,
    value: 100 + i
  } ) )

  const imperialOptions = Array.from( { length: 6 * 12 }, ( _, i ) => {
    const totalInches = 36 + i // Start from 3'0" (36 inches)
    const feet = Math.floor( totalInches / 12 )
    const inches = totalInches % 12

    return {
      label: `${feet}' ${inches}"`,
      value: totalInches // Store total inches (36-107 for 3'0" to 8'11")
    }
  } )

  return (
    <View className='border-border bg-background dark:bg-input dark:border-input border shadow-sm shadow-black/5 rounded-md px-4 py-2'>
      <Picker
        mode='dropdown'
        dropdownIconColor={theme.mutedForeground}
        style={{
          color: theme.foreground,
          backgroundColor: colorScheme === "dark" ? theme.input : theme.background,
        }}
        {...props}
      >
        {
          ( unit === "metric" ? metricOptions : imperialOptions )
            .map( ( item ) => (
              <Picker.Item
                key={item.value}
                style={{
                  color: theme.foreground,
                  backgroundColor: colorScheme === "dark" ? theme.input : theme.background,
                }}
                value={item.value}
                label={item.label}
              />
            ) )
        }
      </Picker>
    </View>
  )
}

export { HeightPicker }
