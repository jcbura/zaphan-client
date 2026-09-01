import { SiteHeader, VerseSelectionBar } from '@/components';

const Home = () => {
  return (
    <div className="flex flex-1 flex-col">
      <SiteHeader />
      <main className="flex flex-1 flex-col px-4 md:px-6">
        <div className="mx-auto flex w-full max-w-5xl flex-1 flex-col">
          <VerseSelectionBar />
        </div>
      </main>
    </div>
  );
};

export default Home;
