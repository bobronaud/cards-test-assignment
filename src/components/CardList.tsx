import { createRef, useRef, useEffect } from 'react';
import Card from './Card';
import { useAppSelector, useAppDispatch } from '../hooks';
import { fetchData } from '../slices/cardsSlice';

const CardList = () => {
  const dispatch = useAppDispatch();
  const { cards, loading } = useAppSelector((state) => state.cards);
  const isEmpty = cards.length === 0;

  const lastItem = createRef();
  const observerLoader = useRef<IntersectionObserver | null>(null);

  // @ts-ignore
  const actionInSight = (entries) => {
    // Не знаю как определить максимальное количетсво карт, которое может прийти с сервера
    // в одно время приходило максимум по 80, потом максимум по 60, потом приходило максимум 50
    // в качестве примера я остановился на максимальном количестве карт - 50
    const totalCards = 50;
    if (entries[0].isIntersecting && cards.length < totalCards) {
      dispatch(fetchData());
    }
  };

  useEffect(() => {
    if (observerLoader.current) {
      observerLoader.current.disconnect();
    }
    observerLoader.current = new IntersectionObserver(actionInSight);
    if (lastItem.current) {
      observerLoader.current.observe(lastItem.current as HTMLDivElement);
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
