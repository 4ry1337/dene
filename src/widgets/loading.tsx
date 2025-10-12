import { Text } from '@/shared/ui'
import { SafeAreaView } from 'react-native-safe-area-context'

export const LoaderScreen = () => {
  return (
    <SafeAreaView className='flex-1'>
      <Text variant={'h1'}>Loading</Text>
    </SafeAreaView>
  )
}
