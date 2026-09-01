'use client';

import { P, SiteHeader, VerseSelectionBar } from '@/components';
import { useVerseDisplay } from '@/hooks';

const Home = () => {
  const { displayText } = useVerseDisplay();

  return (
    <div className="flex flex-1 flex-col">
      <SiteHeader />
      <main className="flex flex-1 flex-col px-4 md:px-6">
        <div className="mx-auto flex w-full max-w-5xl flex-1 flex-col gap-6">
          <VerseSelectionBar />
          <div className="flex flex-1 flex-col">
            {displayText && <P font="serif">{displayText}</P>}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;
