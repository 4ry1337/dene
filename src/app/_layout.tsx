import { useFonts } from 'expo-font'
import { SplashScreen, Stack } from "expo-router"
import { StatusBar } from "expo-status-bar"
import { useEffect } from 'react'
import { useColorScheme } from 'react-native'
import '../global.css'
import { NAV_THEME } from '@/shared/lib/theme'
import { ThemeProvider } from '@react-navigation/native'
import { PortalHost } from '@rn-primitives/portal'

const RootLayout = () => {
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

  return (
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
  )
}

export default RootLayout
