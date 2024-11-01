import React, { useEffect, useRef } from 'react';
import { FaXmark } from "react-icons/fa6";

export default function ContactModal({ onClose }) {
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
      <div className='head'>
            <h2>Контакты</h2>
            <FaXmark className='close-btn'onClick={onClose}/>
        </div>
        <p>Вы можете связаться с нами по телефону: +7 (123) 456-78-90 или по электронной почте: info@gamecollection.ru. Мы всегда рады ответить на ваши вопросы и помочь вам выбрать лучший товар!</p>
      </div>
    </div>
  );
}
