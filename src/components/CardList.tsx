import Card from './Card';
import { useAppSelector } from '../hooks';

const CardList = () => {
  const cards = useAppSelector((state) => state.cards.cards);
  return (
    <>
      {cards.map((card, i) => {
        return <Card key={i} data={card} />;
      })}
    </>
  );
};

export default CardList;
