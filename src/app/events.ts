import Derpy_Sprite from '../assets/Derpy_Sprite.webp';
import Enchanted_Cake from '../assets/Enchanted_Cake.webp';
import Fallen_Star_Helmet from '../assets/Fallen_Star_Helmet.webp';
import Jack_o_Lantern from '../assets/Jack_o_Lantern.webp';
import Nether_Brick from '../assets/Nether_Brick.webp';
import Noteblock from '../assets/Noteblock.webp';
import Pretty_Rabbit_Skin from '../assets/Pretty_Rabbit_Skin.webp';
import Scorpius_Sprite from '../assets/Scorpius_Sprite.webp';
import SkyBlock_Anniversary_Event from '../assets/SkyBlock_Anniversary_Event.webp';
import Snowball from '../assets/Snowball.webp';
import Traveling_Zoo from '../assets/Traveling_Zoo.webp';
import Villager_Sprite from '../assets/Villager_Sprite.webp';
import Wheat from '../assets/Wheat.webp';
import White_Gift from '../assets/White_Gift.webp';
import {
  EVENT_ANNIVERSARY,
  EVENT_ANNIVERSARY_DESCRIPTION,
  EVENT_CULT_FALLEN_STAR,
  EVENT_CULT_FALLEN_STAR_DESCRIPTION,
  EVENT_DARK_AUCTION,
  EVENT_DARK_AUCTION_DESCRIPTION,
  EVENT_HOPPY_HUNT,
  EVENT_HOPPY_HUNT_DESCRIPTION,
  EVENT_JACOB,
  EVENT_JACOB_DESCRIPTION,
  EVENT_JERRY_SEASON,
  EVENT_JERRY_SEASON_DESCRIPTION,
  EVENT_MAYOR_DERPY_DURATION_DESCRIPTION,
  EVENT_MAYOR_DERPY_ELECTION_DESCRIPTION,
  EVENT_MAYOR_JERRY_DURATION_DESCRIPTION,
  EVENT_MAYOR_JERRY_ELECTION_DESCRIPTION,
  EVENT_MAYOR_SCORPIUS_DURATION_DESCRIPTION,
  EVENT_MAYOR_SCORPIUS_ELECTION_DESCRIPTION,
  EVENT_NEW_YEAR_CELEBRATION,
  EVENT_SPOOKY_FESTIVAL,
  EVENT_SPOOKY_FESTIVAL_DESCRIPTION,
  EVENT_STANDARD_MAYOR_DURATION,
  EVENT_STANDARD_MAYOR_DURATION_DESCRIPTION,
  EVENT_STANDARD_MAYOR_ELECTION,
  EVENT_STANDARD_MAYOR_ELECTION_DESCRIPTION,
  EVENT_TRAVELING_ZOO,
  EVENT_TRAVELING_ZOO_DESCRIPTION,
  EVENT_WINTER_ISLAND,
  EVENT_WINTER_ISLAND_DESCRIPTION
} from './constants';

export type EventCard = [id: string, name: string, icon: string, description: string, date: string, defaultSelected?: boolean];

export const yearlyEventDefinition: EventCard[] = [
  ['hoppyHunt', EVENT_HOPPY_HUNT, Pretty_Rabbit_Skin, EVENT_HOPPY_HUNT_DESCRIPTION, 'Spring', true],
  ['travelingZoo', EVENT_TRAVELING_ZOO, Traveling_Zoo, EVENT_TRAVELING_ZOO_DESCRIPTION, '1-3 Early Summer and Early Winter'],
  ['spookyFestival', EVENT_SPOOKY_FESTIVAL, Jack_o_Lantern, EVENT_SPOOKY_FESTIVAL_DESCRIPTION, '29-31 Autumn'],
  ['winterIsland', EVENT_WINTER_ISLAND, White_Gift, EVENT_WINTER_ISLAND_DESCRIPTION, 'Late Winter'],
  ['jerrySeason', EVENT_JERRY_SEASON, Snowball, EVENT_JERRY_SEASON_DESCRIPTION, '24-26 Late Winter', true],
  ['newYearCelebration', EVENT_NEW_YEAR_CELEBRATION, Enchanted_Cake, EVENT_NEW_YEAR_CELEBRATION, '29-31 Late Winter', true]
];

export const mayorEventsDefinition: EventCard[] = [
  ['standardMayorElection', EVENT_STANDARD_MAYOR_ELECTION, Noteblock, EVENT_STANDARD_MAYOR_ELECTION_DESCRIPTION, '27 Late Summer to 27 Late Spring'],
  ['standardMayorDuration', EVENT_STANDARD_MAYOR_DURATION, Noteblock, EVENT_STANDARD_MAYOR_DURATION_DESCRIPTION, '27 Late Spring'],
  ['mayorDerpyElection', 'Mayor Derpy Election', Derpy_Sprite, EVENT_MAYOR_DERPY_ELECTION_DESCRIPTION, '27 Late Summer to 27 Late Spring'],
  ['mayorDerpyDuration', 'Mayor Derpy', Derpy_Sprite, EVENT_MAYOR_DERPY_DURATION_DESCRIPTION, '27 Late Spring', true],
  ['mayorJerryElection', 'Mayor Jerry Election', Villager_Sprite, EVENT_MAYOR_JERRY_ELECTION_DESCRIPTION, '27 Late Summer to 27 Late Spring'],
  ['mayorJerryDuration', 'Mayor Jerry', Villager_Sprite, EVENT_MAYOR_JERRY_DURATION_DESCRIPTION, '27 Late Spring', true],
  ['mayorScorpiusElection', 'Mayor Scorpius Election', Scorpius_Sprite, EVENT_MAYOR_SCORPIUS_ELECTION_DESCRIPTION, '27 Late Summer to 27 Late Spring', true],
  ['mayorScorpiusDuration', 'Mayor Scorpius', Scorpius_Sprite, EVENT_MAYOR_SCORPIUS_DURATION_DESCRIPTION, '27 Late Spring']
];

export const otherEventDefinition: EventCard[] = [
  ['cultFallenStar', EVENT_CULT_FALLEN_STAR, Fallen_Star_Helmet, EVENT_CULT_FALLEN_STAR_DESCRIPTION, 'Every 7, 14, 21 and 28'],
  ['darkAuction', EVENT_DARK_AUCTION, Nether_Brick, EVENT_DARK_AUCTION_DESCRIPTION, 'Every 3 days'],
  ['jacob', EVENT_JACOB, Wheat, EVENT_JACOB_DESCRIPTION, 'Every 3 days'],
  ['anniversary', EVENT_ANNIVERSARY, SkyBlock_Anniversary_Event, EVENT_ANNIVERSARY_DESCRIPTION, 'Every 6 June (IRL)', true]
];
