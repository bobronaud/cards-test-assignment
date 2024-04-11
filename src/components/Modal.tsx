import { useAppSelector, useAppDispatch } from '../hooks';
import { closeModal } from '../slices/modalSlice';
import img from '../assets/images/exclamation_white.png';

const Modal = () => {
  const dispatch = useAppDispatch();
  const { currentCompanyId } = useAppSelector((state) => state.cards);
  const { error } = useAppSelector((state) => state.cards);
  const { type, isOpen } = useAppSelector((state) => state.modal);
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
                <img src={img} />
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
