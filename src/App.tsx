import { useEffect } from 'react';
import CardList from './components/CardList';
import { useAppDispatch } from './hooks';
import { addCards } from './slices/cardsSlice';

const App = () => {
  const dispatch = useAppDispatch();
  const data = {
    offset: 0,
    limit: 5,
  };
  useEffect(() => {
    fetch('http://devapp.bonusmoney.pro/mobileapp/getAllCompaniesIdeal', {
      method: 'POST',
      headers: {
        TOKEN: '123',
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then(({ companies }) => dispatch(addCards(companies)));
  }, []);
  return (
    <div className='wrap'>
      <div className='header'>Управление картами</div>
      <div className='main'>
        <CardList />
      </div>
    </div>
  );
};

export default App;
