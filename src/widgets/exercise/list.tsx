import { Exercise } from '@/entities/exercise'
import { FlashList } from '@shopify/flash-list'
import { ExerciseItem } from './item'
import { View } from 'react-native'
import { cn } from '@/shared/lib'

type ExerciseListProp = React.ComponentProps<typeof View> & {
  exercises: Exercise[]
}

const ExerciseList = ({ className, exercises, ...props }: ExerciseListProp) => {
  return (
    <View
      className={cn("", className)}
      {...props}
    >
      <FlashList
        data={exercises}
        renderItem={({ item }) => <ExerciseItem key={item.id} exercise={item} />}
      />
    </View>
  )
}

export { ExerciseList }
