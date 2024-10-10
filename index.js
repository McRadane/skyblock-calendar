const fs = require("fs");
const path = require("path");
const ics = require("ics");
const {convertDate, generateEvent} = require("./functions");

const outDir = path.join(__dirname, "out");

/*
  1 = Early Spring
  2 = Spring
  3 = Late Spring
  4 = Early Summer
  5 = Summer
  6 = Late Summer
  7 = Early Autumn
  8 = Autumn
  9 = Late Autumn
  10 = Early Winter
  11 = Winter
  12 = Late Winter
*/

const recuringEvents = [
  ["New Year Celebration", 29, 12, 31, 12],
  ["Spooky Festival", 29, 8, 31, 8],
  ["Hoppity's Hunt", 1, 1, 31, 3],
  ["Season of Jerry", 24, 12, 26, 12],
  ["Election", 27, 6, 27, 3, 1],
  ["Mayor", 27, 3, 27, 3, 1],
];

let allEvents = [];

recuringEvents.forEach((recuringEvent) => {
  allEvents = allEvents.concat(generateEvent(...recuringEvent));
});

allEvents = allEvents.sort((a, b) => a.start - b.start);

fs.writeFileSync(
  path.join(outDir, "events.json"),
  JSON.stringify(allEvents, null, 2)
);

const icsEvents = [];

const DURATION_DAY = 24 * 60 * 60 * 1000;
const DURATION_HOUR = 60 * 60 * 1000;
const DURATION_MINUTE = 60 * 1000;

allEvents.forEach((allEvent) => {
  let days;
  let hours;
  let minutes;

  let duration = allEvent.end.getTime() - allEvent.start.getTime();

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

  icsEvents.push({
    title: allEvent.eventName,
    start: [
      allEvent.start.getFullYear(),
      allEvent.start.getMonth() + 1,
      allEvent.start.getDate(),
      allEvent.start.getHours(),
      allEvent.start.getMinutes(),
    ],
    duration: { days, hours, minutes },
  });
});

const { error, value } = ics.createEvents(icsEvents);

if (error) {
  console.log(error);
  return;
}

fs.writeFileSync(path.join(outDir, "events.ics"), value);
