import { CreateRoutineDTO, CreateRoutineSchema } from '@/features/routine/create-routine/create-routine.contract'
import { createRoutine } from '@/features/routine/create-routine/create-routine.mutation'
import { useSession } from '@/shared/hooks'
import { cn } from '@/shared/lib'
import { Button, Form, FormControl, FormField, FormItem, FormMessage, Icon, Input, Text, Toggle } from '@/shared/ui'
import { LoaderScreen } from '@/widgets'
import { zodResolver } from '@hookform/resolvers/zod'
import { router } from 'expo-router'
import { CircleDotIcon } from 'lucide-react-native'
import * as React from 'react'
import { useForm } from 'react-hook-form'
import { Alert, KeyboardAvoidingView, Platform, ScrollView, View } from 'react-native'

const NewRoutinesPage = () => {
  const session = useSession( { authenticated: true } )

  const [ isSubmitting, setIsSubmitting ] = React.useState( false )

  const form = useForm<CreateRoutineDTO>( {
    resolver: zodResolver( CreateRoutineSchema ),
    defaultValues: {
      title: '',
      description: undefined,
      current: undefined,
      created_by: session.data!.user_id
    },
  } )

  async function onSubmit( values: CreateRoutineDTO ) {
    try {
      setIsSubmitting( true )

      const result = await createRoutine( values )

      console.log( 'Routine created successfully:', result )

      router.back()
    } catch ( error ) {
      console.error( 'Error creating user:', error )
      Alert.alert(
        'Error',
        'Failed to create routine. Please try again.',
        [ { text: 'OK' } ]
      )
    } finally {
      setIsSubmitting( false )
    }
  }

  if ( session.status === "loading" ) {
    return <LoaderScreen />
  }

  return (
    <Form {...form}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1"
      >
        <ScrollView className="flex-1 border-b border-border">
          <View className='p-4 gap-4'>
              <FormField
                control={form.control}
                name="title"
                render={( { field, fieldState } ) => (
                  <FormItem className="gap-2">
                    <FormControl>
                      <Input
                        className={cn( fieldState.error && "border-destructive/50" )}
                        editable={!field.disabled}
                        onBlur={() => form.clearErrors( field.name )}
                        onChangeText={field.onChange}
                        placeholder='Routine name'
                        value={field.value}
                        autoCapitalize="none"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={( { field, fieldState } ) => (
                  <FormItem className="gap-2">
                    <FormControl>
                      <Input
                        className={cn( fieldState.error && "border-destructive/50" )}
                        editable={!field.disabled}
                        onBlur={() => form.clearErrors( field.name )}
                        onChangeText={field.onChange}
                        placeholder='Description (optional)'
                        value={field.value ?? undefined}
                        autoCapitalize="none"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="current"
                render={( { field, fieldState } ) => (
                  <FormItem className="gap-2">
                    <FormControl>
                      <Toggle
                        className={cn( fieldState.error && "border-destructive/50", "" )}
                        onBlur={() => form.clearErrors( field.name )}
                        disabled={field.disabled}
                        onPressedChange={field.onChange}
                        pressed={field.value ?? true}
                      >
                        <Icon as={CircleDotIcon} />
                        <Text>
                          Make this active
                        </Text>
                      </Toggle>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </View>
          </ScrollView>
          <View className='p-4'>
            <Button
              disabled={isSubmitting}
              onPress={form.handleSubmit( onSubmit )}
            >
              <Text>{isSubmitting ? 'Submitting...' : 'Submit'}</Text>
            </Button>
          </View>
        </KeyboardAvoidingView>
      </Form>
  )
}

// {/*
// const muscle_groups = useLiveQuery( drizzle_db.select().from( muscle_group ) )
//
// if ( muscle_groups.error ) {
//   console.error( muscle_groups.error )
// }
//
//           <View className='h-96'>
//         <FlashList
//           data={muscle_groups.data}
//           renderItem={( { item } ) => <MuscleGroupItem className='mb-2' key={item.id} muscle_group={item} />}
//         /> 
//       </View> */}

export default NewRoutinesPage
