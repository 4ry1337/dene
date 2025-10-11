/* import { useTheme } from '@/shared/hooks'
import WheelPicker from '@quidone/react-native-wheel-picker'
import { View } from 'react-native'
import { Text } from '@/shared/ui'

const HeightPicker = ( {
  value,
  onValueChanged,
  unit = "metric",
  itemTextStyle,
  overlayItemStyle,
  itemHeight,
  ...props
}: Omit<React.ComponentProps<typeof WheelPicker>, 'data' | 'onValueChanged'> & {
  unit?: "metric" | "imperial",
  onValueChanged: ( value: number ) => void
} ) => {
  const theme = useTheme()
  const metricOptions = Array.from( { length: 151 }, ( _, i ) => ( {
    label: `${100 + i}`,
    value: 100 + i
  } ) )

  // Generate imperial options: feet (3-8) and inches (0-11)
  const feetOptions = Array.from( { length: 6 }, ( _, i ) => ( {
    label: `${3 + i}`,
    value: 3 + i
  } ) )

  const inchOptions = Array.from( { length: 12 }, ( _, i ) => ( {
    label: `${i}`,
    value: i
  } ) )

return (
  <WheelPicker
    data={metricOptions}
    value={value}
    onValueChanged={( { item } ) => onValueChanged( item.value )}
    itemTextStyle={[ itemTextStyle, {
      color: theme.foreground,
      fontSize: 32
    } ]}
    itemHeight={itemHeight ?? 50}
    {...props}
  />
)
}

export { HeightPicker } */
