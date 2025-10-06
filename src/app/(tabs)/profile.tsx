import { useSession } from '@/shared/hooks'
import { Text } from '@/shared/ui'
import { SafeAreaView } from 'react-native-safe-area-context'

const ProfileScreen = () => {
  const { data, status } = useSession( { authenticated: true } )

  if ( status === "loading" ) {
    return (
      <SafeAreaView>
        <Text>Loading</Text>
      </SafeAreaView>
    )
  }

  return (
    <SafeAreaView>
      <Text>Profile</Text>
      <Text>{data.username}</Text>
    </SafeAreaView>
  )
}

export default ProfileScreen
