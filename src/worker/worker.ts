import { generateCalendar, generateEvents } from '../app/functions';
import { GetDataType } from './type';

self.onmessage = (event: MessageEvent<string>) => {
  const data = JSON.parse(event.data) as GetDataType;

  const events = generateEvents(data.options);

  console.log('Receiving request for ' + data.request);

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
