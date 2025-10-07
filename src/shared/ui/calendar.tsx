// import { Calendar, toDateId } from "@marceloterreiro/flash-calendar"
// import { useState } from "react"
// import { GestureResponderEvent, Text, View } from "react-native"
//
// /**
//  * Selection modes supported by DayPicker.
//  *
//  * - `single`: use DayPicker to select single days.
//  * - `multiple`: allow selecting multiple days.
//  * - `range`: use DayPicker to select a range of days.
//  */
// export type Mode = "single" | "multiple" | "range"
//
// /**
//  * Shared handler type for `onSelect` callback when a selection mode is set.
//  *
//  * @template T - The type of the selected item.
//  * @callback OnSelectHandler
//  * @param {T} selected - The selected item after the event.
//  * @param {Date} triggerDate - The date when the event was triggered.
//  * @param {GestureResponderEvent} e - The event object.
//  */
// export type OnSelectHandler<T> = (
//   selected: T,
//   triggerDate?: Date,
//   e?: GestureResponderEvent,
// ) => void
//
// /**
//  * An item in the calendar.
//  *
//  * @param {Date} date - The date of the day
//  * @param {boolean} isCurrentMonth - Whether the day belongs to the current month
//  */
// export type DayItem = {
//   date: Date | number
//   isCurrentMonth: boolean
// }
//
// export interface PropsSingle {
//   mode: "single"
//   selected: Date | undefined
//   onSelect?: OnSelectHandler<Date>
// }
//
//
// export type CalendarProps = PropsBase &
//   (
//     | PropsSingle
//     | PropsMulti
//     | PropsRange
//     | {
//       mode?: undefined
//       selected: Date | Date[] | DateRange | undefined
//       onSelect?: OnSelectHandler<any>
//     }
//   )
//
// export function Calendar( props: CalendarProps ) {
//   const {
//     showOutsideDays = true,
//     hideNavigation = false,
//     disableNavigation = false,
//     hideWeekdays = false,
//     className,
//     classNames,
//     timestamp,
//     dir = "ltr",
//     style,
//     locale,
//     selected,
//     expandable,
//     mode = "single",
//     captionLayout = "label",
//     fromYear,
//     toYear,
//   } = props
//
//   return (
//     <Calendar
//       calendarActiveDateRanges={[
//         {
//           startId: selectedDate,
//           endId: selectedDate,
//         },
//       ]}
//       calendarMonthId={today}
//       onCalendarDayPress={setSelectedDate}
//     />
//   )
// }
