import { SafeAreaView } from 'react-native-safe-area-context'
import { Button, Text } from '@/shared/ui'
import { useSession } from '@/shared/hooks'
import { LoaderScreen } from '@/widgets'
import { useRouter } from 'expo-router'

const MainPage = () => {
  const router = useRouter()
  const { data, status } = useSession( { authenticated: true } )

  if ( status === "loading" ) {
    return <LoaderScreen />
  }

  return (
    <SafeAreaView className="flex-1 p-4">
      <Text variant="h3" className="mb-2">Welcome, {data.username}!</Text>
      <Button size={'sm'} variant={'link'} onPress={() => router.navigate( "/exercises" )}>
        <Text>
          Exercises
        </Text>
      </Button>
    </SafeAreaView>
  )
}

export default MainPage 
