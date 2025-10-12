import { useSession } from "@/shared/hooks"
import { Stack } from "expo-router"


const ProtectedLayout = () => {
  useSession({ authenticated: true })

  return (
    <Stack screenOptions={{
      headerShown: false
    }}>
      <Stack.Screen name="(tabs)" />
      <Stack.Screen name="exercises" />
      <Stack.Screen name="settings" />
    </Stack>
  )
}

export default ProtectedLayout
