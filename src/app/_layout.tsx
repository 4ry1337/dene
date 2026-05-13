import { IBMPlexMono_500Medium, useFonts } from '@expo-google-fonts/ibm-plex-mono';
import '../global.css'
import * as SplashScreen from 'expo-splash-screen';
import { Stack } from "expo-router";
import * as React from 'react';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    IBMPlexMono_500Medium,
  });

  React.useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }
  return <Stack />;
}
