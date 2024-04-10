import { useAppSelector } from '../hooks';
import { useAppDispatch } from '../hooks';
import { closeModal } from '../slices/modalSlice';


const Modal = () => {
    const dispatch = useAppDispatch()
  const { currentCompanyId } = useAppSelector((state) => state.cards);
  const { type, isOpen } = useAppSelector((state) => state.modal);
  const text = {
    show: 'показать',
    remove: 'удалить',
    info: 'подробнее'
  }
  return isOpen && <div className="modal">
    <div className="window">
        <p>Нажата кнопка <b>{text[type]}</b></p>
        <p>{`ID компании:`}</p>
        <p>{currentCompanyId}</p>
        <button className="modal-button" onClick={() => dispatch(closeModal())}>Понятно</button>
    </div>
  </div>;
};

export default Modal;
