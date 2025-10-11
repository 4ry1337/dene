import { cn } from '@/shared/lib/utils'
import * as RadioGroupPrimitive from '@rn-primitives/radio-group'
import { cva, VariantProps } from 'class-variance-authority'
import { TextClassContext } from './text'

const radioGroupVariants = cva( 'flex gap-3 justify-center items-center', {
  variants: {
    orientation: {
      horizontal: 'flex-row',
      vertical: 'flex-col',
    },
    spacing: {
      tight: 'gap-2',
      normal: 'gap-3',
      loose: 'gap-4',
      relaxed: 'gap-6',
    },
  },
  defaultVariants: {
    orientation: 'horizontal',
    spacing: 'normal',
  },
} )

const radioItemVariants = cva(
  'relative group flex-1 items-center justify-center gap-2 border border-input rounded-md shadow-none',
  {
    variants: {
      size: {
        default: 'h-12 px-4 py-2',
        sm: 'h-10 gap-1.5 px-3',
        lg: 'h-14 px-6',
        icon: 'h-10 w-10',
      },
      variant: {
        default: 'bg-secondary active:bg-secondary/80 shadow-sm shadow-black/5',
        outline: 'border-border bg-background active:bg-accent dark:bg-input/30 dark:border-input dark:active:bg-input/50 border shadow-sm shadow-black/5',
      },
    },
    defaultVariants: {
      size: 'default',
      variant: 'default',
    },
  }
)

const indicatorVariants = cva( 'absolute rounded-sm bg-primary transition-all duration-200', {
  variants: {
    size: {
      default: 'inset-1',
      sm: 'inset-1',
      lg: 'inset-1',
    },
    indicatorStyle: {
      fill: '',
      dot: 'inset-[30%]',
      ring: 'inset-2 border-4 border-primary bg-transparent',
    },
  },
  defaultVariants: {
    size: 'default',
    indicatorStyle: 'fill',
  },
} )

const textVariants = cva(
  'text-foreground font-medium',
  {
    variants: {
      size: {
        default: 'text-md',
        sm: 'text-sm',
        lg: 'text-lg',
      },
    },
    defaultVariants: {
      size: 'default',
    },
  }
)

function BigRadioGroup( {
  orientation,
  spacing,
  className,
  ...props
}: RadioGroupPrimitive.RootProps & VariantProps<typeof radioGroupVariants> & React.RefAttributes<RadioGroupPrimitive.RootRef> ) {
  return <RadioGroupPrimitive.Root className={cn( radioGroupVariants( { orientation, spacing } ), className )} {...props} />
}

function BigRadioGroupItem( {
  children,
  className,
  disabled,
  size,
  variant,
  indicatorStyle,
  ...props
}: RadioGroupPrimitive.ItemProps & VariantProps<typeof indicatorVariants> & VariantProps<typeof radioItemVariants> & React.RefAttributes<RadioGroupPrimitive.ItemRef> ) {
  return (
    <TextClassContext.Provider value={textVariants( { size } )}>
      <RadioGroupPrimitive.Item
        className={cn(
          radioItemVariants( { size, variant } ),
          disabled && 'opacity-50 cursor-not-allowed',
          className
        )}
        disabled={disabled}
        {...props}>
        <RadioGroupPrimitive.Indicator
          className={cn( indicatorVariants( { size, indicatorStyle } ) )}
        />
        <>{children}</>
      </RadioGroupPrimitive.Item >
    </TextClassContext.Provider>
  )
}

export { BigRadioGroup, BigRadioGroupItem }
