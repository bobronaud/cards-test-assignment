import { forwardRef } from 'react';

import type { CardType } from '../slices/cardsSlice';
import eye from '../assets/images/eye_white.png';
import trash from '../assets/images/trash_white.png';

import { useAppDispatch } from '../hooks';
import { openModal } from '../slices/modalSlice';
import { setCurrentCompanyId } from '../slices/cardsSlice';

type Props = {
  data: CardType;
};

const Card = forwardRef(({ data }: Props, ref) => {
  const dispatch = useAppDispatch();
  const { company, customerMarkParameters, mobileAppDashboard } = data;

  const handleClick = (type: 'show' | 'remove' | 'info') => {
    dispatch(setCurrentCompanyId(company.companyId));
    dispatch(openModal(type));
  };

  return (
    <div
      className="card"
      ref={ref}
      style={{ backgroundColor: mobileAppDashboard.cardBackgroundColor }}
    >
      <div className="card-header">
        <p style={{ color: mobileAppDashboard.highlightTextColor }}>
          {mobileAppDashboard.companyName}
        </p>
        <img className="company-logo" src={mobileAppDashboard.logo} />
      </div>
      <hr />
      <div className="card-body">
        <div className="card-body-points" style={{ color: mobileAppDashboard.textColor }}>
          <span
            className="points-value"
            style={{ color: mobileAppDashboard.highlightTextColor }}
          >
            {customerMarkParameters.loyaltyLevel.requiredSum}
          </span>
          баллов
        </div>
        <div className="flex-row">
          <div
            className="card-body-cashback"
            style={{ color: mobileAppDashboard.textColor }}
          >
            Кешбэк
            <span
              className="cashback-value"
              style={{ color: mobileAppDashboard.highlightTextColor }}
            >
              {`${customerMarkParameters.loyaltyLevel.markToCash} %`}
            </span>
          </div>
          <div
            className="card-body-level"
            style={{ color: mobileAppDashboard.textColor }}
          >
            Уровень
            <span
              className="level-value"
              style={{ color: mobileAppDashboard.highlightTextColor }}
            >
              {customerMarkParameters.loyaltyLevel.name}
            </span>
          </div>
        </div>
      </div>
      <hr />
      <div className="card-footer">
        <img src={eye} onClick={() => handleClick('show')} />
        <img src={trash} onClick={() => handleClick('remove')} />
        <button
          className="button"
          onClick={() => handleClick('info')}
          style={{
            color: mobileAppDashboard.mainColor,
            backgroundColor: mobileAppDashboard.backgroundColor,
          }}
        >
          Подробнее
        </button>
      </div>
    </div>
  );
});

export default Card;
