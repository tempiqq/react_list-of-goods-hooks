import 'bulma/css/bulma.css';
import './App.scss';
import React, { useState } from 'react';
import cn from 'classnames';

export const goodsFromServer: readonly string[] = [
  'Dumplings',
  'Carrot',
  'Eggs',
  'Ice cream',
  'Apple',
  'Bread',
  'Fish',
  'Honey',
  'Jam',
  'Garlic',
];

const SORT_FIELD_ALPHABETICALLY = 'alphabetically' as const;
const SORT_FIELD_LENGTH = 'length' as const;
const SORT_FIELD_RESET = '' as const;

type SortFieldType =
  | typeof SORT_FIELD_ALPHABETICALLY
  | typeof SORT_FIELD_LENGTH
  | typeof SORT_FIELD_RESET;

interface GetPreparedGoodsOptions {
  sortField: SortFieldType;
  isReversed: boolean;
}

function getPreparedGoods(
  goods: readonly string[],
  { sortField, isReversed }: GetPreparedGoodsOptions,
): string[] {
  const preparedGoods: string[] = [...goods];

  if (sortField) {
    preparedGoods.sort((good1: string, good2: string): number => {
      switch (sortField) {
        case SORT_FIELD_ALPHABETICALLY:
          return good1.localeCompare(good2);
        case SORT_FIELD_LENGTH:
          return good1.length - good2.length;

        default:
          return 0;
      }
    });
  }

  if (isReversed) {
    preparedGoods.reverse();
  }

  return preparedGoods;
}

export const App: React.FC = () => {
  const [sortField, setSortField] = useState<SortFieldType>(SORT_FIELD_RESET);
  const [isReversed, setIsReversed] = useState<boolean>(false);

  const visibleGoods: string[] = getPreparedGoods(goodsFromServer, {
    sortField,
    isReversed,
  });

  const isResetVisible: boolean = !(
    sortField === SORT_FIELD_RESET && !isReversed
  );

  const handleReset = () => {
    setSortField(SORT_FIELD_RESET);
    setIsReversed(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button is-info', {
            'is-light': sortField !== SORT_FIELD_ALPHABETICALLY,
          })}
          onClick={() => setSortField(SORT_FIELD_ALPHABETICALLY)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button is-info', {
            'is-light': sortField !== SORT_FIELD_LENGTH,
          })}
          onClick={() => setSortField(SORT_FIELD_LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button is-warning', {
            'is-light': !isReversed,
          })}
          onClick={() => setIsReversed(prev => !prev)}
        >
          Reverse
        </button>

        {isResetVisible && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              handleReset();
            }}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {visibleGoods.map(good => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
