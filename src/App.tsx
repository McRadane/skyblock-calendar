import { createEffect, createMemo, createSignal, For } from 'solid-js';

import './App.css';
import { CURRENT_YEAR } from './app/constants';
import { mayorEventsDefinition, otherEventDefinition, yearlyEventDefinition } from './app/events';
import { getYears } from './app/functions';
import { getMemoisedEvents, getSelectedFromCache, getYearsFromCache } from './cache';
import { Card } from './Card';
import { downloadIcs, downloadJson } from './download';
import { logging } from './logging';

// @ts-expect-error -- The modelYears is used by Solid
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { modelYears } from './models';
import { workerCallGetICS, workerCallGetJSON, workerCallGetYears } from './worker/caller';

function App() {
  const [getSelected, setSelected] = createSignal<Record<string, boolean>>({});
  const [wantedYears, setWantedYears] = createSignal(2);
  const [years, setYears] = createSignal<[number, number]>(getYears(wantedYears()));

  createEffect(() => {
    const selectedCache = getSelectedFromCache();
    const wantedYearsCache = getYearsFromCache();

    [...yearlyEventDefinition, ...mayorEventsDefinition, ...otherEventDefinition].forEach(({ defaultSelected, id }) => {
      if (selectedCache[id] === undefined) {
        selectedCache[id] = defaultSelected ?? false;
      }
    });

    logging('Loaded cache', selectedCache, wantedYearsCache);

    setSelected(selectedCache);
    setWantedYears(wantedYearsCache);
  });

  createEffect(() => {
    workerCallGetYears(wantedYears()).then((yearsResponse) => {
      logging('Loaded years', yearsResponse);
      setYears(yearsResponse);
    });
  });

  const yearlyEvent = createMemo(() => {
    const selected = getSelected();

    return getMemoisedEvents(yearlyEventDefinition, selected, setSelected);
  });

  const mayorEvents = createMemo(() => {
    const selected = getSelected();

    return getMemoisedEvents(mayorEventsDefinition, selected, setSelected);
  });

  const otherEvent = createMemo(() => {
    const selected = getSelected();

    return getMemoisedEvents(otherEventDefinition, selected, setSelected);
  });

  const generateJSON = async () => {
    const baseOptions = getSelected();

    const events = await workerCallGetJSON({ ...baseOptions, maxYear: 2 });

    logging('Generated JSON', events);

    downloadJson(`hypixel-skyblock-events-${new Date().toISOString().slice(0, 10)}.json`, events);
  };

  const generateICS = async () => {
    const baseOptions = getSelected();

    const events = await workerCallGetICS({ ...baseOptions, maxYear: 2 });

    logging('Generated ICS', events);

    downloadIcs(`hypixel-skyblock-events-${new Date().toISOString().slice(0, 10)}.ics`, events);
  };

  return (
    <>
      <div class="container">
        <h1 class="title">Hypixel Skyblock Calendar Generator</h1>
        <section class="section">
          <blockquote>
            <p>
              <em>Generate iCal (ICS) files for Hypixel Skyblock events</em>
            </p>
          </blockquote>

          <div class="columns">
            <div class="column">
              <p>
                Generate events from {CURRENT_YEAR} to {CURRENT_YEAR + wantedYears()}
              </p>
            </div>
            <div class="column">
              <input class="input" max="10" min="1" type="number" use:modelYears={[wantedYears, setWantedYears]} />
            </div>
            <div class="column">
              <p>
                Events will be generated for Skyblock Year {years()[0]} to {years()[1] - 1}
              </p>
            </div>
            <div class="column">
              <div class="buttons">
                <button class="button is-primary" onClick={generateICS}>
                  download iCal (.ics)
                </button>
                <button class="button is-link" onClick={generateJSON}>
                  Download data (.json)
                </button>
              </div>
            </div>
          </div>
        </section>

        <section class="section">
          <h1 class="title">Events</h1>
          <p>Select which events you want to track</p>
          <h2 class="subtitle is-2">Yearly Events</h2>
          <div class="grid is-col-min-12">
            <For each={yearlyEvent()}>
              {({ date, description, icon, onClick, selected, title }) => (
                <Card date={date} description={description} image={icon} onClick={onClick} selected={selected ?? false} title={title} />
              )}
            </For>
          </div>

          <h2 class="subtitle is-2">Mayors</h2>
          <div class="grid is-col-min-12">
            <For each={mayorEvents()}>
              {({ date, description, icon, onClick, selected, title }) => (
                <Card date={date} description={description} image={icon} onClick={onClick} selected={selected ?? false} title={title} />
              )}
            </For>
          </div>

          <h2 class="subtitle is-2">Other Events</h2>
          <div class="grid is-col-min-12">
            <For each={otherEvent()}>
              {({ date, description, icon, onClick, selected, title }) => (
                <Card date={date} description={description} image={icon} onClick={onClick} selected={selected ?? false} title={title} />
              )}
            </For>
          </div>
        </section>
      </div>
      <footer class="section footer">
        McRadane - <a href="">source code</a>
      </footer>
    </>
  );
}

export default App;

// stocker la config dans le localstorage
// au chargement: lire le localstorage puis mettre à jour le store
// au clic: mettre à jour le store puis le localstorage

//
