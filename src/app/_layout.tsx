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
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger, Card, CardContent, CardHeader, CardTitle, Text } from '@/shared/ui'
import { useDrizzleStudio } from 'expo-drizzle-studio-plugin'

const DATABASE_NAME = 'dene'

const RootLayout = () => {
  const expo = openDatabaseSync( DATABASE_NAME )
  const db = drizzle( expo, { logger: true } )

  const { success, error } = useMigrations( db, migrations )
  useDrizzleStudio( expo )

  const colorScheme = useColorScheme()
  const [ loaded ] = useFonts( {
    SpaceMono: require( '../../assets/fonts/Noto_Sans_Mono/NotoSansMono-VariableFont_wdth,wght.ttf' ),
  } )

  useEffect( () => {
    if ( loaded && success ) {
      SplashScreen.hide()
    }
  }, [ loaded, success ] )

  if ( !loaded && !success ) {
    return null
  }

  if ( error ) {
    return (
      <ThemeProvider value={NAV_THEME[ colorScheme ?? 'dark' ]}>
        <SafeAreaView>
          <Card>
            <CardHeader>
              <CardTitle>
                <Text>{error.name}</Text>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Accordion type='multiple'>
                <AccordionItem value=''>
                  <AccordionTrigger>
                    <Text>Error</Text>
                  </AccordionTrigger>
                  <AccordionContent>
                    <Text>Migration error: {error.message}</Text>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>
        </SafeAreaView>
      </ThemeProvider>
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
