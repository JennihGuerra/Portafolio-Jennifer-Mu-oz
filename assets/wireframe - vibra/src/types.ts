export type Screen =
  | 'home' | 'search' | 'event' | 'dates'
  | 'sel-general' | 'sel-sector' | 'sel-numbered' | 'seat-map'
  | 'sel-nominative' | 'attendees'
  | 'legal' | 'sell'
  | 'identification'
  | 'summary' | 'payment' | 'confirmation'
  | 'my-ticket' | 'account' | 'my-tickets' | 'help'
  | 'cart';

export type TicketMode = 'general' | 'sector' | 'numbered' | 'nominative';

export interface EventDate {
  id: string;
  date: string;
  time: string;
  city: string;
  venue: string;
}

export interface SectorInfo {
  id: string;
  name: string;
  price: number;
  avail: 'available' | 'few' | 'sold-out';
  subzones?: string[];
}

export interface TicketPrice {
  name: string;
  price: number;
}

export interface Event {
  id: string;
  name: string;
  category: string;
  dates: EventDate[];
  priceFrom: number;
  description: string;
  mode: TicketMode;
  sectors?: SectorInfo[];
  generalPrices?: TicketPrice[];
}

export interface Seat {
  id: string;
  row: string;
  num: number;
  status: 'available' | 'occupied' | 'selected';
  price: number;
}

export interface Attendee {
  idx: number;
  name: string;
  rut: string;
  email: string;
  complete: boolean;
}

export interface CartItem {
  id: string;
  eventName: string;
  date: string;
  venue: string;
  ticketTypeName: string;
  qty: number;
  unitPrice: number;
  total: number;
}

export interface AppState {
  screen: Screen;
  history: Screen[];
  event: Event | null;
  date: EventDate | null;
  sector: SectorInfo | null;
  subzone: string | null;
  seats: Seat[];
  qty: number;
  ticketTypeName: string;
  ticketTypePrice: number;
  attendees: Attendee[];
  email: string;
  activeAttendee: number | null;
  isLoggedIn: boolean;
  cart: CartItem[];
}

export interface NavProps {
  state: AppState;
  navigate: (screen: Screen, updates?: Partial<AppState>) => void;
  goBack: () => void;
  navToTab: (screen: Screen) => void;
  updateState: (updates: Partial<AppState>) => void;
}
