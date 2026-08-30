import { cn } from '@/utils';

function H3({ className, ...props }: React.ComponentProps<'h3'>) {
  return (
    <h3
      data-slot="h3"
      className={cn('scroll-m-20 text-2xl font-semibold', className)}
      {...props}
    />
  );
}

export { H3 };
