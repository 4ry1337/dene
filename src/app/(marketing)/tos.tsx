import { Text } from '@/shared/ui'
import { AnimatedDrawerScreenWrapper } from '@/widgets'
import { ScrollView } from 'react-native'

const TermsOfServiceScreen = () => {
  return (
    <AnimatedDrawerScreenWrapper>
      <ScrollView className="flex-1 p-6 bg-background">
        <Text>
          Terms of Service
        </Text>
      </ScrollView>
    </AnimatedDrawerScreenWrapper>
  )
}

export default TermsOfServiceScreen
