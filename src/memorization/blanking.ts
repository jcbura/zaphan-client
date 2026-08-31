import type { BlankedSegment, Segment } from '@/memorization';

export const WORD_RE = /[A-Za-z]+(?:['’][A-Za-z]+)*/g;

export const segmentVerse = (text: string): Segment[] => {
  const segments: Segment[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = WORD_RE.exec(text)) !== null) {
    if (match.index > lastIndex) {
      segments.push({
        text: text.slice(lastIndex, match.index),
        blankable: false,
      });
    }
    segments.push({ text: match[0], blankable: true });
    lastIndex = match.index + match[0].length;
  }
  if (lastIndex < text.length) {
    segments.push({ text: text.slice(lastIndex), blankable: false });
  }
  return segments;
};

export interface BlankingOptions {
  percent: number; // 0–1
  floor?: number; // minimum blanked words, default 0
  ceiling?: number; // maximum blanked words, default Infinity
  rng?: () => number; // defaults to Math.random; pass a seeded fn for repeatability
}

export const applyBlanking = (
  segments: Segment[],
  {
    percent,
    floor = 0,
    ceiling = Infinity,
    rng = Math.random,
  }: BlankingOptions,
): BlankedSegment[] => {
  const blankableIndices = segments
    .map((s, i) => (s.blankable ? i : -1))
    .filter((i) => i !== -1);

  // independent roll per blankable word
  const blanked = new Set<number>();
  for (const i of blankableIndices) {
    if (rng() < percent) blanked.add(i);
  }

  const effectiveCeiling = Math.min(ceiling, blankableIndices.length);

  // too few: add random unblanked words until floor is met
  if (blanked.size < floor) {
    const candidates = shuffle(
      blankableIndices.filter((i) => !blanked.has(i)),
      rng,
    );
    for (const i of candidates) {
      if (blanked.size >= floor) break;
      blanked.add(i);
    }
  }

  // too many: remove random blanked words until ceiling is met
  if (blanked.size > effectiveCeiling) {
    const toRemove = shuffle([...blanked], rng);
    for (const i of toRemove) {
      if (blanked.size <= effectiveCeiling) break;
      blanked.delete(i);
    }
  }

  return segments.map((seg, i) => ({ ...seg, blanked: blanked.has(i) }));
};

export const shuffle = <T>(arr: T[], rng: () => number): T[] => {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

/*
// fresh
applyBlanking(segments, { percent: 0.4, floor: 2, ceiling: 6 });

// repeatable — same seed always produces same blank pattern
const rng = mulberry32(hashString(`${verseId}:${attemptId}`));
applyBlanking(segments, { percent: 0.4, floor: 2, ceiling: 6, rng });
*/
