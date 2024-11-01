import React, {useState, useEffect, useRef } from 'react'
import { FaXmark, FaCartShopping } from "react-icons/fa6";
import Order from './Order'
import AboutModal from './AboutModal';
import ContactModal from './ContactModal';


const showOrders = (props, handleShowItem) => {
  let sum = 0;
  props.orders.forEach(el => sum += el.price * el.quantity); // Изменение для подсчета суммы с учетом количества
  return (
    <div>
      {props.orders.map(el => (
        <Order onShowItem={handleShowItem} onDelete={props.onDelete} key={el.id} item={el} />
      ))}
      <p className='sum'>Сумма: {new Intl.NumberFormat().format(sum)} руб</p>
    </div>
  );
};

const showNothing = () => {
  return (<div className='empty'>
    <h2> Корзина пуста. </h2>
  </div>)
}

export default function Header(props) {
  let [cartOpen, setCartOpen] = useState(false)
  const [showFixedCartIcon, setShowFixedCartIcon] = useState(false);
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);
  

  const cartRef = useRef(null); // Создаем реф для корзины

  useEffect(() => {
    const handleScroll = () => {
      // Показать кнопку, если прокрутили вниз хотя бы на 100px
      setShowFixedCartIcon(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll);

    // Очистка события при размонтировании компонента
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (cartRef.current && !cartRef.current.contains(event.target)) {
        // Закрываем корзину, если клик вне элемента корзины
        setCartOpen(false);
      }
    };

    if (cartOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    // Очистка события при размонтировании компонента
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [cartOpen]);

  const handleShowItem = (item) => {
    props.onShowItem(item); // Вызываем из пропсов
    setCartOpen(false); // Закрываем корзину
  };

  return (
    <header>
      <div>
        <span className='logo'>
          <div className='logo_img'></div>
          GameCollection - магазин игровых сувениров
        </span>
        <ul className='nav'>
          <li onClick={() => setIsAboutOpen(true)}>О нас ❔</li>
          <li onClick={() => setIsContactOpen(true)}>Контакты 📞</li>
          <li className={`cart_btn ${cartOpen && 'active'}`} onClick={() => setCartOpen(!cartOpen)}>
            Корзина ({props.orders.length}) 🛒
          </li>
        </ul>
        {cartOpen && (
          <div ref={cartRef} className='shop-cart'>
            <FaXmark className='cls-btn' onClick={() => setCartOpen(!cartOpen)} />
            {props.orders.length > 0 ? showOrders(props, handleShowItem) : showNothing()}
          </div>
        )}
      </div>
      <div className='presentation'></div>
      {showFixedCartIcon && !cartOpen && (
        <div className='fixed-cart' onClick={() => setCartOpen(true)}>
          <FaCartShopping className="fixed-cart-icon" />
          <div className='counter'>{props.orders.length}</div>
        </div>
      )}
      {isAboutOpen && <AboutModal onClose={() => setIsAboutOpen(false)} />}
      {isContactOpen && <ContactModal onClose={() => setIsContactOpen(false)} />}
    </header>
  );
}
