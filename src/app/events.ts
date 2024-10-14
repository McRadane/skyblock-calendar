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

export type EventCard = { date: string; defaultSelected?: boolean; description: string; icon: string; id: string; name: string };

export const yearlyEventDefinition: EventCard[] = [
  {
    date: 'Spring',
    defaultSelected: true,
    description: EVENT_HOPPY_HUNT_DESCRIPTION,
    icon: Pretty_Rabbit_Skin,
    id: 'hoppyHunt',
    name: EVENT_HOPPY_HUNT
  },
  {
    date: '1-3 Early Summer and Early Winter',
    description: EVENT_TRAVELING_ZOO_DESCRIPTION,
    icon: Traveling_Zoo,
    id: 'travelingZoo',
    name: EVENT_TRAVELING_ZOO
  },
  {
    date: '29-31 Autumn',
    description: EVENT_SPOOKY_FESTIVAL_DESCRIPTION,
    icon: Jack_o_Lantern,
    id: 'spookyFestival',
    name: EVENT_SPOOKY_FESTIVAL
  },
  { date: 'Late Winter', description: EVENT_WINTER_ISLAND_DESCRIPTION, icon: White_Gift, id: 'winterIsland', name: EVENT_WINTER_ISLAND },
  {
    date: '24-26 Late Winter',
    defaultSelected: true,
    description: EVENT_JERRY_SEASON_DESCRIPTION,
    icon: Snowball,
    id: 'jerrySeason',
    name: EVENT_JERRY_SEASON
  },
  {
    date: '29-31 Late Winter',
    defaultSelected: true,
    description: EVENT_NEW_YEAR_CELEBRATION,
    icon: Enchanted_Cake,
    id: 'newYearCelebration',
    name: EVENT_NEW_YEAR_CELEBRATION
  }
];

export const mayorEventsDefinition: EventCard[] = [
  {
    date: '27 Late Summer to 27 Late Spring',
    description: EVENT_STANDARD_MAYOR_ELECTION_DESCRIPTION,
    icon: Noteblock,
    id: 'standardMayorElection',
    name: EVENT_STANDARD_MAYOR_ELECTION
  },
  {
    date: '27 Late Spring',
    description: EVENT_STANDARD_MAYOR_DURATION_DESCRIPTION,
    icon: Noteblock,
    id: 'standardMayorDuration',
    name: EVENT_STANDARD_MAYOR_DURATION
  },
  {
    date: '27 Late Summer to 27 Late Spring',
    description: EVENT_MAYOR_DERPY_ELECTION_DESCRIPTION,
    icon: Derpy_Sprite,
    id: 'mayorDerpyElection',
    name: 'Mayor Derpy Election'
  },
  {
    date: '27 Late Spring',
    defaultSelected: true,
    description: EVENT_MAYOR_DERPY_DURATION_DESCRIPTION,
    icon: Derpy_Sprite,
    id: 'mayorDerpyDuration',
    name: 'Mayor Derpy'
  },
  {
    date: '27 Late Summer to 27 Late Spring',
    description: EVENT_MAYOR_JERRY_ELECTION_DESCRIPTION,
    icon: Villager_Sprite,
    id: 'mayorJerryElection',
    name: 'Mayor Jerry Election'
  },
  {
    date: '27 Late Spring',
    defaultSelected: true,
    description: EVENT_MAYOR_JERRY_DURATION_DESCRIPTION,
    icon: Villager_Sprite,
    id: 'mayorJerryDuration',
    name: 'Mayor Jerry'
  },
  {
    date: '27 Late Summer to 27 Late Spring',
    defaultSelected: true,
    description: EVENT_MAYOR_SCORPIUS_ELECTION_DESCRIPTION,
    icon: Scorpius_Sprite,
    id: 'mayorScorpiusElection',
    name: 'Mayor Scorpius Election'
  },
  {
    date: '27 Late Spring',
    description: EVENT_MAYOR_SCORPIUS_DURATION_DESCRIPTION,
    icon: Scorpius_Sprite,
    id: 'mayorScorpiusDuration',
    name: 'Mayor Scorpius'
  }
];

export const otherEventDefinition: EventCard[] = [
  {
    date: 'Every 7, 14, 21 and 28',
    description: EVENT_CULT_FALLEN_STAR_DESCRIPTION,
    icon: Fallen_Star_Helmet,
    id: 'cultFallenStar',
    name: EVENT_CULT_FALLEN_STAR
  },
  { date: 'Every 3 days', description: EVENT_DARK_AUCTION_DESCRIPTION, icon: Nether_Brick, id: 'darkAuction', name: EVENT_DARK_AUCTION },
  { date: 'Every 3 days', description: EVENT_JACOB_DESCRIPTION, icon: Wheat, id: 'jacob', name: EVENT_JACOB },
  {
    date: 'Every 6 June (IRL)',
    defaultSelected: true,
    description: EVENT_ANNIVERSARY_DESCRIPTION,
    icon: SkyBlock_Anniversary_Event,
    id: 'anniversary',
    name: EVENT_ANNIVERSARY
  }
];
