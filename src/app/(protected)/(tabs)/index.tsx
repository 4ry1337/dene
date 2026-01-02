import { View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Avatar, AvatarFallback, AvatarImage, Button, Icon, Text } from '@/shared/ui'
import { useSession } from '@/shared/hooks'
import { LoaderScreen } from '@/widgets'
import { useRouter } from 'expo-router'
import { PlusIcon } from 'lucide-react-native'

const MainPage = () => {
  const router = useRouter()
  const { data, status } = useSession( { authenticated: true } )

  if ( status === "loading" ) {
    return <LoaderScreen />
  }

  return (
    <SafeAreaView className="flex-1 p-4">
      <View className='flex-row items-center gap-4 bg-slate-300'>
        <Avatar className='size-12' alt={`${data.username}'s avatar`}>
          <AvatarImage />
          <AvatarFallback />
        </Avatar>
        <View>
          <Text variant="h4">Welcome</Text>
          <Text variant="h3">{data.username}</Text>
        </View>
      </View>
      <View className='flex-row justify-between items-center'>
        <Button
          variant={"link"}
          onPress={() => router.navigate( "/exercises" )}
        >
          <Text>
            Exercises
          </Text>
        </Button>
        <Button
          variant={"link"}
          onPress={() => router.navigate( "/exercises/new" )}
        >
          <Icon as={PlusIcon} />
        </Button>
      </View>
    </SafeAreaView>
  )
}

export default MainPage 
