import { TextClassContext } from '@/shared/ui/text'
import { cn } from '@/shared/lib/utils'
import { cva, type VariantProps } from 'class-variance-authority'
import { Platform, Pressable } from 'react-native'

const buttonVariants = cva(
  'group shrink-0 flex-row items-center justify-center gap-2 rounded-md shadow-none',
  {
    variants: {
      variant: {
        default: 'bg-primary active:bg-primary/90 shadow-sm shadow-black/5',
        destructive: 'bg-destructive active:bg-destructive/90 dark:bg-destructive/60 shadow-sm shadow-black/5',
        outline: 'border-border bg-background active:bg-accent dark:bg-input/30 dark:border-input dark:active:bg-input/50 border shadow-sm shadow-black/5',
        secondary: 'bg-secondary active:bg-secondary/80 shadow-sm shadow-black/5',
        ghost: 'active:bg-accent dark:active:bg-accent/50',
        link: '',
      },
      size: {
        default: 'h-12 px-4 py-2',
        sm: 'h-10 gap-1.5 px-3',
        lg: 'h-14 px-6',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
)

const buttonTextVariants = cva(
  'text-foreground font-medium',
  {
    variants: {
      variant: {
        default: 'text-primary-foreground',
        destructive: 'text-white',
        outline: 'group-active:text-accent-foreground',
        secondary: 'text-secondary-foreground',
        ghost: 'group-active:text-accent-foreground',
        link: 'text-primary group-active:underline',
      },
      size: {
        default: 'text-md',
        sm: 'text-sm',
        lg: 'text-lg',
        icon: '',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
)

type ButtonProps = React.ComponentProps<typeof Pressable> &
  React.RefAttributes<typeof Pressable> &
  VariantProps<typeof buttonVariants>

function Button( { className, variant, size, ...props }: ButtonProps ) {
  return (
    <TextClassContext.Provider value={buttonTextVariants( { variant, size } )}>
      <Pressable
        className={cn( props.disabled && 'opacity-50', buttonVariants( { variant, size } ), className )}
        role="button"
        {...props}
      />
    </TextClassContext.Provider>
  )
}

export { Button, buttonTextVariants, buttonVariants }
export type { ButtonProps }
