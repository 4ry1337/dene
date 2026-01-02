import { useSession } from '@/shared/hooks'
import { LoaderScreen } from '@/widgets'
import { SafeAreaView } from 'react-native-safe-area-context'

const ProfileScreen = () => {
  const { status } = useSession( { authenticated: true } )

  if ( status === "loading" ) {
    return <LoaderScreen />
  }

  return (
    <SafeAreaView className="flex-1 p-4">
    </SafeAreaView>
  )
}

export default ProfileScreen
