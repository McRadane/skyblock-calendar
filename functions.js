const YEARS_CACHE = [];
const START_DATE_Y1 = new Date(2019, 5, 11, 19, 55, 0, 0);
const YEAR_DURATION = 20 * 372 * 60000;
const START_SYEAR = 375;

const specialMayorEventsStarts = [
  ["Derpy", 9, false, true],
  ["Jerry", 17, false, true],
  ["Scorpius", 25, true, false],
];

const getYearsIrl = () => {
  if (YEARS_CACHE.length > 0) {
    return YEARS_CACHE;
  }

  for (let i = 0; i < START_SYEAR + 500; i++) {
    YEARS_CACHE.push([
      i + 1,
      new Date(START_DATE_Y1.getTime() + i * YEAR_DURATION),
    ]);
  }

  return YEARS_CACHE;
};

const convertDate = (sDay, SMonth, sYear, end) => {
  const years = getYearsIrl();
  const year = years.find((year) => year[0] === sYear);

  if (!year) {
    console.log("Year not found", sYear, years);
  }

  let time = year[1].getTime();

  time += (SMonth - 1) * 31 * 20 * 60000;
  time += (sDay - 1) * 20 * 60000;

  if (end) {
    time += 20 * 60000 - 1;
  }

  return new Date(time);
};

const specialMayorEvents = [];

const getSpecialMayorEvents = () => {
    if (specialMayorEvents.length > 0) {
    return specialMayorEvents;
    }

  specialMayorEventsStarts.forEach((specialMayorEventStart) => {
    for (let i = 0; i < 50; i++) {
      const year = specialMayorEventStart[1] + i * 24;
      specialMayorEvents.push([
        specialMayorEventStart[0],
        year,
        specialMayorEventStart[2],
        specialMayorEventStart[3],
      ]);
    }
  });

  specialMayorEvents.sort((a, b) => a[1] - b[1]);
};

const generateEvent = (
  eventNameParam,
  eventDayStart,
  eventMonthStart,
  eventDayEnd,
  eventMonthEnd,
  shiftYear = 0
) => {
  // 500 year
  const events = [];
  const specialMayorEvents = getSpecialMayorEvents();

  for (let year = START_SYEAR; year < START_SYEAR + 500; year++) {
    let addEvent = true;
    let eventName = eventNameParam;

    if (eventName === "Election") {
      addEvent = false;
      // Check if this is an election for a special mayor
      const specialMayorEvent = specialMayorEvents.find(
        (specialMayorEvent) => specialMayorEvent[1] === year
      );

      if (specialMayorEvent?.[2]) {
        eventName = `Election - Mayor ${specialMayorEvent[0]}`;
        addEvent = true;
      }
    }

    if (eventName === "Mayor") {
      addEvent = false;
      // Check if this is an election for a special mayor
      const specialMayorEvent = specialMayorEvents.find(
        (specialMayorEvent) => specialMayorEvent[1] === year
      );

      if (specialMayorEvent?.[3]) {
        eventName = `Mayor ${specialMayorEvent[0]}`;
        addEvent = true;
      }
    }

    if (addEvent) {
      const event = {
        end: convertDate(eventDayEnd, eventMonthEnd, year + shiftYear, true),
        endS: [eventDayEnd, eventMonthEnd, year + shiftYear],
        eventName,
        start: convertDate(eventDayStart, eventMonthStart, year),
        startS: [eventDayStart, eventMonthStart, year],
      };

      events.push(event);
    }
  }

  return events;
};

exports.generateEvent = generateEvent;
exports.convertDate = convertDate;