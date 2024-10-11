export type Years = [skyblockYear: number, realDate: Date];
//export type MayorEventDefinition = [name: string, startYear: number, highlightElection: boolean, highlightDuration: boolean];
export type MayorEventDefinition = [name: string, startYear: number];

export type MayorEvent = [name: string, year: number, highlightElection: boolean, highlightDuration: boolean];

export interface EventDefinition {
  description: string;
  name: string;
}

export interface YearlyEvents extends EventDefinition {
  endDay: number;
  endMonth: number;
  shiftYear?: number;
  startDay: number;
  startMonth: number;
}

export interface MontlyEvents extends EventDefinition {
  endDay: number;
  startDay: number;
}

export interface IrlEvents extends EventDefinition {
  realDay: number;
  realMonth: number;
}

export interface RecuringEvents extends EventDefinition {
  duration: number;
  firstDay: number;
  firstMonth: number;
  recuringDay: number;
}

export interface GenerateEventParams {
  eventDayEnd: number;
  eventDayStart: number;
  eventDescriptionParam: string;
  eventMonthEnd: number;
  eventMonthStart: number;
  eventNameParam: string;
  maxYear: number;
  shiftYear?: number;
  specialMayorEvents?: MayorEvent[];
  standardMayorDuration?: boolean;
  standardMayorElection?: boolean;
}

export interface Event {
  end: Date;
  endS?: number[];
  eventDescription: string;
  eventName: string;
  start: Date;
  startS?: number[];
}

export interface CalendarParams {
  anniversary?: boolean;
  cultFallenStar?: boolean;
  darkAuction?: boolean;
  hoppyHunt?: boolean;
  jacob?: boolean;
  jerrySeason?: boolean;
  maxYear: number;
  mayorDerpyDuration?: boolean;
  mayorDerpyElection?: boolean;
  mayorJerryDuration?: boolean;
  mayorJerryElection?: boolean;
  mayorScorpiusDuration?: boolean;
  mayorScorpiusElection?: boolean;
  newYearCelebration?: boolean;
  spookyFestival?: boolean;
  standardMayorDuration?: boolean;
  standardMayorElection?: boolean;
  travelingZoo?: boolean;
  winterIsland?: boolean;
}
