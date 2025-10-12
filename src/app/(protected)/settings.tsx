import { useSession } from '@/shared/hooks'
import { Text } from '@/shared/ui'
import { LoaderScreen } from '@/widgets'
import { SafeAreaView } from 'react-native-safe-area-context'

const SettingsScreen = () => {
  const { data, status } = useSession({ authenticated: true })

  if (status === "loading") {
    return <LoaderScreen />
  }

  return (
    <SafeAreaView>
      <Text>Settings</Text>
    </SafeAreaView>
  )
}

export default SettingsScreen
