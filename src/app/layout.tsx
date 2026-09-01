import { TooltipProvider } from '@/components';
import { ModeProvider, StoreProvider } from '@/providers';
import { cn } from '@/utils';
import type { Metadata } from 'next';
import '@/styles/globals.css';
import { Barlow, Barlow_Condensed, Spectral } from 'next/font/google';

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

const spectral = Spectral({
  variable: '--font-serif',
  subsets: ['latin'],
  weight: ['200', '300', '400', '500', '600', '700', '800'],
});

export const metadata: Metadata = {
  title: {
    template: '%s | zaphan',
    default: 'zaphan - memorize scripture',
  },
  description:
    'Memorize Scripture and hide God’s Word in your heart with Zaphan.',
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
        spectral.variable,
        'font-sans',
      )}
    >
      <body className="flex min-h-svh flex-col">
        <ModeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <TooltipProvider delay={700}>
            <StoreProvider>{children}</StoreProvider>
          </TooltipProvider>
        </ModeProvider>
      </body>
    </html>
  );
}
