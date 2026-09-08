import {
  applyBlanking,
  segmentVerse,
  type BlankedSegment,
} from '@/memorization';

export const buildBlankedSegments = (
  text: string,
  difficultyPercent: number,
  options?: { rng?: () => number },
): BlankedSegment[] => {
  const segments = segmentVerse(text);
  return applyBlanking(segments, {
    percent: difficultyPercent / 100,
    floor: difficultyPercent > 0 ? 1 : 0,
    rng: options?.rng,
  });
};
