import { useTheme } from '@/shared/hooks'
import { Picker } from '@react-native-picker/picker'
import { View } from 'react-native'

const WeightPicker = ( {
  selectedValue,
  onValueChange,
  unit = "metric",
  ...props
}: React.ComponentProps<typeof Picker> & {
  unit?: "metric" | "imperial",
} ) => {
  const { colorScheme, theme } = useTheme()

  // Metric: 30-200 kg
  const metricOptions = Array.from( { length: 171 }, ( _, i ) => ( {
    label: `${30 + i} kg`,
    value: 30 + i
  } ) )

  // Imperial: 66-440 lbs (roughly 30-200 kg)
  const imperialOptions = Array.from( { length: 375 }, ( _, i ) => ( {
    label: `${66 + i} lbs`,
    value: 66 + i
  } ) )

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

export { WeightPicker }
