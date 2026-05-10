import { cn } from '@/lib/helpers';
import { isDev } from '@/config';

import { cardsData } from '../constants';

interface TProps {
  className?: string;
  idx: number;
  active: boolean;
  setActive: (active: boolean) => void;
}

export function Card(props: TProps) {
  const { className, idx, active, setActive } = props;
  const card = cardsData[idx];
  const cardNo = idx + 1;
  if (!card) {
    throw new Error(`Nop card found for index ${idx}`);
  }
  const { content, explanation, resume } = card;
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
          'relative',
          'bg-(--cardBgColor)',
          'border-1 border-(--noDarkColor)',
          'rounded-md',
          'scale-100 opacity-100',
          'shadow-md',
          'transition',
          !active && 'cursor-pointer hover:opacity-80',
          active && 'z-10 scale-120 shadow-xl max-sm:scale-110 lg:scale-115',
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
            'bg-gradient-to-b',
            'from-(--noLightColor) to-(--noDarkColor)',
            'h-[2em]',
            'w-[2em]',
            'rounded-md',
            'select-none',
          )}
        >
          {cardNo}
        </div>
        <div
          className={cn(
            isDev && '__Card_Content', // DEBUG
            'card-content',
            'flex w-full flex-1 flex-col items-center justify-center',
            'text-center',
            'content-truncate',
            'select-none',
          )}
        >
          {content}
        </div>
      </div>
    </div>
  );
}
