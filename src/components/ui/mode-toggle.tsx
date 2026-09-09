'use client';

import {
  Button,
  P,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components';
import { SunHorizonIcon } from '@phosphor-icons/react';
import { useTheme } from 'next-themes';

export const ModeToggle = () => {
  const { setTheme, resolvedTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(resolvedTheme === 'light' ? 'dark' : 'light');
  };

  return (
    <Tooltip>
      <TooltipTrigger
        render={
          <Button
            variant="ghost"
            size="icon"
            aria-label={resolvedTheme === 'light' ? 'dark mode' : 'light mode'}
            onClick={toggleTheme}
          >
            <SunHorizonIcon />
          </Button>
        }
      />
      <TooltipContent side="left" sideOffset={8}>
        <P>{resolvedTheme === 'light' ? 'dark mode' : 'light mode'}</P>
      </TooltipContent>
    </Tooltip>
  );
};
