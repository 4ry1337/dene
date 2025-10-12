import { useSession } from '@/shared/hooks'
import { Text } from '@/shared/ui'
import { LoaderScreen } from '@/widgets'
import { SafeAreaView } from 'react-native-safe-area-context'

const ProfileScreen = () => {
  const { data, status } = useSession({ authenticated: true })

  if (status === "loading") {
    return <LoaderScreen />
  }

  return (
    <SafeAreaView className="flex-1 p-4">
      <Text variant="h3" className="mb-2">Welcome, {data.username}!</Text>
    </SafeAreaView>
  )
}

export default ProfileScreen
