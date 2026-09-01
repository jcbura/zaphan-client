import { cn } from '@/utils';
import { cva, VariantProps } from 'class-variance-authority';

const h2Variants = cva('scroll-m-20 text-3xl font-semibold', {
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

function H2({
  className,
  font,
  ...props
}: React.ComponentProps<'h2'> & VariantProps<typeof h2Variants>) {
  return (
    <h2
      data-slot="h2"
      className={cn(h2Variants({ font, className }))}
      {...props}
    />
  );
}

export { H2, h2Variants };
