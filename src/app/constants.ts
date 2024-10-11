import { IrlEvents, MayorEventDefinition, MontlyEvents, RecuringEvents, YearlyEvents, Years } from "./types";

// We need to keep the function here to prevent circular dependencies
export const getFirstSYearFromYear = (year: number): number => {
  return (year - 2019) * 70 - 96;
};

export const CURRENT_YEAR = new Date().getFullYear();
export const START_DATE_Y1 = new Date(2019, 5, 11, 19, 55, 0, 0);
export const SYEAR_DURATION = 372;
export const YEAR_DURATION = 20 * SYEAR_DURATION * 60000;
export const START_SYEAR = getFirstSYearFromYear(CURRENT_YEAR); // Get the first sYear of the current year

export const YEARS_CACHE: Years[] = [];

export const MONTHS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

export const EVENT_ANNIVERSARY = "Skyblock Anniversary";
export const EVENT_ANNIVERSARY_DESCRIPTION = "Talk with Simon to receive a Crab Hat.";
export const EVENT_CULT_FALLEN_STAR = "Cult of the Fallen Star";
export const EVENT_CULT_FALLEN_STAR_DESCRIPTION = "The Cult of the Fallen Star is a secret cult found in the ⏣ Cliffside Veins in the ⏣ Dwarven Mines";
export const EVENT_DARK_AUCTION = "Dark Auction";
export const EVENT_DARK_AUCTION_DESCRIPTION = "Allows players to bid against each other for unique items.";
export const EVENT_HOPPY_HUNT = "Hoppy's Hunt";
export const EVENT_HOPPY_HUNT_DESCRIPTION = "Help Hoppity Sprite Hoppity find his Chocolate Rabbits across SkyBlock";
export const EVENT_JACOB = "Jacob's Farming Contest";
export const EVENT_JACOB_DESCRIPTION = "Allows players to compete in 3 randomly chosen crops. Participants are awarded Jacob's Ticket Jacob's Tickets and Medals";
export const EVENT_JERRY_SEASON = "Season of Jerry";
export const EVENT_JERRY_SEASON_DESCRIPTION = "The Jerrys are hard at work trying to craft enough Gifts for all of SkyBlock, but an army of enemies are on the attack! Help protect ⏣ Jerry's Workshop so that everyone can go home with Gifts!";
export const EVENT_MAYOR_DERPY_DURATION_DESCRIPTION = "Vote for Derpy";
export const EVENT_MAYOR_DERPY_ELECTION_DESCRIPTION = "More Minions and More XP";
export const EVENT_MAYOR_JERRY_DURATION_DESCRIPTION = "Vote for Jerry";
export const EVENT_MAYOR_JERRY_ELECTION_DESCRIPTION = "Perkpocalypse!";
export const EVENT_MAYOR_SCORPIUS_DURATION_DESCRIPTION = "Vote for Scorpius and receive coins";
export const EVENT_MAYOR_SCORPIUS_ELECTION_DESCRIPTION = "Activate Darker Auctions";
export const EVENT_NEW_YEAR_CELEBRATION = "New Year Celebration";
export const EVENT_NEW_YEAR_CELEBRATION_DESCRIPTION = "To celebrate the SkyBlock New Year, the Baker Sprite Baker is giving out free New Year Cake Cake.";
export const EVENT_SPOOKY_FESTIVAL = "Spooky Festival";
export const EVENT_SPOOKY_FESTIVAL_DESCRIPTION = "Autumn is in full swing and the air is full of fright. Mob drops have a chance to contain Candy, which can be traded with the Fear Mongerer Sprite Fear Mongerer for rare items!";
export const EVENT_STANDARD_MAYOR_DURATION = "Mayor Duration";
export const EVENT_STANDARD_MAYOR_DURATION_DESCRIPTION = "The Mayor is selected until the next election ends!";
export const EVENT_STANDARD_MAYOR_ELECTION = "Mayor Election";
export const EVENT_STANDARD_MAYOR_ELECTION_DESCRIPTION = "The Mayor for a whole year";
export const EVENT_TRAVELING_ZOO = "Traveling Zoo";
export const EVENT_TRAVELING_ZOO_DESCRIPTION = "Oringo the Traveling Zookeper is visiting SkyBlock with pets to trade!";
export const EVENT_WINTER_ISLAND = "Winter Island";
export const EVENT_WINTER_ISLAND_DESCRIPTION = "The Winter Island also known as Jerry Island, is an island that is open during the whole Late Winter";

export const specialMayorEventsStarts: MayorEventDefinition[] = [
  ["Derpy", 9],
  ["Jerry", 17],
  ["Scorpius", 25],
];

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

export const yearlyEvents: YearlyEvents[] = [
  {
    description: EVENT_NEW_YEAR_CELEBRATION_DESCRIPTION,
    endDay: 31,
    endMonth: 12,
    name: EVENT_NEW_YEAR_CELEBRATION,
    startDay: 29,
    startMonth: 12,
  },
  {
    description: EVENT_TRAVELING_ZOO_DESCRIPTION,
    endDay: 3,
    endMonth: 4,
    name: EVENT_TRAVELING_ZOO,
    startDay: 1,
    startMonth: 4,
  },
  {
    description: EVENT_TRAVELING_ZOO_DESCRIPTION,
    endDay: 3,
    endMonth: 10,
    name: EVENT_TRAVELING_ZOO,
    startDay: 1,
    startMonth: 10,
  },
  {
    description: EVENT_SPOOKY_FESTIVAL_DESCRIPTION,
    endDay: 31,
    endMonth: 8,
    name: EVENT_SPOOKY_FESTIVAL,
    startDay: 29,
    startMonth: 8,
  },
  {
    description: EVENT_HOPPY_HUNT_DESCRIPTION,
    endDay: 31,
    endMonth: 3,
    name: EVENT_HOPPY_HUNT,
    startDay: 1,
    startMonth: 1,
  },
  {
    description: EVENT_JERRY_SEASON_DESCRIPTION,
    endDay: 26,
    endMonth: 12,
    name: EVENT_JERRY_SEASON,
    startDay: 24,
    startMonth: 12,
  },
  {
    description: EVENT_WINTER_ISLAND_DESCRIPTION,
    endDay: 1,
    endMonth: 12,
    name: EVENT_WINTER_ISLAND,
    startDay: 31,
    startMonth: 12,
  },
  {
    description: EVENT_STANDARD_MAYOR_ELECTION_DESCRIPTION,
    endDay: 27,
    endMonth: 3,
    name: EVENT_STANDARD_MAYOR_ELECTION,
    shiftYear: 1,
    startDay: 27,
    startMonth: 6,
  },
  {
    description: EVENT_STANDARD_MAYOR_DURATION_DESCRIPTION,
    endDay: 27,
    endMonth: 3,
    name: EVENT_STANDARD_MAYOR_DURATION,
    shiftYear: 1,
    startDay: 27,
    startMonth: 3,
  },
];

export const monthlyEvents: MontlyEvents[] = [
  {
    description: EVENT_CULT_FALLEN_STAR_DESCRIPTION,
    endDay: 7,
    name: EVENT_CULT_FALLEN_STAR,
    startDay: 7,
  },
  {
    description: EVENT_CULT_FALLEN_STAR_DESCRIPTION,
    endDay: 14,
    name: EVENT_CULT_FALLEN_STAR,
    startDay: 14,
  },
  {
    description: EVENT_CULT_FALLEN_STAR_DESCRIPTION,
    endDay: 21,
    name: EVENT_CULT_FALLEN_STAR,
    startDay: 21,
  },
  {
    description: EVENT_CULT_FALLEN_STAR_DESCRIPTION,
    endDay: 28,
    name: EVENT_CULT_FALLEN_STAR,
    startDay: 28,
  },
];

export const irlEvents: IrlEvents[] = [
  {
    description: EVENT_ANNIVERSARY_DESCRIPTION,
    name: EVENT_ANNIVERSARY,
    realDay: 11,
    realMonth: 6,
  }
];

export const recuringEvents: RecuringEvents[] = [
  {
    description: EVENT_DARK_AUCTION_DESCRIPTION,
    duration: 1,
    firstDay: 1,
    firstMonth: 1,
    name: EVENT_DARK_AUCTION,
    recuringDay: 3,
  },
  {
    description: EVENT_JACOB_DESCRIPTION,
    duration: 1, 
    firstDay: 2,
    firstMonth: 1,
    name: EVENT_JACOB,
    recuringDay: 3,
  }
];