'use client';

import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
  P,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { isLocked } from '@/memorization';
import { memorizationSelectors, revealBlank, setInput } from '@/stores';
import { cn } from '@/utils';
import { QuestionIcon } from '@phosphor-icons/react';

type BlankInputProps = {
  index: number;
};

const blankInputWidth = (text: string) => {
  const chars = Math.max(text.length + 3, 6);

  return {
    width: `${chars}ch`,
    minWidth: `${chars}ch`,
  };
};

export const BlankInput = ({ index }: BlankInputProps) => {
  const dispatch = useAppDispatch();
  const expectedText = useAppSelector(
    (state) => memorizationSelectors.segments(state)[index]?.text ?? '',
  );
  const blank = useAppSelector(
    (state) => memorizationSelectors.testState(state)[index],
  );

  const status = blank?.status ?? 'unanswered';
  const locked = isLocked(status);

  return (
    <InputGroup
      data-status={status}
      className={cn(
        locked && 'pointer-events-none',
        'hover:bg-muted dark:hover:bg-muted/50 inline-flex h-auto w-auto rounded-none rounded-tl rounded-tr border-t-0 border-r-0 border-b border-l-0 bg-transparent data-[status=correct]:border-green-500 data-[status=incorrect]:border-red-500 data-[status=revealed]:border-amber-500 dark:bg-transparent',
      )}
    >
      <InputGroupInput
        autoComplete="off"
        value={blank?.input ?? ''}
        disabled={locked}
        style={blankInputWidth(expectedText)}
        className="px-1 font-serif text-base disabled:opacity-100 md:text-base"
        onChange={(event) =>
          dispatch(setInput({ index, value: event.target.value }))
        }
      />
      {!locked && (
        <InputGroupAddon align="inline-end" className="py-0">
          <Tooltip>
            <TooltipTrigger
              render={
                <InputGroupButton
                  type="button"
                  variant="ghost"
                  size="icon-xs"
                  onClick={() => dispatch(revealBlank(index))}
                >
                  <QuestionIcon />
                </InputGroupButton>
              }
            />
            <TooltipContent side="top" sideOffset={8}>
              <P>reveal answer</P>
            </TooltipContent>
          </Tooltip>
        </InputGroupAddon>
      )}
    </InputGroup>
  );
};
