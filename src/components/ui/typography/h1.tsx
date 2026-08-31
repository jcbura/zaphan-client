import { cn } from '@/utils';

function H1({ className, ...props }: React.ComponentProps<'h1'>) {
  return (
    <h1
      data-slot="h1"
      className={cn(
        'scroll-m-20 text-center text-4xl font-extrabold text-balance',
        className,
      )}
      {...props}
    />
  );
}

export { H1 };
