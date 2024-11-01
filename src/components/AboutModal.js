import React, { useEffect, useRef } from 'react';
import { FaXmark } from "react-icons/fa6";

export default function AboutModal({ onClose }) {
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
            <h2>О нас</h2>
            <FaXmark className='close-btn'onClick={onClose}/>
        </div>
        <p>Мы – GameCollection, магазин игровых сувениров. У нас вы найдете модели героев Dota, оружия из CS и предметов из Genshin Impact. Наша цель – предоставить вам уникальные и качественные игровые предметы, которые дополнят вашу коллекцию и принесут удовольствие.</p>
      </div>
    </div>
  );
}
