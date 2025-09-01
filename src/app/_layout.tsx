import { useFonts } from 'expo-font'
import { SplashScreen, Stack } from "expo-router"
import { StatusBar } from "expo-status-bar"
import { useEffect } from 'react'
import { useColorScheme } from 'react-native'
import '../global.css'
import { NAV_THEME } from '@/shared/lib/theme'
import { ThemeProvider } from '@react-navigation/native'
import { PortalHost } from '@rn-primitives/portal'
import { drizzle } from 'drizzle-orm/expo-sqlite'
import { openDatabaseSync, SQLiteProvider } from 'expo-sqlite'
import { useMigrations } from 'drizzle-orm/expo-sqlite/migrator'
import migrations from '@/shared/migrations/migrations'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Text } from '@/shared/ui'

const DATABASE_NAME = 'dene'
const expo = openDatabaseSync( DATABASE_NAME )
const db = drizzle( expo )

const RootLayout = () => {
  const { success, error } = useMigrations( db, migrations )

  const colorScheme = useColorScheme()
  const [ loaded ] = useFonts( {
    SpaceMono: require( '../../assets/fonts/Noto_Sans_Mono/NotoSansMono-VariableFont_wdth,wght.ttf' ),
  } )

  useEffect( () => {
    if ( loaded ) {
      SplashScreen.hide()
    }
  }, [ loaded ] )

  if ( !loaded ) {
    return null
  }

  if ( error ) {
    return (
      <SafeAreaView>
        <Text>Migration error: {error.message}</Text>
      </SafeAreaView>
    )
  }

  return (
    <SQLiteProvider
      databaseName={DATABASE_NAME}
      options={{ enableChangeListener: true }}
    >
      <ThemeProvider value={NAV_THEME[ colorScheme ?? 'dark' ]}>
        <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
        <Stack screenOptions={{
          headerShown: false
        }}>
          <Stack.Screen name="(tabs)" />
          <Stack.Screen name="+not-found" />
        </Stack>
        <PortalHost />
      </ThemeProvider>
    </SQLiteProvider>
  )
}

export default RootLayout
