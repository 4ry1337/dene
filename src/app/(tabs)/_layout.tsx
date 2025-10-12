import { useSession } from '@/shared/hooks'
import { LoaderScreen } from '@/widgets'
import { Tabs } from 'expo-router'
import { Home, User } from 'lucide-react-native'
import React from 'react'

const TabLayout = () => {
  useSession( { authenticated: true } )

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
