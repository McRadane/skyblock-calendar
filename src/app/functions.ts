import { createEvents, EventAttributes } from 'ics';

import {
  CURRENT_YEAR,
  EVENT_ANNIVERSARY,
  EVENT_CULT_FALLEN_STAR,
  EVENT_DARK_AUCTION,
  EVENT_HOPPY_HUNT,
  EVENT_JACOB,
  EVENT_JERRY_SEASON,
  EVENT_MAYOR_DERPY_DURATION_DESCRIPTION,
  EVENT_MAYOR_DERPY_ELECTION_DESCRIPTION,
  EVENT_MAYOR_JERRY_DURATION_DESCRIPTION,
  EVENT_MAYOR_JERRY_ELECTION_DESCRIPTION,
  EVENT_MAYOR_SCORPIUS_DURATION_DESCRIPTION,
  EVENT_MAYOR_SCORPIUS_ELECTION_DESCRIPTION,
  EVENT_NEW_YEAR_CELEBRATION,
  EVENT_SPOOKY_FESTIVAL,
  EVENT_TRAVELING_ZOO,
  EVENT_WINTER_ISLAND,
  getFirstSYearFromYear,
  irlEvents,
  monthlyEvents,
  MONTHS,
  recuringEvents,
  specialMayorEventsStarts,
  START_DATE_Y1,
  START_SYEAR,
  SYEAR_DURATION,
  YEAR_DURATION,
  yearlyEvents,
  YEARS_CACHE
} from './constants';
import { CalendarParams, Event, EventDefinition, GenerateEventParams, GenerateSpecialMayorEventParams, MayorEvent, Years } from './types';

export const getYears = (maxYear: number): [number, number] => {
  return [START_SYEAR, START_SYEAR + getFirstSYearFromYear(CURRENT_YEAR + maxYear + 1)];
};

const getYearsIrl = (maxYear: number): Years[] => {
  if (YEARS_CACHE.length > 0) {
    return YEARS_CACHE;
  }

  const [, endYear] = getYears(maxYear);

  for (let i = 0; i < endYear; i++) {
    YEARS_CACHE.push([i + 1, new Date(START_DATE_Y1.getTime() + i * YEAR_DURATION)]);
  }

  return YEARS_CACHE;
};

const convertDaySkyblockToDateSkyblock = (dayOfYear: number): [sDay: number, sMonth: number] => {
  const month = Math.floor(dayOfYear / 31);
  const day = dayOfYear - month * 31;

  return [day, month];
};

const convertDateSkyblockToIrl = (maxYear: number, sDay: number, SMonth: number, sYear: number, end?: boolean): Date => {
  const years = getYearsIrl(maxYear);
  const year = years.find((year) => year[0] === sYear);

  if (year === undefined) {
    throw new Error('Year not found : ' + sYear);
  }

  let time = year[1].getTime();

  time += (SMonth - 1) * 31 * 20 * 60000;
  time += (sDay - 1) * 20 * 60000;

  if (end) {
    time += 20 * 60000 - 1;
  }

  return new Date(time);
};

const getSpecialMayorEvents = (data: CalendarParams): MayorEvent[] => {
  const specialMayorEvents: MayorEvent[] = [];

  specialMayorEventsStarts.forEach((specialMayorEventStart) => {
    let trackElection = false;
    let trackDuration = false;

    switch (specialMayorEventStart[0]) {
      case 'Derpy':
        trackElection = data.mayorDerpyElection ?? false;
        trackDuration = data.mayorDerpyDuration ?? false;
        break;
      case 'Jerry':
        trackElection = data.mayorJerryElection ?? false;
        trackDuration = data.mayorJerryDuration ?? false;
        break;
      case 'Scorpius':
        trackElection = data.mayorScorpiusElection ?? false;
        trackDuration = data.mayorScorpiusDuration ?? false;
        break;
    }

    for (let i = 0; i < 50; i++) {
      const year = specialMayorEventStart[1] + i * 24;
      specialMayorEvents.push([specialMayorEventStart[0], year, trackElection, trackDuration]);
    }
  });

  specialMayorEvents.sort((a, b) => a[1] - b[1]);

  return specialMayorEvents;
};

const formatForSpecialMayorEvents = ({
  eventDescriptionParam,
  eventNameParam,
  specialMayorEvents,
  standardMayorDuration,
  standardMayorElection,
  year
}: GenerateSpecialMayorEventParams) => {
  let addEvent = true;
  let eventName = eventNameParam;
  let eventDescription = eventDescriptionParam;

  if (eventName === 'Election') {
    addEvent = standardMayorElection ?? false;
    // Check if this is an election for a special mayor
    const specialMayorEvent = specialMayorEvents.find((specialMayorEvent) => specialMayorEvent[1] === year);

    if (specialMayorEvent?.[2]) {
      eventName = `Election - Mayor ${specialMayorEvent[0]}`;
      switch (specialMayorEvent[0]) {
        case 'Derpy':
          eventDescription = EVENT_MAYOR_DERPY_ELECTION_DESCRIPTION;
          break;
        case 'Jerry':
          eventDescription = EVENT_MAYOR_JERRY_ELECTION_DESCRIPTION;
          break;
        case 'Scorpius':
          eventDescription = EVENT_MAYOR_SCORPIUS_ELECTION_DESCRIPTION;
          break;
      }
      addEvent = true;
    }
  }

  if (eventName === 'Mayor') {
    addEvent = standardMayorDuration ?? false;
    // Check if this is an election for a special mayor
    const specialMayorEvent = specialMayorEvents.find((specialMayorEvent) => specialMayorEvent[1] === year);

    if (specialMayorEvent?.[3]) {
      eventName = `Mayor ${specialMayorEvent[0]}`;
      switch (specialMayorEvent[0]) {
        case 'Derpy':
          eventDescription = EVENT_MAYOR_DERPY_DURATION_DESCRIPTION;
          break;
        case 'Jerry':
          eventDescription = EVENT_MAYOR_JERRY_DURATION_DESCRIPTION;
          break;
        case 'Scorpius':
          eventDescription = EVENT_MAYOR_SCORPIUS_DURATION_DESCRIPTION;
          break;
      }
      addEvent = true;
    }
  }

  return { addEvent, eventDescription, eventName };
};

const generateEvent = (options: GenerateEventParams): Event[] => {
  // 500 year
  const events: Event[] = [];
  const {
    eventDayEnd,
    eventDayStart,
    eventDescriptionParam,
    eventMonthEnd,
    eventMonthStart,
    eventNameParam,
    maxYear,
    shiftYear = 0,
    specialMayorEvents
  } = options;

  const [startYear, endYear] = getYears(maxYear);

  for (let year = startYear; year < endYear; year++) {
    let addEvent = true;
    let eventName = eventNameParam;
    let eventDescription = eventDescriptionParam;

    if (specialMayorEvents) {
      const response = formatForSpecialMayorEvents({ ...options, specialMayorEvents, year });
      addEvent = response.addEvent;
      eventName = response.eventName;
      eventDescription = response.eventDescription;
    }

    if (addEvent) {
      const event = {
        end: convertDateSkyblockToIrl(maxYear, eventDayEnd, eventMonthEnd, year + shiftYear, true),
        endS: [eventDayEnd, eventMonthEnd, year + shiftYear],
        eventDescription,
        eventName,
        start: convertDateSkyblockToIrl(maxYear, eventDayStart, eventMonthStart, year),
        startS: [eventDayStart, eventMonthStart, year]
      };

      events.push(event);
    }
  }

  return events;
};

const checkEventToGenerate = (event: EventDefinition, params: CalendarParams): boolean => {
  switch (event.name) {
    case EVENT_ANNIVERSARY:
      return params.anniversary ?? false;
    case EVENT_CULT_FALLEN_STAR:
      return params.cultFallenStar ?? false;
    case EVENT_DARK_AUCTION:
      return params.darkAuction ?? false;
    case EVENT_HOPPY_HUNT:
      return params.hoppyHunt ?? false;
    case EVENT_JACOB:
      return params.jacob ?? false;
    case EVENT_JERRY_SEASON:
      return params.jerrySeason ?? false;
    case EVENT_NEW_YEAR_CELEBRATION:
      return params.newYearCelebration ?? false;
    case EVENT_SPOOKY_FESTIVAL:
      return params.spookyFestival ?? false;
    case EVENT_TRAVELING_ZOO:
      return params.travelingZoo ?? false;
    case EVENT_WINTER_ISLAND:
      return params.winterIsland ?? false;
  }

  return false;
};

const generateYearlyEvents = (params: CalendarParams): Event[] => {
  let allEvents: Event[] = [];
  const specialMayorEvents = getSpecialMayorEvents(params);

  yearlyEvents.forEach((yearlyEvent) => {
    const eventToGenerate = checkEventToGenerate(yearlyEvent, params);

    if (!eventToGenerate) {
      return;
    }

    allEvents = allEvents.concat(
      generateEvent({
        eventDayEnd: yearlyEvent.endDay,
        eventDayStart: yearlyEvent.startDay,
        eventDescriptionParam: yearlyEvent.description,
        eventMonthEnd: yearlyEvent.endMonth,
        eventMonthStart: yearlyEvent.startMonth,
        eventNameParam: yearlyEvent.name,
        maxYear: params.maxYear,
        specialMayorEvents,
        standardMayorDuration: params.standardMayorDuration,
        standardMayorElection: params.standardMayorElection
      })
    );
  });

  return allEvents;
};

const generateMonthlyEvents = (params: CalendarParams): Event[] => {
  let allEvents: Event[] = [];

  monthlyEvents.forEach((monthlyEvent) => {
    const eventToGenerate = checkEventToGenerate(monthlyEvent, params);

    if (!eventToGenerate) {
      return;
    }

    MONTHS.forEach((month) => {
      allEvents = allEvents.concat(
        generateEvent({
          eventDayEnd: monthlyEvent.endDay,
          eventDayStart: monthlyEvent.startDay,
          eventDescriptionParam: monthlyEvent.description,
          eventMonthEnd: month,
          eventMonthStart: month,
          eventNameParam: monthlyEvent.name,
          maxYear: params.maxYear
        })
      );
    });
  });

  return allEvents;
};

const generateIrlEvents = (params: CalendarParams): Event[] => {
  const allEvents: Event[] = [];
  for (let year = new Date().getFullYear(); year < params.maxYear; year++) {
    irlEvents.forEach((irlEvent) => {
      const eventToGenerate = checkEventToGenerate(irlEvent, params);

      if (!eventToGenerate) {
        return;
      }

      allEvents.push({
        end: new Date(year, irlEvent.realMonth - 1, irlEvent.realDay, 23, 59, 59),
        eventDescription: irlEvent.description,
        eventName: irlEvent.name,
        start: new Date(year, irlEvent.realMonth - 1, irlEvent.realDay, 0, 0, 0)
      });
    });
  }

  return allEvents;
};

const generateRecuringEvents = (params: CalendarParams): Event[] => {
  let allEvents: Event[] = [];

  const [startYear, endYear] = getYears(params.maxYear);

  recuringEvents.forEach((recuringEvent) => {
    const eventToGenerate = checkEventToGenerate(recuringEvent, params);

    if (!eventToGenerate) {
      return;
    }

    for (let year = startYear; year < endYear; year++) {
      //convertDaySkyblockToDateSkyblock

      const startDay = recuringEvent.firstDay + (recuringEvent.firstMonth - 1) * 31;

      for (let dayOfYear = startDay; dayOfYear <= SYEAR_DURATION; dayOfYear += recuringEvent.recuringDay) {
        const [eventDayStart, eventMonthStart] = convertDaySkyblockToDateSkyblock(dayOfYear);
        const [eventDayEnd, eventMonthEnd] = convertDaySkyblockToDateSkyblock(dayOfYear + recuringEvent.duration);
        allEvents = allEvents.concat(
          generateEvent({
            eventDayEnd,
            eventDayStart,
            eventDescriptionParam: recuringEvent.description,
            eventMonthEnd,
            eventMonthStart,
            eventNameParam: recuringEvent.name,
            maxYear: params.maxYear
          })
        );
      }
    }
  });

  return allEvents;
};

export const generateEvents = (params: CalendarParams): Event[] => {
  let allEvents: Event[] = [];

  allEvents = allEvents.concat(generateYearlyEvents(params));
  allEvents = allEvents.concat(generateMonthlyEvents(params));
  allEvents = allEvents.concat(generateIrlEvents(params));
  allEvents = allEvents.concat(generateRecuringEvents(params));

  allEvents = [...allEvents].sort((a, b) => a.start.getTime() - b.start.getTime());

  return allEvents;
};

export const generateCalendar = (events: Event[]): string => {
  const icsEvents: EventAttributes[] = [];

  const DURATION_DAY = 24 * 60 * 60 * 1000;
  const DURATION_HOUR = 60 * 60 * 1000;
  const DURATION_MINUTE = 60 * 1000;

  events.forEach((event) => {
    let days;
    let hours;
    let minutes;

    let duration = event.end.getTime() - event.start.getTime();

    if (duration > DURATION_DAY) {
      days = Math.floor(duration / DURATION_DAY);
      duration -= days * DURATION_DAY;
    }

    if (duration > DURATION_HOUR) {
      hours = Math.floor(duration / DURATION_HOUR);
      duration -= hours * DURATION_HOUR;
    }

    if (duration > DURATION_MINUTE) {
      minutes = Math.floor(duration / DURATION_MINUTE);
    }

    const icsEvent: EventAttributes = {
      description: event.eventDescription,
      duration: { days, hours, minutes },
      start: [
        event.start.getFullYear(),
        event.start.getMonth() + 1,
        event.start.getDate(),
        event.start.getHours(),
        event.start.getMinutes()
      ],
      title: event.eventName
    };

    icsEvents.push(icsEvent);
  });

  const { error, value } = createEvents(icsEvents);

  if (error) {
    // eslint-disable-next-line no-console
    console.error('Error occuring in ICS generation. Please report on GitHub', error);
    return '';
  }

  return value ?? '';
};
