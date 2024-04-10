import Card from './Card';
import { useAppSelector } from '../hooks';

const CardList = () => {
  const cards = useAppSelector((state) => state.cards.cards);
  const isEmpty = cards.length === 0;
  return isEmpty ? (
    <p>Нет компаний</p>
  ) : (
    <>
      {cards.map((card, i) => {
        return <Card key={i} data={card} />;
      })}
    </>
  );
};

export default CardList;
