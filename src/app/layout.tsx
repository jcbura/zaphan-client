import { TooltipProvider } from '@/components';
import { ModeProvider, StoreProvider } from '@/providers';
import { cn } from '@/utils';
import type { Metadata } from 'next';
import '@/styles/globals.css';
import { Barlow, Barlow_Condensed } from 'next/font/google';

const barlow = Barlow({
  variable: '--font-sans',
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
});

const barlowCondensed = Barlow_Condensed({
  variable: '--font-condensed',
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
});

export const metadata: Metadata = {
  title: { template: '%s | bible app', default: 'bible app' },
  description: 'bible memorization app',
};

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn(
        'h-full',
        'antialiased',
        barlow.variable,
        barlowCondensed.variable,
        'font-sans',
      )}
    >
      <body className="flex min-h-full flex-col">
        <StoreProvider>
          <ModeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <TooltipProvider delay={700}>{children}</TooltipProvider>
          </ModeProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
