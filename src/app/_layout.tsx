import '../global.css'
import * as SplashScreen from 'expo-splash-screen'
import { NAV_THEME, DATABASE_NAME } from '@/shared/lib'
import { useColorScheme } from 'react-native'
import { SQLiteProvider } from 'expo-sqlite'
import { SessionProvider, useSession } from '@/shared/hooks'
import { SplashScreenController } from '@/widgets'
import { ThemeProvider } from '@react-navigation/native'
import { Stack } from "expo-router"
import { StatusBar } from "expo-status-bar"
import { PortalHost } from '@rn-primitives/portal'

// Set the animation options. This is optional.
SplashScreen.setOptions({
  duration: 1000,
  fade: true,
})

/* **Important note**: It is recommended to call this in global scope without awaiting, rather than inside React components or hooks, because otherwise this might be called too late, when the splash screen is already hidden.
 */
SplashScreen.preventAutoHideAsync()

const RootNavigator = () => {
  const { status } = useSession()
  const isAuthenticated = status === "authenticated"

  return (
    <Stack screenOptions={{
      headerShown: false
    }}>
      <Stack.Protected guard={isAuthenticated}>
        <Stack.Screen name="(protected)" />
      </Stack.Protected>

      <Stack.Protected guard={!isAuthenticated}>
        <Stack.Screen name="onboarding" />
        <Stack.Screen name="(marketing)" />
      </Stack.Protected>

      <Stack.Screen name="+not-found" />
    </Stack>
  )
}

const RootLayout = () => {
  const colorScheme = useColorScheme()

  return (
    <SQLiteProvider
      databaseName={DATABASE_NAME}
      options={{ enableChangeListener: true }}
    >
      <SessionProvider>
        <SplashScreenController />
        <ThemeProvider value={NAV_THEME[colorScheme ?? 'dark']}>
          <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
          <RootNavigator />
          <PortalHost />
        </ThemeProvider>
      </SessionProvider>
    </SQLiteProvider>
  )
}

export default RootLayout
