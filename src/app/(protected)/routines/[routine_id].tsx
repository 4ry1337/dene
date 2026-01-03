import { useLocalSearchParams } from "expo-router"
import { Text } from "@/shared/ui"
import { SafeAreaView } from "react-native-safe-area-context"

const ExerciseScreen = () => {
  const { exercise_id } = useLocalSearchParams()

  return (
    <SafeAreaView>
      <Text>
        Exercise ID: {exercise_id}
      </Text>
    </SafeAreaView>
  )
}

export default ExerciseScreen
