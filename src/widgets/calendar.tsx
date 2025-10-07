/* function Calendar(
  currentMonth: Date, min_date_id: string, setCurrentMonth, ref, today: Date, today_id: string, form ) {
  return <View className=''>
    <View className='flex-row justify-between items-center'>
      <Button
        size={"icon"}
        disabled={toDateId( startOfMonth( currentMonth ) ) === min_date_id}
        onPress={() => {
          const pastMonth = subMonths( currentMonth, 1 )
          setCurrentMonth( pastMonth )
          ref.current?.scrollToMonth( pastMonth, true )
        }}
      >
        <ChevronLeft />
      </Button>
      <Text>{format( currentMonth, "MMMM yyyy" )}</Text>
      <Button
        size={"icon"}
        disabled={toDateId( startOfMonth( currentMonth ) ) === toDateId( startOfMonth( today ) )}
        onPress={() => {
          const nextMonth = addMonths( currentMonth, 1 )
          setCurrentMonth( nextMonth )
          ref.current?.scrollToMonth( nextMonth, true )
        }}
      >
        <ChevronRight />
      </Button>
    </View>
    <View className=''>
      <Calendar
        calendarMaxDateId={today_id}
        calendarMinDateId={min_date_id}
        calendarMonthId={toDateId( currentMonth )}
        onCalendarDayPress={( e ) => {
          ref.current?.scrollToDate( fromDateId( e ), true )
          form.setValue( "date_of_birth", fromDateId( e ) )
        }} />
    </View>
  </View>
} */
