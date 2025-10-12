import '../global.css'
import { useEffect } from 'react'
import { ThemeProvider } from '@react-navigation/native'
import { NAV_THEME } from '@/shared/lib/themes'
import { SplashScreen, Stack } from "expo-router"
import { StatusBar } from "expo-status-bar"
import { openDatabaseSync, SQLiteProvider } from 'expo-sqlite'
import { useColorScheme } from 'react-native'
import { PortalHost } from '@rn-primitives/portal'
import { drizzle } from 'drizzle-orm/expo-sqlite'
import { useMigrations } from 'drizzle-orm/expo-sqlite/migrator'
import migrations from '@/shared/migrations/migrations'
import { DATABASE_NAME } from '@/shared/lib'
import { SessionProvider } from '@/shared/hooks'

const expo = openDatabaseSync( DATABASE_NAME )
const db = drizzle( expo, { logger: true } )

const RootLayout = () => {
  const colorScheme = useColorScheme()

  const { success } = useMigrations( db, migrations )

  useEffect( () => {
    if ( success ) {
      SplashScreen.hide()
    }
  }, [ success ] )

  if ( !success ) {
    return null
  }

  return (
    <SQLiteProvider
      databaseName={DATABASE_NAME}
      options={{ enableChangeListener: true }}
    >
      <ThemeProvider value={NAV_THEME[ colorScheme ?? 'dark' ]}>
        <SessionProvider>
          <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
          <Stack screenOptions={{
            headerShown: false
          }}>
            <Stack.Screen name="onboarding" />
            <Stack.Screen name="settings" />
            <Stack.Screen name="+not-found" />
            <Stack.Screen name="(tabs)" />
            <Stack.Screen name="(marketing)" />
          </Stack>
          <PortalHost />
        </SessionProvider>
      </ThemeProvider>
    </SQLiteProvider>
  )
}

export default RootLayout
