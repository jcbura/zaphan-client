'use client';

import { Button, Tooltip, TooltipContent, TooltipTrigger } from '@/components';
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
          <Button variant="ghost" size="icon" onClick={toggleTheme}>
            <SunHorizonIcon />
          </Button>
        }
      />
      <TooltipContent>
        <p>{resolvedTheme === 'light' ? 'Dark Mode' : 'Light Mode'}</p>
      </TooltipContent>
    </Tooltip>
  );
};
