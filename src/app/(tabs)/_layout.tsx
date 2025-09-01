import { Tabs } from 'expo-router'
import { Home, User } from 'lucide-react-native'
import React from 'react'

const TabLayout = () => {
  return (
    <Tabs
      screenOptions={{
        headerShown: false
      }}
    >
      <Tabs.Screen
        name="main"
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
