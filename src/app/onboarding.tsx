import { useSession } from '@/shared/hooks'
import { Text } from '@/shared/ui'
import { Form } from 'react-hook-form'
import { View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const OnboardingScreen = () => {
  const { status } = useSession( { authenticated: false } )

  if ( status === "loading" ) {
    return ( <SafeAreaView className='flex-1 justify-center items-center'>
      <Text>
        Loading
      </Text>
    </SafeAreaView>
    )
  }

  return (
    <SafeAreaView className='flex-1'>
      <Text className='flex-1 text-center'>Loaded</Text>
    </SafeAreaView>
  )
}

export default OnboardingScreen
