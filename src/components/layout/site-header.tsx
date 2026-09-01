import { BrandMark, ModeToggle } from '@/components';

export const SiteHeader = () => (
  <header className="flex h-14 w-full items-center border-b px-4 md:h-16 md:px-6">
    <div className="mx-auto flex w-full max-w-5xl items-center justify-between gap-4">
      <BrandMark />
      <ModeToggle />
    </div>
  </header>
);
