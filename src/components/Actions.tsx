import React from 'react';
import { Maximize, Minimize } from 'lucide-react';
import screenfull from 'screenfull';

import { isDev } from '@/config';
import { cn } from '@/lib';

interface TActionsProps {
  className?: string;
}

export function Actions({ className }: TActionsProps) {
  const [isFullscreen, setFullscreen] = React.useState(false);

  React.useEffect(() => {
    if (isFullscreen) {
      screenfull.request();
    } else {
      screenfull.exit();
    }
  }, [isFullscreen]);

  const toggleFullscreen = () => setFullscreen((isFullscreen) => !isFullscreen);

  const FullScreenIcon = isFullscreen ? Minimize : Maximize;

  return (
    <div
      className={cn(
        isDev && '__Actions', // DEBUG
        'fixed',
        'select-none',
        'right-4 bottom-4',
        'h-[3em]',
        'flex items-stretch justify-center gap-2',
        'z-20',
        className,
      )}
    >
      <NavIcon
        className={cn(
          isDev && '__Actions_Fullscreen', // DEBUG
          'bg-blue-500',
        )}
        title="Полноэкранный режим"
        onClick={toggleFullscreen}
      >
        <FullScreenIcon size="2em" />
      </NavIcon>
    </div>
  );
}

interface TIconProps {
  onClick: () => void;
  title: string;
  className?: string;
  children: React.ReactNode;
  disabled?: boolean;
}

function NavIcon(props: TIconProps) {
  const { onClick, title, className, children, disabled } = props;
  return (
    <div
      className={cn(
        isDev && '__Actions_NavIcon', // DEBUG
        'flex items-center justify-center',
        'size-[2em]',
        'text-white',
        'rounded-full shadow-lg/30',
        'transition',
        'cursor-pointer',
        'opacity-80',
        'hover:opacity-100',
        'p-2',
        disabled && 'disabled pointer-events-none opacity-25',
        className,
      )}
      title={title}
      onClick={onClick}
    >
      {children}
    </div>
  );
}
