import { generateCalendar, generateEvents, getYears } from '../app/functions';
import { CalendarParams } from '../app/types';
import { logging } from '../logging';
import { GetDataType } from './type';

self.onmessage = (event: MessageEvent<string>) => {
  const data = JSON.parse(event.data) as GetDataType;

  if (data.request === 'years') {
    //const ics = generateCalendar(events);
    const years = getYears(data.options as number);
    self.postMessage(years);
    return;
  }

  const events = generateEvents(data.options as CalendarParams);

  logging('Receiving request for ' + data.request);

  if (data.request === 'json') {
    // Remove the 'description' field from the events
    const purged = events.map((event) => {
      return {
        end: event.end,
        endS: event.endS,
        eventName: event.eventName,
        start: event.start,
        startS: event.startS
      };
    });
    self.postMessage(JSON.stringify(purged, null, 2));
    return;
  }

  if (data.request === 'ics') {
    const ics = generateCalendar(events);
    self.postMessage(ics);
  }
};

export {};
