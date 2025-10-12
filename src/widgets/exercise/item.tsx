import { Exercise } from '@/entities/exercise'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, Text } from '@/shared/ui'

type ExerciseItemProp = {
  exercise: Exercise
}

const ExerciseItem = ({ exercise }: ExerciseItemProp) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          {exercise.title}
        </CardTitle>
        <CardDescription>
          {exercise.description}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Text>
        </Text>
      </CardContent>
      <CardFooter>
        <Text>
        </Text>
      </CardFooter>
    </Card>
  )
}

export { ExerciseItem }
