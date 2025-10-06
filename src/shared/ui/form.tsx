import * as React from "react"
import { View as RNView } from "react-native"
import * as LabelPrimitive from "@rn-primitives/label"
import {
  Controller,
  ControllerProps,
  FieldPath,
  FieldValues,
  FormProvider,
  useFormContext,
  useFormState,
} from "react-hook-form"
import * as Slot from "@rn-primitives/slot"

import { cn } from "../lib/utils"
import { Label } from "./label"
import { Text } from "./text"

const Form = FormProvider

type FormFieldContextValue<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = {
  name: TName
}

const FormFieldContext = React.createContext<FormFieldContextValue>(
  {} as FormFieldContextValue,
)

const FormField = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>( {
  ...props
}: ControllerProps<TFieldValues, TName> ) => {
  return (
    <FormFieldContext.Provider value={{ name: props.name }}>
      <Controller {...props} />
    </FormFieldContext.Provider>
  )
}

const useFormField = () => {
  const fieldContext = React.useContext( FormFieldContext )
  const itemContext = React.useContext( FormItemContext )
  const { getFieldState } = useFormContext()
  const formState = useFormState( { name: fieldContext.name } )
  const fieldState = getFieldState( fieldContext.name, formState )

  if ( !fieldContext ) {
    throw new Error( "useFormField should be used within <FormField>" )
  }

  const { id } = itemContext

  return {
    id,
    name: fieldContext.name,
    formItemId: `${id}-form-item`,
    formDescriptionId: `${id}-form-item-description`,
    formMessageId: `${id}-form-item-message`,
    ...fieldState,
  }
}

type FormItemContextValue = {
  id: string
}

const FormItemContext = React.createContext<FormItemContextValue>(
  {} as FormItemContextValue,
)

function FormItem( { className, asChild, ...props }: React.ComponentProps<typeof RNView> & { asChild?: boolean } ) {
  const id = React.useId()
  const Component = asChild ? Slot.View : RNView

  return (
    <FormItemContext.Provider value={{ id }}>
      <Component className={cn( "space-y-2", className )} {...props} />
    </FormItemContext.Provider>
  )
}

function FormLabel( { className, ...props }: React.ComponentProps<typeof LabelPrimitive.Text> & {
  asChild?: boolean
} ) {
  const { error, formItemId } = useFormField()

  return (
    <Label
      data-slot="form-label"
      data-error={!!error}
      className={cn( "data-[error=true]:text-destructive", className )}
      htmlFor={formItemId}
      {...props}
    />
  )
}

function FormControl( { asChild, ...props }: React.ComponentProps<typeof RNView> & { asChild?: boolean } ) {
  const { error, formItemId, formDescriptionId, formMessageId } = useFormField()
  const Component = asChild ? Slot.View : RNView

  return (
    <Component
      id={formItemId}
      aria-describedby={
        !error ? `${formDescriptionId}` : `${formDescriptionId} ${formMessageId}`
      }
      aria-invalid={!!error}
      {...props}
    />
  )
}

function FormDescription( { className, ...props }: React.ComponentProps<typeof Text> ) {
  const { formDescriptionId } = useFormField()

  return (
    <Text
      id={formDescriptionId}
      className={cn( "text-[0.8rem] native:text-sm text-muted-foreground", className )}
      {...props}
    />
  )
}

function FormMessage( { className, children, ...props }: React.ComponentProps<typeof Text> ) {
  const { error, formMessageId } = useFormField()
  const body = error ? String( error?.message ) : children

  if ( !body ) {
    return null
  }

  return (
    <Text
      id={formMessageId}
      className={cn(
        "text-[0.8rem] native:text-sm font-medium text-destructive",
        className,
      )}
      {...props}
    >
      {body}
    </Text>
  )
}

export {
  useFormField,
  Form,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
  FormField,
}
