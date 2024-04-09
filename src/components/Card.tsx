import type { CardType } from '../slices/cardsSlice';
import eye from '../assets/images/eye_white.png';
import trash from '../assets/images/trash_white.png';

type Props = {
  data: CardType;
};

const Card = ({ data }: Props) => {
  const handleClick = (type: 'show' | 'remove' | 'info') => {
    alert(type);
  };
  console.log(data);
  const { company, customerMarkParameters, mobileAppDashboard } = data;

  return (
    <div
      className='card'
      style={{ backgroundColor: mobileAppDashboard.cardBackgroundColor }}>
      <div className='card-header'>
        <p style={{ color: mobileAppDashboard.highlightTextColor }}>
          {mobileAppDashboard.companyName}
        </p>
        <img className='company-logo' src={mobileAppDashboard.logo} />
      </div>
      <hr />
      <div className='card-body'>
        <div className='card-body-points' style={{ color: mobileAppDashboard.textColor }}>
          <span
            className='points-value'
            style={{ color: mobileAppDashboard.highlightTextColor }}>
            {customerMarkParameters.loyaltyLevel.requiredSum}
          </span>
          баллов
        </div>
        <div className='flex-row'>
          <div
            className='card-body-cashback'
            style={{ color: mobileAppDashboard.textColor }}>
            Кешбэк
            <span
              className='cashback-value'
              style={{ color: mobileAppDashboard.highlightTextColor }}>
              {`${customerMarkParameters.loyaltyLevel.markToCash} %`}
            </span>
          </div>
          <div
            className='card-body-level'
            style={{ color: mobileAppDashboard.textColor }}>
            Уровень
            <span
              className='level-value'
              style={{ color: mobileAppDashboard.highlightTextColor }}>
              {customerMarkParameters.loyaltyLevel.name}
            </span>
          </div>
        </div>
      </div>
      <hr />
      <div className='card-footer'>
        <img src={eye} onClick={() => handleClick('show')} />
        <img src={trash} onClick={() => handleClick('remove')} />
        <button
          className='button'
          onClick={() => handleClick('info')}
          style={{
            color: mobileAppDashboard.mainColor,
            backgroundColor: mobileAppDashboard.backgroundColor,
          }}>
          Подробнее
        </button>
      </div>
    </div>
  );
};

export default Card;
