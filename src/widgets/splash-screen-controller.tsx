import { useSession } from '@/shared/hooks'
import * as SplashScreen from 'expo-splash-screen'
import { useMigrations } from 'drizzle-orm/expo-sqlite/migrator'
import { useEffect } from 'react'
import { View } from 'react-native'
import { Text } from '@/shared/ui'
import migrations from '@/shared/migrations/migrations'
import { drizzle_db, expo_db } from '@/shared/lib'
import { LoaderScreen } from './loading'
import { useDrizzleStudio } from 'expo-drizzle-studio-plugin'

export const SplashScreenController = () => {
  const { success, error } = useMigrations( drizzle_db, migrations )
  const { status } = useSession()
  useDrizzleStudio( expo_db as any )

  useEffect( () => {
    if ( status !== "loading" && success ) {
      SplashScreen.hide()
    }
  }, [ success, status ] )

  if ( !success && status === "loading" ) {
    return <LoaderScreen />
  }

  if ( error ) {
    return (
      <View>
        <Text>Migration error: {error.message}</Text>
      </View>
    )
  }

  return null
}
