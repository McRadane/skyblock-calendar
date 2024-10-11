import { CalendarParams } from '../app/types';
import CalendarWorker from './worker?worker';

const calendar = new CalendarWorker();

export const getICS = async (options: CalendarParams) => {
  return new Promise<string>((resolve) => {
    const query = JSON.stringify({ options, request: 'ics' });

    console.log('Sending request for ICS', query);

    calendar.postMessage(query);

    calendar.onmessage = (event) => {
      resolve(event.data);
    };
  });
};

export const getJSON = async (options: CalendarParams) => {
  return new Promise<string>((resolve) => {
    const query = JSON.stringify({ options, request: 'json' });

    console.log('Sending request for JSON', query);

    calendar.postMessage(query);

    calendar.onmessage = (event) => {
      resolve(event.data);
    };
  });
};
