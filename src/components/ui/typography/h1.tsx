import { cn } from '@/utils';
import { cva, VariantProps } from 'class-variance-authority';

const h1Variants = cva(
  'scroll-m-20 text-center text-4xl font-extrabold text-balance',
  {
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
  },
);

function H1({
  className,
  font,
  ...props
}: React.ComponentProps<'h1'> & VariantProps<typeof h1Variants>) {
  return (
    <h1
      data-slot="h1"
      className={cn(h1Variants({ font, className }))}
      {...props}
    />
  );
}

export { H1, h1Variants };
