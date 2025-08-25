import { View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useTheme } from '@/shared/hooks'
import { Button, Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, Text, Textarea, Switch } from '@/shared/ui/components'
import { useState } from 'react'

const MainScreen = () => {
  const theme = useTheme()
  const [ check, setCheck ] = useState( true )

  return (
    <SafeAreaView>
      <Text style={{
        color: theme.foreground,
      }}>Home</Text>
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
            <Switch
              value={check}
              onValueChange={() => setCheck( !check )}
            />
          </View>
        </CardContent>
        <CardFooter
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'stretch',
            gap: 8
          }}
        >
          <Button>
            <Text>Subscribe</Text>
          </Button>
          <Button variant="outline">
            <Text>Later</Text>
          </Button>
        </CardFooter>
      </Card>
      <Switch
        value={check}
        onValueChange={() => setCheck( !check )}
      />
    </SafeAreaView>
  )
}

export default MainScreen 
