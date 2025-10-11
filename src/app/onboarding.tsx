import * as React from 'react'
import { useSession, useTheme } from '@/shared/hooks'
import { KeyboardAvoidingView, ScrollView, View } from 'react-native'
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
  BigRadioGroup,
  BigRadioGroupItem,
  textVariants
} from "@/shared/ui"
import DateTimePicker from '@react-native-community/datetimepicker'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from "react-hook-form"
import { CreateUserDTO, CreateUserSchema } from '@/features/user/create-user'
import { useRouter } from 'expo-router'
import { cmToInches, cn, inchesToCm, kgToLbs, lbsToKg } from '@/shared/lib'
import { format } from 'date-fns'

const OnboardingScreen = () => {
  const router = useRouter()

  const { theme } = useTheme()

  const { status } = useSession( { authenticated: false } )

  const [ show, setShow ] = React.useState( false )

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

  const selected_unit = form.watch( "unit" )
  const current_height = form.watch( 'height' )
  const current_weight = form.watch( 'weight' )

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
        <KeyboardAvoidingView>
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
                name="gender"
                render={( { field } ) => (
                  <FormItem className="gap-2">
                    <FormLabel className={cn( textVariants( { variant: "h3" } ) )}>
                      Choose metric system
                    </FormLabel>
                    <FormControl className='gap-2'>
                      <BigRadioGroup
                        value={field.value ?? "male"}
                        onValueChange={( val ) => {
                          field.onChange( val )

                          if ( current_height ) {
                            if ( selected_unit === 'imperial' ) {
                              form.setValue( 'height', cmToInches( current_height ) )
                            } else {
                              form.setValue( 'height', inchesToCm( current_height ) )
                            }
                          }
                          if ( current_weight ) {
                            if ( selected_unit === 'imperial' ) {
                              form.setValue( 'weight', kgToLbs( current_weight ) )
                            } else {
                              form.setValue( 'weight', lbsToKg( current_weight ) )
                            }
                          }
                        }}>
                        <BigRadioGroupItem value='male'>
                          <Text>Male</Text>
                        </BigRadioGroupItem>
                        <BigRadioGroupItem value="female">
                          <Text>Female</Text>
                        </BigRadioGroupItem>
                        <BigRadioGroupItem value="other">
                          <Text>Other</Text>
                        </BigRadioGroupItem>
                      </BigRadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="unit"
                render={( { field } ) => (
                  <FormItem className="gap-2">
                    <FormLabel className={cn( textVariants( { variant: "h3" } ) )}>
                      Choose metric system
                    </FormLabel>
                    <FormControl className='gap-2'>
                      <BigRadioGroup
                        value={field.value ?? "metric"}
                        onValueChange={( value ) => {
                          field.onChange( value )
                        }}
                      >
                        <BigRadioGroupItem value='metric' >
                          <Text>Metric</Text>
                        </BigRadioGroupItem>
                        <BigRadioGroupItem value="imperial">
                          <Text>Imperial</Text>
                        </BigRadioGroupItem>
                      </BigRadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="date_of_birth"
                render={( { field, fieldState } ) => {
                  const today = new Date()

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
                        <Input
                          keyboardType="numeric"
                          placeholder={selected_unit === "metric" ? "e.g., 175 cm" : "e.g., 69 inches"}
                          value={field.value?.toString() ?? ""}
                          onChangeText={( text ) => {
                            const num = parseInt( text )
                            console.log( num )
                            field.onChange( isNaN( num ) ? null : num )
                          }}
                          onBlur={() => form.clearErrors( field.name )}
                          editable={!field.disabled}
                        />
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
                        <Input
                          keyboardType="numeric"
                          placeholder={selected_unit === "metric" ? "e.g., 70 kg" : "e.g., 154 lbs"}
                          value={field.value?.toString() ?? ""}
                          onChangeText={( text ) => {
                            const num = parseInt( text )
                            console.log( num )
                            field.onChange( isNaN( num ) ? null : num )
                          }}
                          onBlur={() => form.clearErrors( field.name )}
                          editable={!field.disabled}
                        />

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
        </KeyboardAvoidingView>
      </SafeAreaView>
    </Form >
  )
}

export default OnboardingScreen
