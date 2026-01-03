import { View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Avatar, AvatarFallback, AvatarImage, Button, Icon, Text } from '@/shared/ui'
import { useSession } from '@/shared/hooks'
import { LoaderScreen } from '@/widgets'
import { useRouter } from 'expo-router'
import { PlusIcon } from 'lucide-react-native'
import { useLiveQuery } from 'drizzle-orm/expo-sqlite'
import { drizzle_db } from '@/shared/lib'
import { muscle_group } from '@/entities/muscle'
import { MuscleGroupItem, MuscleGroupList } from '@/widgets/muscle_group'
import { FlashList } from '@shopify/flash-list'

const MainPage = () => {
  const router = useRouter()
  const { data, status } = useSession( { authenticated: true } )

  const muscle_groups = useLiveQuery( drizzle_db.select().from( muscle_group ) )

  if ( muscle_groups.error ) {
    console.error( muscle_groups.error )
  }

  console.log( muscle_groups.data )


  if ( status === "loading" ) {
    return <LoaderScreen />
  }

  return (
    <SafeAreaView>
      <View className='px-4 my-2 gap-2 flex-row items-center'>
        <Avatar className='size-14' alt={`${data.username}'s avatar`}>
          <AvatarImage />
          <AvatarFallback />
        </Avatar>
        <View>
          <Text variant="muted">Welcome</Text>
          <Text variant="h3">{data.username}</Text>
        </View>
      </View>
      <View className='px-4 my-2 border'>
        <View className='gap-2 flex-row justify-between items-center'>
          <Button
            variant={"secondary"}
            className='grow'
            onPress={() => router.navigate( "/exercises" )}
          >
            <Text variant={"large"}>
              Exercises
            </Text>
          </Button>
          <Button
            className='size-12'
            variant={"secondary"}
            onPress={() => router.navigate( "/exercises/new" )}
          >
            <Icon as={PlusIcon} />
          </Button>
        </View>
        {/* <View className='h-96'>
          <FlashList
            data={muscle_groups.data}
            renderItem={( { item } ) => <MuscleGroupItem className='mb-2' key={item.id} muscle_group={item} />}
          /> 
        </View> */}
      </View>
    </SafeAreaView>
  )
}

export default MainPage 
