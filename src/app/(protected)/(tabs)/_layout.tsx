import { Tabs } from 'expo-router'
import { HomeIcon, UserIcon } from 'lucide-react-native'

const TabLayout = () => {
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
          tabBarIcon: ( { color } ) => <HomeIcon size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ( { color } ) => <UserIcon size={24} color={color} />,
        }}
      />
    </Tabs>
  )
}

export default TabLayout
