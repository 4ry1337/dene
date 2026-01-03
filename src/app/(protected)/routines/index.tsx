import { routines } from '@/entities/routine'
import { useSession } from '@/shared/hooks'
import { drizzle_db } from '@/shared/lib'
import { LoaderScreen } from '@/widgets'
import { RoutineItem } from '@/widgets/routine/item'
import { FlashList } from '@shopify/flash-list'
import { eq } from 'drizzle-orm'
import { useLiveQuery } from 'drizzle-orm/expo-sqlite'
import { View } from 'react-native'

const RoutinesScreen = () => {
  const session = useSession( { authenticated: true } )

  if ( session.status === "loading" ) {
    return <LoaderScreen />
  }

  const routines_data = useLiveQuery( drizzle_db.select().from( routines ).where( eq( routines.created_by, session.data.user_id ) ) )

  return (
    <View className='px-4'>
      <View className='h-96'>
        <FlashList
          data={routines_data.data}
          renderItem={( { item } ) => <RoutineItem className='mb-2' key={item.id} routine={item} />}
        />
      </View>
    </View>
  )
}

export default RoutinesScreen
