import { SafeAreaView } from 'react-native-safe-area-context'
import { Text } from '@/shared/ui'
import { useSession } from '@/shared/hooks'

const IndexScreen = () => {
  const { status } = useSession( { authenticated: true } )

  if ( status === "loading" ) {
    return (
      <SafeAreaView>
        <Text>Loading</Text>
      </SafeAreaView>
    )
  }

  return (
    <SafeAreaView>
      <Text>Home</Text>
    </SafeAreaView>
  )
}

export default IndexScreen 
