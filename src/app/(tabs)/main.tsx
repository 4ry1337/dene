import { View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Button, Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, Label, Switch, Text, Textarea } from '@/shared/ui'

const MainScreen = () => {
  return (
    <SafeAreaView>
      <Text>Home</Text>
      <Card>
        <CardHeader>
          <CardTitle>
            Rakhat
          </CardTitle>
          <CardDescription>
            Rust developer
          </CardDescription>
        </CardHeader>
        <CardContent>
          <View>
            <Textarea />
          </View>
        </CardContent>
        <CardFooter>
          <Button>
            <Text>Subscribe</Text>
          </Button>
          <Button variant="outline">
            <Text>Later</Text>
          </Button>
        </CardFooter>
      </Card>
    </SafeAreaView>
  )
}

export default MainScreen 
