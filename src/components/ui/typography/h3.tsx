import { cn } from '@/utils';
import { cva, VariantProps } from 'class-variance-authority';

const h3Variants = cva('scroll-m-20 text-2xl font-semibold', {
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

function H3({
  className,
  font,
  ...props
}: React.ComponentProps<'h3'> & VariantProps<typeof h3Variants>) {
  return (
    <h3
      data-slot="h3"
      className={cn(h3Variants({ font, className }))}
      {...props}
    />
  );
}

export { H3, h3Variants };
