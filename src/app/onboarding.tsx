import { useSession } from '@/shared/hooks'
import { View } from 'react-native'
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
} from "@/shared/ui"
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from "react-hook-form"
import { CreateUserDTO, CreateUserSchema } from '@/features/user/create-user'
import { PrivacyPolicySheet } from '@/widgets'
import { useRouter } from 'expo-router'
import { cn } from '@/shared/lib'

const OnboardingScreen = () => {
  const router = useRouter()

  const { status } = useSession( { authenticated: false } )

  const form = useForm<CreateUserDTO>( {
    resolver: zodResolver( CreateUserSchema ),
    defaultValues: {
      email: "",
      username: "",
      unit: "metric",
      gender: null,
      date_of_birth: new Date(),
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
    <SafeAreaView className='flex-1'>
      <Form {...form}>
        <View className='gap-6'>
          <View className="px-4 gap-2">
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
                      onChangeText={onChange}
                      placeholder='Email'
                      value={value}
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
          </View>
          <FormField
            control={form.control}
            name="unit"
            render={( {
              field: { name, value, disabled },
            } ) => (
              <FormItem className="px-4 gap-2">
                <FormLabel asChild>
                  <Text variant={'h3'}>
                    Choose metric system
                  </Text>
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
            render={( { field } ) => {
              return (
                <FormItem className="px-4 gap-2">
                  <FormLabel asChild>
                    <Text variant={"h3"}>
                      Date of birth
                    </Text>
                  </FormLabel>
                  <FormControl>
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
                <FormItem className="px-4 gap-2">
                  <FormLabel>
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
                <FormItem className="px-4 gap-2">
                  <FormLabel>
                    Weight
                  </FormLabel>
                  <FormControl>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )
            }}
          />
          <View className='px-4 gap-1'>
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
      </Form>
    </SafeAreaView >
  )
}

export default OnboardingScreen
