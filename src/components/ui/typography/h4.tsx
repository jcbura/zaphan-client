import { cn } from '@/utils';
import { cva, VariantProps } from 'class-variance-authority';

const h4Variants = cva('scroll-m-20 text-xl font-semibold', {
  variants: {
    font: {
      sans: 'font-sans',
      serif: 'font-serif',
      condensed: 'font-condensed',
    },
  },
  defaultVariants: {
    font: 'serif',
  },
});

function H4({
  className,
  font,
  ...props
}: React.ComponentProps<'h4'> & VariantProps<typeof h4Variants>) {
  return (
    <h4
      data-slot="h4"
      className={cn(h4Variants({ font, className }))}
      {...props}
    />
  );
}

export { H4, h4Variants };
