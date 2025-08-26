import { View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Button, Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, Switch, Text, Textarea } from '@/shared/ui'
import { useState } from 'react'

const MainScreen = () => {
  const [ check, setCheck ] = useState( true )
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
          <Switch checked={check} onCheckedChange={( checked ) => setCheck( checked )} />
        </CardFooter>
      </Card>
    </SafeAreaView>
  )
}

export default MainScreen 
