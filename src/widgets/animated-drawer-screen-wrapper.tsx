import { useDrawerProgress } from '@react-navigation/drawer'
import Animated, {
  interpolate,
  useAnimatedStyle,
} from 'react-native-reanimated'

export const AnimatedDrawerScreenWrapper = ( { ...props }: React.ComponentProps<typeof Animated.View> ) => {
  const progress = useDrawerProgress()

  const animatedStyle = useAnimatedStyle( () => {
    const scale = interpolate(
      progress.value,
      [ 0, 1 ],
      [ 1, 0.8 ],
    )

    const borderRadius = interpolate(
      progress.value,
      [ 0, 1 ],
      [ 0, 20 ],
    )

    const translateX = interpolate(
      progress.value,
      [ 0, 1 ],
      [ 0, -30 ],
    )

    return {
      transform: [ { scale }, { translateX } ],
      borderRadius,
      overflow: 'hidden',
    }
  } )

  return (
    <Animated.View style={[ { flex: 1 }, animatedStyle ]} {...props} />
  )
}
