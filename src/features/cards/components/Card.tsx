import React from 'react';
import { MessageCircleQuestion, X } from 'lucide-react';

import { cn } from '@/lib/helpers';
import { isDev } from '@/config';

import { cardsData } from '../constants';

interface TProps {
  className?: string;
  idx: number;
  active: boolean;
  setActive: (active: boolean) => void;
}

type TShowMode = 'content' | 'explanation' | 'resume';

export function Card(props: TProps) {
  const { className, idx, active, setActive } = props;
  const card = cardsData[idx];
  const cardNo = idx + 1;
  if (!card) {
    throw new Error(`Nop card found for index ${idx}`);
  }
  const scrollContainerRef = React.useRef<HTMLDivElement>(null);
  const [showMode, setShowMode] = React.useState<TShowMode>('content');
  // Effect: Reset state on open/close
  React.useEffect(() => setShowMode('content'), [active]);
  // Effect: Reset scroll on mode change
  React.useEffect(() => {
    const node = scrollContainerRef.current;
    if (node) {
      node.scrollTop = 0;
    }
  }, [showMode, scrollContainerRef]);
  const { content, explanation, resume } = card;
  const isContent = !active || showMode === 'content';
  const isExplanation = showMode === 'explanation';
  const isResume = showMode === 'resume';
  const showContent = isContent ? content : isExplanation ? explanation : resume;
  const ButtonIcon = isResume ? X : MessageCircleQuestion;
  const buttonText = isContent
    ? 'Узнать, что не так'
    : isExplanation
      ? 'Узнать, как поправить'
      : 'Закрыть';
  return (
    <div
      data-card-idx={idx}
      className={cn(
        isDev && '__Card', // DEBUG
        'flex size-full flex-col items-center justify-center',
        className,
      )}
    >
      <div
        className={cn(
          isDev && '__Card_Backdrop', // DEBUG
          'fixed inset-0',
          'bg-black',
          'z-5',
          'pointer-events-none',
          'transition',
          'opacity-0',
          active && 'opacity-50',
        )}
      />
      <div
        className={cn(
          isDev && '__Card_Wrapper', // DEBUG
          'flex w-full flex-1 flex-col items-center justify-center',
          'gap-4',
          'relative',
          'bg-(--cardBgColor)',
          'border-1 border-(--noDarkColor)',
          'rounded-md',
          'scale-100 opacity-100',
          'shadow-md',
          'transition',
          !active && 'cursor-pointer hover:opacity-80',
          active && 'z-10 scale-130 shadow-xl max-sm:scale-115', // xl:scale-135',
          active && 'max-w-[85%] max-sm:max-w-[100%]',
        )}
        onClick={(ev) => {
          ev.preventDefault();
          ev.stopPropagation();
          setActive(true);
        }}
      >
        <div
          className={cn(
            isDev && '__Card_No', // DEBUG
            'flex flex-col items-center justify-center',
            'absolute shadow-sm',
            'top-[-0.5em] left-[-0.5em]',
            'bg-gradient-to-b from-(--noLightColor) to-(--noDarkColor)',
            'h-[2em] w-[2em]',
            'text-white',
            'rounded-md',
            'select-none',
          )}
        >
          {cardNo}
        </div>
        {active && (
          <div
            className={cn(
              isDev && '__Card_Close', // DEBUG
              'flex flex-col items-center justify-center',
              'absolute shadow-sm',
              'right-[-0.4em] bottom-[-0.4em]',
              'rounded-full',
              'cursor-pointer',
              'transition',
              // 'bg-(--noDarkColor)',
              'bg-gradient-to-b from-(--noLightColor) to-(--noDarkColor)',
              'h-[1.7em] w-[1.7em]',
              'select-none',
              'overflow-hidden',
            )}
            onClick={(ev) => {
              ev.preventDefault();
              ev.stopPropagation();
              setActive(false);
            }}
          >
            <div
              className={cn(
                isDev && '__Card_Close_Hover', // DEBUG
                'absolute inset-0',
                'transition',
                'bg-(--bgDarkColor)',
                'opacity-30',
                'hover:opacity-50',
              )}
            />
            <X className="pointer-events-none z-5 size-5 shrink-0 text-white" />
          </div>
        )}
        <div
          ref={scrollContainerRef}
          className={cn(
            isDev && '__Card_Content', // DEBUG
            'card-content', // NOTE: To styilyze nested content
            'flex w-full flex-col',
            'gap-4',
            'box-border',
            'max-h-(--cardHeight)',
            'text-center',
            !active && 'select-none',
            'overflow-auto',
            'text-white',
          )}
        >
          <div
            className={cn(
              isDev && '__Card_ContentWrapper', // DEBUG
              'flex w-full flex-col items-center',
              'py-4',
            )}
          >
            <div
              className={cn(
                isDev && '__Card_ContentText', // DEBUG
                !isContent && 'text-[80%]',
              )}
            >
              {showContent}
            </div>
            {active && (
              <div
                className={cn(
                  isDev && '__Card_Actions', // DEBUG
                  'flex w-full items-center justify-center',
                  'content-truncate',
                  'shrink-0',
                  'pt-4',
                )}
              >
                <div
                  className={cn(
                    isDev && '__Card_Action', // DEBUG
                    'btn flex items-center gap-2',
                    'bg-(--bgDarkColor)/30 hover:bg-(--bgDarkColor)/50',
                    'content-truncate',
                    'select-none',
                    'text-sm',
                  )}
                  onClick={(ev) => {
                    ev.preventDefault();
                    ev.stopPropagation();
                    if (isContent) {
                      setShowMode('explanation');
                    } else if (isExplanation) {
                      setShowMode('resume');
                    } else {
                      setActive(false);
                    }
                  }}
                >
                  <ButtonIcon className="size-5 shrink-0" />
                  <span className="truncate">{buttonText}</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
