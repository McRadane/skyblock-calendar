import { CalendarParams } from "../app/types";

export type GetDataType = {
  options: CalendarParams | number;
  request: 'ics' | 'json' | 'years';
};
