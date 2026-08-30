import { cn } from '@/utils';
import { cva, VariantProps } from 'class-variance-authority';

const pVariants = cva('', {
  variants: {
    variant: {
      default: '',
      lead: 'text-muted-foreground text-xl',
      large: 'text-lg font-semibold',
      small: 'text-sm leading-none font-medium',
      muted: 'text-muted-foreground text-sm',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

function P({
  className,
  variant,
  ...props
}: React.ComponentProps<'p'> & VariantProps<typeof pVariants>) {
  return (
    <p
      data-slot="p"
      className={cn(pVariants({ variant, className }))}
      {...props}
    />
  );
}

export { P, pVariants };
