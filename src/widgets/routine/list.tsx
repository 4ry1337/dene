import { FlashList } from '@shopify/flash-list'
import { RoutineItem } from './item'
import { View } from 'react-native'
import { cn } from '@/shared/lib'
import { Routine } from '@/entities/routine'

type RoutineListProp = React.ComponentProps<typeof View> & {
  routines: Routine[]
}

const RoutineList = ( { className, routines, ...props }: RoutineListProp ) => {
  return (
    <View
      className={cn( "", className )}
      {...props}
    >
      <FlashList
        data={routines}
        renderItem={( { item } ) => <RoutineItem key={item.id} routine={item} />}
      />
    </View>
  )
}

export { RoutineList }
