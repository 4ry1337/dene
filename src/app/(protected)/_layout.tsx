import { Stack } from "expo-router"


const ProtectedLayout = () => {
  return (
    <Stack screenOptions={{
      headerShown: false
    }}>
      <Stack.Screen name="(tabs)" />
      <Stack.Screen name="settings" />
    </Stack>
  )
}

export default ProtectedLayout
