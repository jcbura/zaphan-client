'use client';

import { P } from '@/components';

type VerseDisplayProps = {
  text: string;
};

export const VerseDisplay = ({ text }: VerseDisplayProps) => {
  return <P font="serif">{text}</P>;
};
