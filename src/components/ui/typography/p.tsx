import { cn } from '@/utils';
import { mergeProps } from '@base-ui/react/merge-props';
import { useRender } from '@base-ui/react/use-render';
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
    font: {
      sans: 'font-sans',
      serif: 'font-serif',
      condensed: 'font-condensed',
    },
  },
  defaultVariants: {
    variant: 'default',
    font: 'sans',
  },
});

interface PProps
  extends useRender.ComponentProps<'p'>, VariantProps<typeof pVariants> {}

function P({ render, className, variant, font, ...props }: PProps) {
  const defaultProps: useRender.ElementProps<'p'> & {
    'data-slot': string;
  } = {
    'data-slot': 'p',
    className: cn(pVariants({ variant, font }), className),
  };

  return useRender({
    defaultTagName: 'p',
    render,
    props: mergeProps<'p'>(defaultProps, props),
  });
}

export { P, pVariants };
