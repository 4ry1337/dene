import { Text } from '@/shared/ui'
import { AnimatedDrawerScreenWrapper } from '@/widgets'
import { ScrollView } from 'react-native'

const PrivacyPolicyScreen = () => {
  return (
    <AnimatedDrawerScreenWrapper>
      <ScrollView className="flex-1 p-6 bg-background">
        <Text>
          Your privacy policy content goes here...
        </Text>
      </ScrollView>
    </AnimatedDrawerScreenWrapper>
  )
}

export default PrivacyPolicyScreen 
