import { View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Button, Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, Label, Switch, Text, Textarea } from '@/shared/ui'
import * as Haptics from 'expo-haptics'
import * as React from 'react'

const MainScreen = () => {
  const [ checked, setChecked ] = React.useState( false )

  function onPress() {
    Haptics.impactAsync( Haptics.ImpactFeedbackStyle.Light )
    setChecked( ( prev ) => !prev )
  }

  function onCheckedChange( checked: boolean ) {
    Haptics.impactAsync( Haptics.ImpactFeedbackStyle.Light )
    setChecked( checked )
  }

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
          <Switch
            checked={checked}
            onCheckedChange={onCheckedChange}
            id="airplane-mode"
            nativeID="airplane-mode"
          />
        </CardFooter>
      </Card>
    </SafeAreaView>
  )
}

export default MainScreen 
