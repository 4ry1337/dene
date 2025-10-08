import { useTheme } from '@react-navigation/native'
import { Drawer } from 'expo-router/drawer'
import { EarthLockIcon, HandshakeIcon } from 'lucide-react-native'
import { Platform } from 'react-native'

const MarketingLayout = () => {
  const { colors } = useTheme()
  return (
    <Drawer
      screenOptions={{
        drawerType: 'slide',
        overlayColor: 'rgba(0, 0, 0, 0.0)',
        headerStyle: [ {
          backgroundColor: colors.card,
        }, {
          ...Platform.select( {
            android: {
              elevation: 0,
            },
            web: {
              boxShadow: 'none',
            },
            default: {
              shadowOpacity: 0,
            },
          } ),
        } ],
        drawerStyle: {
          width: '60%',
          backgroundColor: colors.card,
        },
        sceneStyle: {
          backgroundColor: colors.card
        }
      }}
      backBehavior='history'
    >
      <Drawer.Screen
        name="pp"
        options={{
          drawerIcon: ( props ) => ( <EarthLockIcon size={props.size} color={props.color} /> ),
          title: 'Privacy Policy',
        }}
      />
      <Drawer.Screen
        name="tos"
        options={{
          drawerIcon: ( props ) => ( <HandshakeIcon size={props.size} color={props.color} /> ),
          title: 'Terms of Service',
        }}
      />
    </Drawer>
  )
}

export default MarketingLayout
