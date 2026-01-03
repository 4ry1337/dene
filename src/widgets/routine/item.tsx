import { Routine } from '@/entities/routine'
import { Card, CardDescription, CardHeader, CardTitle } from '@/shared/ui'
import { View, ViewProps } from 'react-native'

type RoutineItemProp = ViewProps & React.RefAttributes<View> & {
  routine: Routine
}

const RoutineItem = ( { routine, ...props }: RoutineItemProp ) => {
  return (
    <Card {...props}>
      <CardHeader>
        <CardTitle>
          {routine.title}
        </CardTitle>
        <CardDescription>
          {routine.description}
        </CardDescription>
      </CardHeader>
    </Card>
  )
}

export { RoutineItem }
