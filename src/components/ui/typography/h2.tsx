import { cn } from '@/utils';

function H2({ className, ...props }: React.ComponentProps<'h2'>) {
  return (
    <h2
      data-slot="h2"
      className={cn('scroll-m-20 text-3xl font-semibold', className)}
      {...props}
    />
  );
}

export { H2 };
