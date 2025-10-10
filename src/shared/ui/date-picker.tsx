import { DatePicker as WheelDatePicker } from '@quidone/react-native-wheel-picker'

import { fromDateId, toDateId } from '../lib'
import { useTheme } from '../hooks'

const DatePicker = ( {
  date,
  onDateChanged,
  pickerStyle,
  itemTextStyle,
  overlayItemStyle,
  contentContainerStyle,
  minDate,
  maxDate,
  locale,
  ...props
}: Omit<React.ComponentProps<typeof WheelDatePicker>, "date" | "onDateChanged" | "minDate" | "maxDate"> & {
  date: Date
  onDateChanged: ( date: Date ) => void
  minDate?: Date
  maxDate?: Date
} ) => {
  const theme = useTheme()
  return (
    <WheelDatePicker
      locale={locale ?? 'en-UK'}
      minDate={minDate ? toDateId( minDate ) : undefined}
      maxDate={maxDate ? toDateId( maxDate ) : undefined}
      itemTextStyle={[ itemTextStyle, {
        color: theme.foreground
      } ]}
      pickerStyle={[ pickerStyle, {
        backgroundColor: theme.background,
        flexGrow: 1,
        flexShrink: 1,
        borderRadius: "100"
      } ]}
      overlayItemStyle={[ overlayItemStyle, {
        backgroundColor: theme.primary
      } ]}
      contentContainerStyle={[ contentContainerStyle ]}
      enableScrollByTapOnItem={true}
      nestedScrollEnabled={false}
      date={toDateId( date )}
      onDateChanged={( { date } ) => onDateChanged( fromDateId( date ) )}
      {...props}
    />
  )
}

export { DatePicker }
