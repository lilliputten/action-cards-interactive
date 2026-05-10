import React from 'react';

import { cn } from '@/lib/helpers';
import { isDev } from '@/config';

import { cardsData } from '../constants';
import { Card } from './Card';

interface TProps {
  className?: string;
}

const __debugShowActiveCardByDefault = isDev && false;
const defaultActiveCardIdx = __debugShowActiveCardByDefault ? 1 : undefined;

export function CardsGrid(props: TProps) {
  const { className } = props;
  const [activeCardIdx, setActiveCardIdx] = React.useState<number | undefined>(
    defaultActiveCardIdx,
  );
  // Effect: Deactivate
  React.useEffect(() => {
    if (activeCardIdx != undefined) {
      const resetActiveCard = () => setActiveCardIdx(undefined);
      const handleEsc = (event: KeyboardEvent) => {
        if (event.key === 'Escape') {
          resetActiveCard();
        }
      };
      document.addEventListener('click', resetActiveCard);
      document.addEventListener('keydown', handleEsc);
      return () => {
        document.removeEventListener('click', resetActiveCard);
        document.removeEventListener('keydown', handleEsc);
      };
    }
  }, [activeCardIdx]);
  return (
    <div
      className={cn(
        isDev && '__CardsGrid', // DEBUG
        'grid',
        'grid-cols-[repeat(auto-fill,minmax(var(--cardWidth),1fr))]',
        'items-stretch justify-center',
        'gap-6',
        'p-10',
        'auto-rows-(--cardHeight)',
        className,
      )}
    >
      {cardsData.map((_card, idx) => {
        return (
          <Card
            key={`card-${idx}`}
            idx={idx}
            active={idx === activeCardIdx}
            setActive={(active) => setActiveCardIdx(active ? idx : undefined)}
          />
        );
      })}
    </div>
  );
}
