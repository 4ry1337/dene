import { useSession } from '@/shared/hooks'
import { Text } from '@/shared/ui'
import { Tabs } from 'expo-router'
import { Home, User } from 'lucide-react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

const TabLayout = () => {
  const { status } = useSession( {
    authenticated: true
  } )

  if ( status === "loading" ) {
    return ( <SafeAreaView className='flex-1'>
      <Text>Loading</Text>
    </SafeAreaView> )
  }

  return (
    <Tabs
      screenOptions={{
        headerShown: false
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Main',
          tabBarIcon: ( { color } ) => <Home size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ( { color } ) => <User size={24} color={color} />,
        }}
      />
    </Tabs>
  )
}

export default TabLayout
