import { DarkTheme, LightTheme } from '@/shared/themes'
import { DarkTheme as RNDarkTheme, DefaultTheme as RNLightTheme, ThemeProvider } from "@react-navigation/native"
import { useFonts } from 'expo-font'
import { SplashScreen, Stack } from "expo-router"
import { StatusBar } from "expo-status-bar"
import { useEffect } from 'react'
import { useColorScheme } from 'react-native'

export default function RootLayout() {
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
    <ThemeProvider value={colorScheme === 'dark' ? {
      ...RNDarkTheme,
      colors: {
        ...RNDarkTheme.colors,
        primary: DarkTheme.primary,
        background: DarkTheme.background,
        card: DarkTheme.surface,
        text: DarkTheme.foreground,
        border: DarkTheme.border,
        notification: DarkTheme.accent
      }
    } : {
      ...RNLightTheme,
      colors: {
        ...RNLightTheme.colors,
        primary: LightTheme.primary,
        background: LightTheme.background,
        card: LightTheme.surface,
        text: LightTheme.foreground,
        border: LightTheme.border,
        notification: LightTheme.accent
      }
    }}>
      <StatusBar />
      <Stack screenOptions={{
        headerShown: false
      }}>
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="+not-found" />
      </Stack>
    </ThemeProvider>
  )
}
