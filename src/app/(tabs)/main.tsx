import { StyleSheet, useColorScheme, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Text } from '@/shared/ui/components/text'
import { useTheme } from '@/shared/hooks/useTheme'
import { Button } from '@/shared/ui/components/button'
import { HomeIcon } from 'lucide-react-native'

export default function MainScreen() {
  const theme = useTheme()

  return (
    <SafeAreaView>
      <Text style={{
        color: theme.foreground,
      }}>Home</Text>
      <View style={{
        flexDirection: 'column',
        paddingHorizontal: 10,
        gap: 8,
      }}>
        <Button>
          <Text>Home</Text>
          <HomeIcon color={theme.primary_foreground} />
        </Button>
        <Button variant='secondary'>
          <Text>Secondary</Text>
        </Button>
        <Button size='lg' variant='outline'>
          <Text>Outline</Text>
        </Button>
        <Button variant='ghost'>
          <Text>Ghost</Text>
        </Button>
        <Button variant='link'>
          <Text>Link</Text>
        </Button>
        <Button variant='destructive'>
          <Text>Link</Text>
        </Button>
      </View>
    </SafeAreaView>
  )
}
