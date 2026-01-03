import { createExercise, CreateExerciseDTO, CreateExerciseSchema } from '@/features/exercise/create-exercise'
import { cn } from '@/shared/lib'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, Input, Text, textVariants } from '@/shared/ui'
import { zodResolver } from '@hookform/resolvers/zod'
import * as React from 'react'
import { useForm } from 'react-hook-form'
import { Alert, KeyboardAvoidingView, Platform, ScrollView, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const NewExercisePage = () => {
  const [ isSubmitting, setIsSubmitting ] = React.useState( false )

  const form = useForm<CreateExerciseDTO>( {
    resolver: zodResolver( CreateExerciseSchema ),
    defaultValues: {
      title: '',
      description: null,
      instruction: null,
      exercise_type: null,
    },
  } )

  async function onSubmit( values: CreateExerciseDTO ) {
    try {
      setIsSubmitting( true )

      const result = await createExercise( values )

      console.log( 'User created successfully:', result )
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


  return (
    <Form {...form}>
      <SafeAreaView className="flex-1 p-4">
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          className="flex-1"
        >
          <ScrollView className="flex-1 px-4 py-6 border-b border-border">
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
                      placeholder='Exercise name'
                      value={field.value}
                      autoCapitalize="none"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </Form>
  )
}

export default NewExercisePage
