import { createEffect, createMemo, createSignal, For, Setter } from 'solid-js';

import './App.css';
import { EventCard, mayorEventsDefinition, otherEventDefinition, yearlyEventDefinition } from './app/events';
import { Card } from './Card';
import { getJSON } from './worker/caller';

const CACHE_EVENT = 'selectedEvents';

const getMemoisedEvents = (definitions: EventCard[], selected: Record<string, boolean>, setSelected: Setter<Record<string, boolean>>) => {
  return definitions.map(([id, title, icon, description, date, defaultSelected]) => {
    return {
      date,
      description,
      icon,
      onClick: () => {
        console.log('onClick', id);
        setSelected((prev) => {
          const result = prev[id] === undefined ? { ...prev, [id]: !(defaultSelected ?? false) } : { ...prev, [id]: !prev[id] };

          console.log('setSelected', { prev, result });

          localStorage.setItem(CACHE_EVENT, JSON.stringify(result));
          return result;
        });
      },
      selected: selected[id] ?? defaultSelected ?? false,
      title
    };
  });
};

const downloadFile = (mime: string, fileNameString: string, sourceObject: string) => { //text/json
  const dataStr = `data:${mime};charset=utf-8,${encodeURIComponent(sourceObject)}`;
  if (!fileNameString.endsWith('.json')) {
    fileNameString += '.json';
  }

  const link = document.createElement('a');
  if (link.download !== undefined) {
    // Browsers that support HTML5 download attribute
    link.setAttribute('href', dataStr);
    link.setAttribute('download', fileNameString);
    link.style.visibility = 'hidden';
    link.dataset.interception = 'off';

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
};

function App() {
  const [getSelected, setSelected] = createSignal<Record<string, boolean>>({});

  createEffect(() => {
    const selectedCache = localStorage.getItem(CACHE_EVENT);
    const selected = (selectedCache ? JSON.parse(selectedCache) : {}) as Record<string, boolean>;

    setSelected(selected);
  });

  const yearlyEvent = createMemo(() => {
    const selected = getSelected();
    console.log('memo yearlyEvent', selected);
    return getMemoisedEvents(yearlyEventDefinition, selected, setSelected);
  });

  const mayorEvents = createMemo(() => {
    const selected = getSelected();
    console.log('memo mayorEvents', selected);
    return getMemoisedEvents(mayorEventsDefinition, selected, setSelected);
  });

  const otherEvent = createMemo(() => {
    const selected = getSelected();
    console.log('memo otherEvent', selected);
    return getMemoisedEvents(otherEventDefinition, selected, setSelected);
  });

  const generateJson = async () => {
    const baseOptions = getSelected();

    const events = await getJSON({ ...baseOptions, maxYear: 2 });

    console.log('generateJson', events);
  };

  return (
    <div class="container">
      <h1 class="title">Hypixel Skyblock Calendar Generator</h1>
      <blockquote>
        <p>
          <em>Generate iCal (ICS) files for Hypixel Skyblock events</em>
        </p>
      </blockquote>

      <p>Select which events you want to track</p>
      <div class="buttons">
        <button class="button is-primary">Generate .ics</button>
        <button class="button is-link" onClick={generateJson}>
          Generate .json
        </button>
      </div>

      <h2 class="subtitle">Yearly Events</h2>
      <div class="grid is-col-min-12">
        <For each={yearlyEvent()}>
          {({ date, description, icon, onClick, selected, title }) => (
            <Card date={date} description={description} image={icon} onClick={onClick} selected={selected ?? false} title={title} />
          )}
        </For>
      </div>

      <h2 class="subtitle">Mayors</h2>
      <div class="grid is-col-min-12">
        <For each={mayorEvents()}>
          {({ date, description, icon, onClick, selected, title }) => (
            <Card date={date} description={description} image={icon} onClick={onClick} selected={selected ?? false} title={title} />
          )}
        </For>
      </div>

      <h2 class="subtitle">Other Events</h2>
      <div class="grid is-col-min-12">
        <For each={otherEvent()}>
          {({ date, description, icon, onClick, selected, title }) => (
            <Card date={date} description={description} image={icon} onClick={onClick} selected={selected ?? false} title={title} />
          )}
        </For>
      </div>
    </div>
  );
}

export default App;

// stocker la config dans le localstorage
// au chargement: lire le localstorage puis mettre à jour le store
// au clic: mettre à jour le store puis le localstorage

//
