import { Text } from '@/shared/ui'
import { View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const NewExercisePage = () => {
  return (
    <SafeAreaView className="flex-1 p-4">
      <View>
        <Text>
          New Exercise
        </Text>
      </View>
    </SafeAreaView>
  )
}

export default NewExercisePage
