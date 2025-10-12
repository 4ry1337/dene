import * as React from 'react'
import { KeyboardAvoidingView, ScrollView, View, Platform, Alert } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import {
  Text,
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  BigRadioGroup,
  BigRadioGroupItem,
  textVariants,
} from "@/shared/ui"
import { useSession, useTheme } from '@/shared/hooks'
import DateTimePicker from '@react-native-community/datetimepicker'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from "react-hook-form"
import { createUser, CreateUserDTO, CreateUserSchema } from '@/features/user/create-user'
import { useRouter } from 'expo-router'
import { cmToInches, cn, inchesToCm, kgToLbs, lbsToKg } from '@/shared/lib'
import { format } from 'date-fns'

const OnboardingScreen = () => {
  const { update } = useSession( { authenticated: false } )

  const router = useRouter()
  const { theme } = useTheme()
  const totalSteps = 3
  const [ current_step, setCurrentStep ] = React.useState( 1 )
  const [ isSubmitting, setIsSubmitting ] = React.useState( false )
  const [ showDatePicker, setShowDatePicker ] = React.useState( false )
  const form = useForm<CreateUserDTO>( {
    resolver: zodResolver( CreateUserSchema ),
    defaultValues: {
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

  const validateStep = async () => {
    let isValid = true

    if ( current_step === 1 ) {
      isValid = await form.trigger( [ 'email', 'username' ] )
    } else if ( current_step === 2 ) {
      isValid = await form.trigger( [ 'gender', 'date_of_birth' ] )
    } else if ( current_step === 3 ) {
      isValid = await form.trigger( [ 'unit', 'height', 'weight' ] )
    }

    return isValid
  }

  const handleNext = async () => {
    const isValid = await validateStep()

    if ( isValid ) {
      if ( current_step < totalSteps ) {
        setCurrentStep( current_step + 1 )
      } else {
        form.handleSubmit( onSubmit )()
      }
    }
  }

  const handleBack = () => {
    if ( current_step > 1 ) {
      setCurrentStep( current_step - 1 )
    }
  }

  async function onSubmit( values: CreateUserDTO ) {
    try {
      setIsSubmitting( true )

      const result = await createUser( values )

      console.log( 'User created successfully:', result )

      router.replace( '/(tabs)' )
    } catch ( error ) {
      setIsSubmitting( false )

      console.error( 'Error creating user:', error )

      Alert.alert(
        'Error',
        'Failed to create account. Please try again.',
        [ { text: 'OK' } ]
      )
    }
  }

  const render_step_1 = () => (
    <>
      <View className="pb-4">
        <Text variant="h2">Account Information</Text>
      </View>
      <View className="gap-4">
        <FormField
          control={form.control}
          name="email"
          render={( { field, fieldState } ) => (
            <FormItem className="gap-2">
              <FormLabel className={cn( textVariants( { variant: "h3" } ) )}>
                Email Address
              </FormLabel>
              <FormControl>
                <Input
                  className={cn( fieldState.error && "border-destructive/50" )}
                  editable={!field.disabled}
                  onBlur={() => form.clearErrors( field.name )}
                  value={field.value}
                  onChangeText={field.onChange}
                  placeholder='you@example.com'
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="username"
          render={( { field, fieldState } ) => (
            <FormItem className="gap-2">
              <FormLabel className={cn( textVariants( { variant: "h3" } ) )}>
                Username
              </FormLabel>
              <FormControl>
                <Input
                  className={cn( fieldState.error && "border-destructive/50" )}
                  editable={!field.disabled}
                  onBlur={() => form.clearErrors( field.name )}
                  onChangeText={field.onChange}
                  placeholder='johndoe'
                  value={field.value}
                  autoCapitalize="none"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </View>
    </>
  )

  const render_step_2 = () => {
    const today = new Date()

    return (
      <>
        <View className="pb-4">
          <Text variant="h2">Personal Details</Text>
        </View>
        <View className="gap-4">
          <FormField
            control={form.control}
            name="gender"
            render={( { field } ) => (
              <FormItem className="gap-2">
                <FormLabel className={cn( textVariants( { variant: "h3" } ) )}>
                  Gender
                </FormLabel>
                <FormControl className='gap-2'>
                  <BigRadioGroup
                    value={field.value ?? "male"}
                    onValueChange={( val ) => field.onChange( val )}
                  >
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
            name="date_of_birth"
            render={( { field, fieldState } ) => (
              <FormItem className="gap-2">
                <FormLabel className={cn( textVariants( { variant: "h3" } ) )}>
                  Date of Birth
                </FormLabel>
                <FormControl>
                  <>
                    <Button
                      variant={"outline"}
                      disabled={field.disabled}
                      className={cn( fieldState.error && "border-destructive/50" )}
                      onPress={() => setShowDatePicker( true )}
                      onBlur={() => form.clearErrors( field.name )}
                    >
                      <Text>
                        {format( field.value ?? today, "d MMM yyyy" )}
                      </Text>
                    </Button>
                    {showDatePicker && (
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
                          setShowDatePicker( false )
                        }}
                      />
                    )}
                  </>
                </FormControl>
                <Text className="text-sm text-muted-foreground">
                  Your date of birth is used to calculate your age
                </Text>
                <FormMessage />
              </FormItem>
            )}
          />
        </View>
      </>
    )
  }

  const render_step_3 = () => (
    <>
      <View className="pb-4">
        <Text variant="h2">
          Physical Measurements
        </Text>
      </View>
      <View className="gap-4">
        <FormField
          control={form.control}
          name="unit"
          render={( { field } ) => (
            <FormItem className="gap-2">
              <FormLabel className={cn( textVariants( { variant: "h3" } ) )}>
                Unit System
              </FormLabel>
              <FormControl className='gap-2'>
                <BigRadioGroup
                  value={field.value ?? "metric"}
                  onValueChange={
                    ( val ) => {
                      field.onChange( val )

                      if ( current_height ) {
                        if ( val === 'imperial' ) {
                          form.setValue( 'height', cmToInches( current_height ) )
                        } else {
                          form.setValue( 'height', inchesToCm( current_height ) )
                        }
                      }

                      if ( current_weight ) {
                        if ( val === 'imperial' ) {
                          form.setValue( 'weight', kgToLbs( current_weight ) )
                        } else {
                          form.setValue( 'weight', lbsToKg( current_weight ) )
                        }
                      }
                    }
                  }
                >
                  <BigRadioGroupItem value='metric'>
                    <Text>Metric (cm, kg)</Text>
                  </BigRadioGroupItem>
                  <BigRadioGroupItem value="imperial">
                    <Text>Imperial (in, lbs)</Text>
                  </BigRadioGroupItem>
                </BigRadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="height"
          render={( { field } ) => (
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
                    field.onChange( isNaN( num ) ? null : num )
                  }}
                  onBlur={() => form.clearErrors( field.name )}
                  editable={!field.disabled}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="weight"
          render={( { field } ) => (
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
                    field.onChange( isNaN( num ) ? null : num )
                  }}
                  onBlur={() => form.clearErrors( field.name )}
                  editable={!field.disabled}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </View>
    </>
  )

  return (
    <Form {...form}>
      <SafeAreaView className='flex-1'>
        <View className="flex-row items-center justify-between px-4 py-1 gap-2">
          {[ 1, 2, 3 ].map( ( step, index ) => (
            <React.Fragment key={step}>
              <View className={cn(
                "flex-1 h-2 rounded-full items-center justify-center bg-primary",
                step > current_step && "bg-primary-foreground/30"
              )} />
            </React.Fragment>
          ) )}
        </View>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          className="flex-1"
        >
          <ScrollView className="flex-1 px-4 py-6 border-b border-border">
            {current_step === 1 && render_step_1()}
            {current_step === 2 && render_step_2()}
            {current_step === 3 && render_step_3()}
          </ScrollView>
        </KeyboardAvoidingView>
        <View className='flex-row gap-1 justify-center p-1'>
          <Button size={'sm'} variant={'link'} onPress={() => router.navigate( "/(marketing)/tos" )}>
            <Text>Terms of Service</Text>
          </Button>
          <Button size={'sm'} variant={'link'} onPress={() => router.navigate( "/(marketing)/pp" )}>
            <Text>Privacy Policy</Text>
          </Button>
        </View>
        <View className="flex flex-row gap-2 px-4 pb-4 pt-1">
          <Button
            className={cn( 'flex-1', current_step < 2 && "hidden" )}
            variant="outline"
            size='lg'
            onPress={handleBack}
          >
            <Text>Back</Text>
          </Button>
          <Button
            disabled={isSubmitting}
            size='lg'
            onPress={handleNext}
            className='flex-1'
          >
            <Text>{current_step === totalSteps ? ( isSubmitting ? 'Submitting...' : 'Submit' ) : 'Next'}</Text>
          </Button>
        </View>
      </SafeAreaView>
    </Form>
  )
}

export default OnboardingScreen
