import { CalendarParams } from '../app/types';
import { logging } from '../logging';
import CalendarWorker from './worker?worker';

const calendar = new CalendarWorker();

export const workerCallGetICS = async (options: CalendarParams): Promise<string> => {
  return new Promise<string>((resolve) => {
    const query = JSON.stringify({ options, request: 'ics' });

    logging('Sending request for ICS', query);

    calendar.postMessage(query);

    calendar.onmessage = (event) => {
      resolve(event.data);
    };
  });
};

export const workerCallGetJSON = async (options: CalendarParams): Promise<string> => {
  return new Promise<string>((resolve) => {
    const query = JSON.stringify({ options, request: 'json' });

    logging('Sending request for JSON', query);

    calendar.postMessage(query);

    calendar.onmessage = (event) => {
      resolve(event.data);
    };
  });
};

export const workerCallGetYears = async (wantedYears: number): Promise<[number, number]> => {
  return new Promise<[number, number]>((resolve) => {
    const query = JSON.stringify({ options: wantedYears, request: 'years' });

    logging('Sending request for Years', query);

    calendar.postMessage(query);

    calendar.onmessage = (event) => {
      resolve(event.data);
    };
  });
};
