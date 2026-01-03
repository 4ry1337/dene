import { MuscleGroup } from '@/entities/muscle'
import { cn } from '@/shared/lib'
import { Card, CardHeader, CardTitle } from '@/shared/ui'
import { View, ViewProps } from 'react-native'

type MuscleGroupItemProp = {
  muscle_group: MuscleGroup
}

const MuscleGroupItem = ( { muscle_group, className, ...props }: ViewProps & React.RefAttributes<View> & MuscleGroupItemProp ) => {
  return (
    <Card
      className={cn( className, '' )}
      {...props}>
      <CardHeader>
        <CardTitle>
          {muscle_group.title}
        </CardTitle>
      </CardHeader>
    </Card>
  )
}

export { MuscleGroupItem }
