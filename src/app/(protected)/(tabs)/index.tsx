import { SafeAreaView } from 'react-native-safe-area-context'
import { Text } from '@/shared/ui'
import { useSession } from '@/shared/hooks'
import { LoaderScreen } from '@/widgets'

const MainPage = () => {
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

export default MainPage 
