import * as React from 'react'
import { useSession, useTheme } from '@/shared/hooks'
import { ScrollView, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import {
  Text,
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormDescription,
  FormMessage,
  Input,
  textVariants
} from "@/shared/ui"
import DateTimePicker from '@react-native-community/datetimepicker'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from "react-hook-form"
import { CreateUserDTO, CreateUserSchema } from '@/features/user/create-user'
import { useRouter } from 'expo-router'
import { cn } from '@/shared/lib'
import { format } from 'date-fns'

const OnboardingScreen = () => {
  const router = useRouter()

  const theme = useTheme()

  const { status } = useSession( { authenticated: false } )

  const [ show, setShow ] = React.useState( false )

  const today = new Date()

  const form = useForm<CreateUserDTO>( {
    resolver: zodResolver( CreateUserSchema ), defaultValues: {
      email: "",
      username: "",
      unit: "metric",
      gender: null,
      date_of_birth: null,
      height: null,
      weight: null,
    },
  } )

  function onSubmit( values: CreateUserDTO ) {
    console.log( values )
  }

  if ( status === "loading" ) {
    return ( <SafeAreaView className='flex-1 justify-center items-center'>
      <Text>
        Loading
      </Text>
    </SafeAreaView>
    )
  }

  return (
    <Form {...form}>
      <SafeAreaView className='flex-1'>
        <ScrollView>
          <View className="px-4 py-6 gap-2">
            <Text variant={'h3'}>
              General Information
            </Text>
            <FormField
              control={form.control}
              name="email"
              render={( {
                field: { name, onChange, value, disabled },
                fieldState: { error }
              } ) => (
                <FormItem className="gap-2">
                  <FormControl>
                    <Input
                      className={cn( error && "border-destructive/50" )}
                      editable={!disabled}
                      onBlur={() => form.clearErrors( name )}
                      value={value}
                      onChangeText={onChange}
                      placeholder='Email'
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="username"
              render={( {
                field: { name, onChange, value, disabled },
                fieldState: { error }
              } ) => (
                <FormItem className="gap-2">
                  <FormControl>
                    <Input
                      className={cn( error && "border-destructive/50" )}
                      editable={!disabled}
                      onBlur={() => form.clearErrors( name )}
                      onChangeText={onChange}
                      placeholder='Username'
                      value={value}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="unit"
              render={( {
                field: { name, value, disabled },
              } ) => (
                <FormItem className="gap-2">
                  <FormLabel className={cn( textVariants( { variant: "h3" } ) )}>
                    Choose metric system
                  </FormLabel>
                  <FormControl className='flex flex-row gap-2'>
                    <Button
                      className='flex-1'
                      disabled={disabled}
                      onPress={() => form.setValue( "unit", "metric" )}
                      onBlur={() => form.clearErrors( name )}
                      variant={value === 'metric' ? 'default' : 'secondary'}
                    >
                      <Text>
                        Metric
                      </Text>
                    </Button>
                    <Button
                      className='flex-1'
                      disabled={disabled}
                      onPress={() => form.setValue( "unit", "imperial" )}
                      onBlur={() => form.clearErrors( name )}
                      variant={value === 'imperial' ? 'default' : 'secondary'}
                    >
                      <Text>
                        Imperial
                      </Text>
                    </Button>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="date_of_birth"
              render={( { field, fieldState } ) => {
                return (
                  <FormItem className="gap-2">
                    <FormLabel className={cn( textVariants( { variant: "h3" } ) )}>
                      Date of birth
                    </FormLabel>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        disabled={field.disabled}
                        className={cn( fieldState.error && "border-destructive/50" )}
                        onPress={() => setShow( true )}
                        onBlur={() => form.clearErrors( field.name )}
                      >
                        <Text>
                          {format( field.value ?? today, "d MMM yyyy" )}
                        </Text>
                      </Button>
                      {show &&
                        <DateTimePicker
                          mode="date"
                          display="spinner"
                          textColor={theme.cardForeground}
                          style={{ backgroundColor: theme.card, borderRadius: theme.radius }}
                          positiveButton={{ textColor: theme.cardForeground }}
                          neutralButton={{ textColor: theme.cardForeground }}
                          negativeButton={{ textColor: theme.cardForeground }}
                          minimumDate={new Date( "1960-01-01" )}
                          maximumDate={today}
                          value={field.value ?? today}
                          onChange={( _, date ) => {
                            field.onChange( date )
                            setShow( false )
                          }}
                        />
                      }
                    </FormControl>
                    <FormDescription>
                      Your date of birth is used to calculate your age.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )
              }}
            />
            <FormField
              control={form.control}
              name="height"
              render={( { field } ) => {
                return (
                  <FormItem className="gap-2">
                    <FormLabel className={cn( textVariants( { variant: "h3" } ) )}>
                      Height
                    </FormLabel>
                    <FormControl>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )
              }}
            />
            <FormField
              control={form.control}
              name="weight"
              render={( { field } ) => {
                return (
                  <FormItem className="gap-2">
                    <FormLabel className={cn( textVariants( { variant: "h3" } ) )}>
                      Weight
                    </FormLabel>
                    <FormControl>
                      <Input keyboardType='number-pad' value={field.value?.toString()} onChangeText={field.onChange} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )
              }}
            />
            <View className='gap-1'>
              <Button size={'sm'} variant={'link'} onPress={() => router.navigate( "/(marketing)/tos" )}>
                <Text>
                  Terms of Service
                </Text>
              </Button>
              <Button size={'sm'} variant={'link'} onPress={() => router.navigate( "/(marketing)/pp" )}>
                <Text>
                  Privacy Policy
                </Text>
              </Button>
              <Button size={"lg"} onPress={form.handleSubmit( onSubmit )}>
                <Text>Submit</Text>
              </Button>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </Form>
  )
}

export default OnboardingScreen
