import { applyBlanking, Segment, segmentVerse } from '@/utils';

const Home = () => {
  const verse = `And so, dear brothers and sisters, I plead with you to give your bodies to God because of all he has done for you. Let them be a living and holy sacrifice—the kind he will find acceptable. This is truly the way to worship him. Don’t copy the behavior and customs of this world, but let God transform you into a new person by changing the way you think. Then you will learn to know God’s will for you, which is good and pleasing and perfect.`;
  const segments: Segment[] = segmentVerse(verse);
  const blanking = applyBlanking(segments, {
    percent: 0.5,
  });

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col p-4 md:p-6">
      <p>
        {blanking.map((blank) =>
          blank.blanked ? '_'.repeat(blank.text.length) : blank.text,
        )}
      </p>
    </div>
  );
};

export default Home;
