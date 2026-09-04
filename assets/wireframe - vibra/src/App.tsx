import { useState, useRef, useEffect } from 'react';
import { AppState, Screen, NavProps } from './types';
import { BottomNav, Footer } from './components/ui';
import HomeScreen from './screens/HomeScreen';
import SearchScreen from './screens/SearchScreen';
import EventScreen from './screens/EventScreen';
import SelectionScreen from './screens/SelectionScreen';
import SeatMapScreen from './screens/SeatMapScreen';
import IdentificationScreen from './screens/IdentificationScreen';
import CheckoutScreens from './screens/CheckoutScreens';
import MyTicketScreen from './screens/MyTicketScreen';
import AccountScreen from './screens/AccountScreen';
import HelpScreen from './screens/HelpScreen';
import LegalScreen from './screens/LegalScreen';
import SellScreen from './screens/SellScreen';
import CartScreen from './screens/CartScreen';

const INITIAL: AppState = {
  screen: 'home',
  history: [],
  event: null,
  date: null,
  sector: null,
  subzone: null,
  seats: [],
  qty: 1,
  ticketTypeName: 'General',
  ticketTypePrice: 0,
  attendees: [],
  email: '',
  activeAttendee: null,
  isLoggedIn: false,
  cart: [],
};

const NO_BOTTOM_NAV: Screen[] = ['identification', 'payment', 'confirmation', 'cart'];

export default function App() {
  const [state, setState] = useState<AppState>(INITIAL);

  const navigate = (screen: Screen, updates: Partial<AppState> = {}) => {
    setState(prev => ({
      ...prev,
      ...updates,
      screen,
      history: [...prev.history, prev.screen],
    }));
  };

  const goBack = () => {
    setState(prev => {
      const history = [...prev.history];
      const screen = history.pop() ?? 'home';
      return { ...prev, screen, history };
    });
  };

  const navToTab = (screen: Screen) => {
    setState(prev => ({ ...INITIAL, screen, cart: prev.cart, isLoggedIn: prev.isLoggedIn }));
  };

  const updateState = (updates: Partial<AppState>) => {
    setState(prev => ({ ...prev, ...updates }));
  };

  const nav: NavProps = { state, navigate, goBack, navToTab, updateState };
  const showBottomNav = !NO_BOTTOM_NAV.includes(state.screen);

  // Reset scroll position to the top whenever the active screen changes.
  // Without this, the window (desktop) or the `main` scroll container (mobile)
  // keeps whatever scroll offset it had on the previous screen, which can push
  // floating elements (back button, logo) off-screen on the new screen.
  const mainRef = useRef<HTMLElement>(null);
  useEffect(() => {
    window.scrollTo(0, 0);
    if (mainRef.current) mainRef.current.scrollTop = 0;
  }, [state.screen]);

  const renderScreen = () => {
    const { screen } = state;
    if (screen === 'home') return <HomeScreen {...nav} />;
    if (screen === 'search') return <SearchScreen {...nav} />;
    if (screen === 'event' || screen === 'dates') return <EventScreen {...nav} />;
    if (['sel-general', 'sel-sector', 'sel-nominative', 'attendees'].includes(screen))
      return <SelectionScreen {...nav} />;
    if (screen === 'sel-numbered') return <SelectionScreen {...nav} />;
    if (screen === 'seat-map') return <SeatMapScreen {...nav} />;
    if (screen === 'identification') return <IdentificationScreen {...nav} />;
    if (['summary', 'payment', 'confirmation'].includes(screen)) return <CheckoutScreens {...nav} />;
    if (screen === 'my-ticket') return <MyTicketScreen {...nav} />;
    if (screen === 'account' || screen === 'my-tickets') return <AccountScreen {...nav} />;
    if (screen === 'help') return <HelpScreen {...nav} />;
    if (screen === 'legal') return <LegalScreen {...nav} />;
    if (screen === 'sell') return <SellScreen {...nav} />;
    if (screen === 'cart') return <CartScreen {...nav} />;
    return null;
  };

  return (
    <div className="min-h-screen bg-gray-100 md:bg-gray-50 flex justify-center md:block">
      {/* Mobile: phone shell centered. Desktop: full-width layout */}
      <div className="relative w-full max-w-[430px] md:max-w-none min-h-screen bg-white flex flex-col shadow-[0_0_40px_rgba(0,0,0,0.08)] md:shadow-none">
        <main ref={mainRef} className={`flex-1 overflow-y-auto md:overflow-visible ${showBottomNav ? 'pb-16 md:pb-0' : ''}`}>
          {renderScreen()}
        </main>
        {showBottomNav && <Footer navToTab={navToTab} />}
        {showBottomNav && <BottomNav {...nav} />}
      </div>
    </div>
  );
}
