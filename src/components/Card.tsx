import { forwardRef } from 'react';

import type { CardType } from '../slices/cardsSlice';
import { useAppDispatch } from '../hooks';
import { openModal } from '../slices/modalSlice';
import { setCurrentCompanyId } from '../slices/cardsSlice';
import EyeImage from './EyeImage';
import TrashImage from './TrashImage';
import logo1 from '../assets/images/logo1.png';
import logo2 from '../assets/images/logo2.png';
import logo3 from '../assets/images/logo3.png';
import bm from '../assets/images/bm.png';

type Props = {
  data: CardType;
};

const Card = forwardRef(({ data }: Props, ref) => {
  const dispatch = useAppDispatch();
  const { company, customerMarkParameters, mobileAppDashboard } = data;
  const logoType = mobileAppDashboard.logo
    .replace('http://bonusmoney.info/image/mail/', '')
    .slice(0, -4);

  interface Logo {
    [key: string]: string;
  }

  const logo: Logo = {
    logo1,
    logo2,
    logo3,
    bm,
  };

  const handleClick = (type: 'show' | 'remove' | 'info') => {
    dispatch(setCurrentCompanyId(company.companyId));
    dispatch(openModal(type));
  };

  return (
    <div
      className='card'
      // @ts-ignore
      ref={ref}
      style={{ backgroundColor: mobileAppDashboard.cardBackgroundColor }}>
      <div className='card-header'>
        <p style={{ color: mobileAppDashboard.highlightTextColor }}>
          {mobileAppDashboard.companyName}
        </p>
        <img className='company-logo' src={logo[logoType]} />
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
        <div onClick={() => handleClick('show')}>
          <EyeImage color={mobileAppDashboard.mainColor} />
        </div>
        <div onClick={() => handleClick('remove')}>
          <TrashImage color={mobileAppDashboard.accentColor} />
        </div>
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
});

export default Card;
