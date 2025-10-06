import { useSession } from '@/shared/hooks'
import { SplashScreen } from 'expo-router'
import { openDatabaseSync } from 'expo-sqlite'
import { drizzle } from 'drizzle-orm/expo-sqlite'
import { useMigrations } from 'drizzle-orm/expo-sqlite/migrator'
import migrations from '@/shared/migrations/migrations'
import { DATABASE_NAME } from '@/shared/lib'
import { useEffect } from 'react'
import { View } from 'react-native'
import { Text } from '@/shared/ui'

const expo = openDatabaseSync( DATABASE_NAME )
const db = drizzle( expo, { logger: true } )

export const SplashScreenController = () => {
  const { success, error } = useMigrations( db, migrations )
  const { isLoading } = useSession()

  useEffect( () => {
    if ( !isLoading && success ) {
      SplashScreen.hide()
    }
  }, [ success, isLoading ] )


  if ( error ) {
    return (
      <View>
        <Text>Migration error: {error.message}</Text>
      </View>
    )
  }

  if ( !success && isLoading ) {
    return null
  }
}
