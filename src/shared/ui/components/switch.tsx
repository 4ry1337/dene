import { useTheme } from '@/shared/hooks'
import Color from 'color'
import { Switch as RNSwitch } from 'react-native'

type SwitchProps = React.ComponentProps<typeof RNSwitch> &
  React.RefAttributes<RNSwitch>

const Switch = ( { style, disabled, ...props }: SwitchProps ) => {
  const theme = useTheme()
  return (
    <RNSwitch
      disabled={disabled}
      trackColor={{
        false: theme.input,
        true: theme.primary
      }}
      thumbColor={props.value ? theme.muted : theme.primary}
      {...props}
    />
  )
}

export { Switch }

// import { ComponentPropsWithoutRef, ElementRef, forwardRef } from "react"
// import * as SwitchPrimitives from "@rn-primitives/switch"
// import { Platform } from "react-native"
// import Animated, {
//   interpolateColor,
//   useAnimatedStyle,
//   useDerivedValue,
//   withTiming,
// } from "react-native-reanimated"
//
// const RGB_COLORS = {
//   light: {
//     primary: "rgb(24, 24, 27)",
//     input: "rgb(228, 228, 231)",
//   },
//   dark: {
//     primary: "rgb(250, 250, 250)",
//     input: "rgb(39, 39, 42)",
//   },
// } as const
//
// const SwitchNative = forwardRef<
//   ElementRef<typeof SwitchPrimitives.Root>,
//   ComponentPropsWithoutRef<typeof SwitchPrimitives.Root>
// >( ( { className, ...props }, ref ) => {
//   const { colorScheme } = useColorScheme()
//   const translateX = useDerivedValue( () => ( props.checked ? 18 : 0 ) )
//   const animatedRootStyle = useAnimatedStyle( () => {
//     return {
//       backgroundColor: interpolateColor(
//         translateX.value,
//         [ 0, 18 ],
//         [
//           RGB_COLORS[ colorScheme ?? "light" ].input,
//           RGB_COLORS[ colorScheme ?? "light" ].primary,
//         ]
//       ),
//     }
//   } )
//   const animatedThumbStyle = useAnimatedStyle( () => ( {
//     transform: [
//       { translateX: withTiming( translateX.value, { duration: 200 } ) },
//     ],
//   } ) )
//   return (
//     <Animated.View
//       style={animatedRootStyle}
//       className={cn(
//         "h-8 w-[46px] rounded-full",
//         props.disabled && "opacity-50"
//       )}
//     >
//       <SwitchPrimitives.Root
//         className={cn(
//           "flex-row h-8 w-[46px] shrink-0 items-center rounded-full border-2 border-transparent",
//           props.checked ? "bg-primary" : "bg-input",
//           className
//         )}
//         {...props}
//         ref={ref}
//       >
//         <Animated.View style={animatedThumbStyle}>
//           <SwitchPrimitives.Thumb
//             className={
//               "h-7 w-7 rounded-full bg-background shadow-md shadow-foreground/25 ring-0"
//             }
//           />
//         </Animated.View>
//       </SwitchPrimitives.Root>
//     </Animated.View>
//   )
// } )
// SwitchNative.displayName = "SwitchNative"
//
// const Switch = Platform.select( {
//   web: SwitchWeb,
//   default: SwitchNative,
// } )
//
// export { Switch }
