import { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../hooks';
import { closeModal, openModal } from '../slices/modalSlice';
import ExclamationImage from './ExclamationImage';

const Modal = () => {
  const dispatch = useAppDispatch();
  const { currentCompanyId } = useAppSelector((state) => state.cards);
  const { error } = useAppSelector((state) => state.cards);
  const { type, isOpen } = useAppSelector((state) => state.modal);

  useEffect(() => {
    if (error) {
      dispatch(openModal('error'));
    }
  }, [error]);

  const text = {
    show: 'показать',
    remove: 'удалить',
    info: 'подробнее',
    error,
  };
  return (
    isOpen && (
      <div className="modal">
        <div className="window">
          {type === 'error' ? (
            <>
              <p>
                <ExclamationImage />
                Ошибка:<b>{text[type]}</b>
              </p>
            </>
          ) : (
            <>
              <p>
                Нажата кнопка <b>{text[type]}</b>
              </p>
              <p>{`ID компании:`}</p>
              <p>{currentCompanyId}</p>
            </>
          )}

          <button className="modal-button" onClick={() => dispatch(closeModal())}>
            Понятно
          </button>
        </div>
      </div>
    )
  );
};

export default Modal;
