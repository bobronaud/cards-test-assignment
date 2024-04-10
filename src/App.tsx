import { useState, useEffect } from 'react';
import { useAppDispatch } from './hooks';
import { addCards } from './slices/cardsSlice';
import CardList from './components/CardList';
import Modal from './components/Modal';
import Splash from './components/Splash';
import Preloader from './components/Preloader';

const App = () => {
  const dispatch = useAppDispatch();
  const [splash, setSplash] = useState(false);
  const [preloader, setPreloader] = useState(false);

  const isFirstOpen = sessionStorage.getItem('splash');
  if (!isFirstOpen) {
    sessionStorage.setItem('splash', 'was');
    setSplash(true);
    setTimeout(() => setSplash(false), 3000);
  }

  useEffect(() => {
    if (!splash) {
      setPreloader(true);

      fetch('http://devapp.bonusmoney.pro/mobileapp/getAllCompaniesIdeal', {
        method: 'POST',
        headers: {
          TOKEN: '123',
        },
        body: JSON.stringify({
          offset: 0,
          limit: 10,
        }),
      })
        .then((res) => res.json())
        .then(({ companies }) => dispatch(addCards(companies)))
        .then(() => {
          // setTimeout написал для отображения работы прелоадера, иначе компании быстро загружаются и прелоадера почти не заметно
          setTimeout(() => setPreloader(false), 500);
        });
    }
  }, [splash]);

  return splash ? (
    <Splash />
  ) : (
    <div className="wrap">
      <div className="header">
        <p>Управление картами</p>
      </div>
      <div className="main">{preloader ? <Preloader /> : <CardList />}</div>
      <Modal />
    </div>
  );
};

export default App;
