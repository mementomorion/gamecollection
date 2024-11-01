import React, { useEffect, useRef } from 'react';
import { FaXmark } from "react-icons/fa6";

export default function ConfirmationModal({ onClose }) {
  const modalRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose(); // Закрыть окно, если клик вне области модального окна
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);

  return (
    <div className='modal-background'>
      <div ref={modalRef} className='modal-content'>
        <FaXmark className='close-btn' onClick={onClose} />
        <h2>Поздравляем!</h2>
        <p>Ваш заказ успешно оформлен. В ближайшее время с вами свяжется наш оператор для подтверждения деталей заказа. Спасибо за покупку!</p>
      </div>
    </div>
  );
}
