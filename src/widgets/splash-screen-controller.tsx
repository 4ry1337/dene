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

import { muscle_groups } from 'assets/data/muscle_groups.json'
import { muscle_group } from '@/entities/muscle'
// import data from 'assets/data/muscles.json'
// import data from 'assets/data/muscles.json'

export const SplashScreenController = () => {
  const { success, error } = useMigrations( drizzle_db, migrations )
  const { status } = useSession()

  useDrizzleStudio( expo_db as any )

  useEffect( () => {
    ( async () => {
      // TODO: separate migrations from splash screen controller
      if ( success ) {
        await drizzle_db.insert( muscle_group ).values( muscle_groups ).onConflictDoNothing()

        // await drizzle_db.insert( muscles ).values(
        //   fitnessData.muscles.map( ( { muscle_group, ...rest } ) => rest )
        // )
        //
        // await drizzle_db.insert( equipments ).values(
        //   fitnessData.equipment.map( ( { category, ...rest } ) => rest )
        // )
      }
      if ( status !== "loading" && success ) {
        SplashScreen.hide()
      }
    } )()
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
