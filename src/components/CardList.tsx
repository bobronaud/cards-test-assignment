import { createRef, useRef, useEffect } from 'react';
import Card from './Card';
import { useAppSelector, useAppDispatch } from '../hooks';
import { fetchData } from '../slices/cardsSlice';

const CardList = () => {
  const dispatch = useAppDispatch();
  const { cards, loading } = useAppSelector((state) => state.cards);
  const isEmpty = cards.length === 0;

  const lastItem = createRef();
  const observerLoader = useRef();

  const actionInSight = () => {
    // проверил, что сервер выдает максимум 80 карт
    const totalCards = 80;
    if (cards.length <= totalCards) {
      dispatch(fetchData());
    }
  };

  useEffect(() => {
    if (observerLoader.current) {
      observerLoader.current.disconnect();
    }
    observerLoader.current = new IntersectionObserver(actionInSight);
    if (lastItem.current) {
      observerLoader.current.observe(lastItem.current);
    }
  }, [lastItem]);

  return isEmpty && !loading ? (
    <p>Нет компаний</p>
  ) : (
    <>
      {cards.map((card, i, arr) => {
        if (i === arr.length - 1) {
          return <Card key={i} data={card} ref={lastItem} />;
        }
        return <Card key={i} data={card} />;
      })}
    </>
  );
};

export default CardList;
