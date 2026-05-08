import React from 'react';
import { Check, LoaderCircle } from 'lucide-react';
import { toast } from 'react-toastify';

import { cn, getErrorText } from '@/lib/helpers';
import { ErrorLike } from '@/lib/types/ErrorLike';
import { appTitle, isDev } from '@/config';

const __debugUseDemoData = isDev && false;

export function MainPage() {
  const [error, setError] = React.useState<ErrorLike>();
  const [isCreating, setIsCreating] = React.useState(false);
  const [hasCreated, setHasCreated] = React.useState(false);

  return (
    <div
      className={cn(
        isDev && '__MainPage', // DEBUG
        'flex w-full flex-col self-center',
        'max-w-md',
      )}
    >
      <div
        className={cn(
          isDev && '__MainPage_Container', // DEBUG
          'content-truncate flex flex-col gap-4 p-6',
        )}
      >
        {!!error && (
          <div
            className={cn(
              isDev && '__MainPage_Error', // DEBUG
              'content-truncate rounded bg-red-500 p-3 text-sm text-white',
            )}
          >
            {String(error)}
          </div>
        )}
        {!!appTitle && (
          <h1
            className={cn(
              isDev && '__MainPage_Title', // DEBUG
              'content-truncate m-0',
              'text-[1.5rem]',
            )}
          >
            {appTitle}
          </h1>
        )}
        <ul
          className={cn(
            isDev && '__MainPage_Cards', // DEBUG
            'content-truncate animation m-0 flex flex-col gap-1 p-0',
            isCreating && 'disabled',
          )}
        >
          Cards
        </ul>
        {/* // UNUSED: Actions
        <div
          className={cn(
            isDev && '__MainPage_Actions', // DEBUG
            'content-truncate',
          )}
        >
          <div
            className={cn(
              isDev && '__MainPage_MainButton', // DEBUG
              'btn-base flex items-center p-3 text-white',
              'cursor-pointer select-none',
              'bg-sky-500 hover:bg-sky-600 active:bg-sky-700',
              // !selectedItems.size && 'disabled bg-slate-500/50',
            )}
            // onClick={createDoc}
          >
            {isCreating ? (
              <>
                <LoaderCircle className="size-8 animate-spin opacity-50" />
                <span className="flex-1 truncate">Создание документа</span>
              </>
            ) : hasCreated ? (
              <>
                <Check className="size-8 opacity-50" />
                <span className="flex-1 truncate">Документ создан</span>
              </>
            ) : (
              <>
                <img src="./static/doc-icon.svg" className="size-8 shrink-0 text-green-500" />
                <span className="flex-1 truncate">Создать документ</span>
              </>
            )}
          </div>
        </div>
        */}
      </div>
    </div>
  );
}
