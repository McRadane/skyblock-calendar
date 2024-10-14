import { Setter } from 'solid-js';

import { EventCard } from './app/events';

const CACHE_EVENT = 'selectedEvents';
const CACHE_YEARS = 'wantedYears';

export const getYearsFromCache = () => {
  const wantedYearsRaw = localStorage.getItem(CACHE_YEARS);
  return (wantedYearsRaw ? Number.parseInt(wantedYearsRaw) : 2);
};

export const getSelectedFromCache = () => {
  const selectedCacheRaw = localStorage.getItem(CACHE_EVENT);
  return (selectedCacheRaw ? JSON.parse(selectedCacheRaw) : {}) as Record<string, boolean>;
};

export const getMemoisedEvents = (
  definitions: EventCard[],
  selected: Record<string, boolean>,
  setSelected: Setter<Record<string, boolean>>
) => {
  return definitions.map(({ date, defaultSelected, description, icon, id, name }) => {
    return {
      date,
      description,
      icon,
      onClick: () => {
        setSelected((prev) => {
          const result = prev[id] === undefined ? { ...prev, [id]: !(defaultSelected ?? false) } : { ...prev, [id]: !prev[id] };

          localStorage.setItem(CACHE_EVENT, JSON.stringify(result));
          return result;
        });
      },
      selected: selected[id] ?? defaultSelected ?? false,
      title: name
    };
  });
};
