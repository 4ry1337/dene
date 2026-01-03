import { Stack } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'

const RoutineLayout = () => {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: "Routines", }} />
      <Stack.Screen name="new" />
      <Stack.Screen name="[routine_id]" />
    </Stack>
  )
}

export default RoutineLayout
