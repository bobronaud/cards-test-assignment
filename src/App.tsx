import { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from './hooks';
import { fetchData } from './slices/cardsSlice';
import CardList from './components/CardList';
import Modal from './components/Modal';
import Splash from './components/Splash';
import Preloader from './components/Preloader';
import Reloader from './components/Reloader';

const App = () => {
  const dispatch = useAppDispatch();
  const [splash, setSplash] = useState(false);
  const { loading, cards } = useAppSelector((state) => state.cards);

  const isLoaded = sessionStorage.getItem('loaded');
  const reloading = loading && cards.length === 0 && isLoaded;

  useEffect(() => {
    if (!isLoaded) {
      setSplash(true);
      setTimeout(() => {
        setSplash(false);
        dispatch(fetchData());
      }, 3000);
    } else {
      dispatch(fetchData());
    }

    const handleBeforeUnload = () => {
      sessionStorage.setItem('loaded', 'true');
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  return splash ? (
    <Splash />
  ) : (
    <div className="wrap">
      <div className="header">
        <p>Управление картами</p>
      </div>
      <div className="main">
        <CardList />
        {reloading && <Reloader />}
        {loading && !reloading ? <Preloader /> : null}
      </div>
      <Modal />
    </div>
  );
};

export default App;
