import { CalendarParams } from "../app/types";

export type GetDataType = {
  options: CalendarParams;
  request: 'ics' | 'json';
};
