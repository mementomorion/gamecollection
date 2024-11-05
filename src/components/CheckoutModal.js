import React, { useEffect, useRef, useState } from 'react';
import { FaXmark } from "react-icons/fa6";

export default function CheckoutModal({ orders, onClose, onOrderComplete }) {
  const modalRef = useRef(null);
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('Credit Card');
  const [errorMessage, setErrorMessage] = useState('');
  const [shake, setShake] = useState(false);

  
  const [inputErrors, setInputErrors] = useState({ phone: false, email: false, address: false });

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

  const handleSubmit = () => {
    const errors = {
      phone: !phone,
      email: !email,
      address: !address,
    };
    
    if (errors.phone || errors.email || errors.address) {
      setErrorMessage('Пожалуйста, заполните все обязательные поля.');
      setShake(true);
      setTimeout(() => setShake(false), 500);
      return;
    }

    const orderDetails = {
      orders: orders,
      phone,
      email,
      address,
      paymentMethod,
    };

    const totalAmount = orderDetails.orders.reduce((acc, item) => acc + item.price * item.quantity, 0);

    const orderItems = orderDetails.orders.map(item => `${item.title} (x${item.quantity}) - ${item.price * item.quantity} руб.`).join('\n');

    // Отправка данных в Telegram
    const sendOrderToTelegram = async () => {
      const botToken = '7858954418:AAGizRPIYD_CrfUoS6SWhN_F8Rx-Y3R0bL0';
      const chatId = '567856098';
      const message = `
        Заказ!

        Телефон: ${orderDetails.phone}
        Email: ${orderDetails.email}
        Адрес: ${orderDetails.address}
        Метод оплаты: ${orderDetails.paymentMethod}
        
        Товары:
        ${orderItems}
        
        Итоговая сумма: ${totalAmount} руб.
      `;

      const url = `https://api.telegram.org/bot${botToken}/sendMessage`;
      await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          chat_id: chatId,
          text: message,
        }),
      });
    };

    sendOrderToTelegram()
      .then(() => console.log('Заказ успешно отправлен в Telegram'))
      .catch(error => console.error('Ошибка при отправке заказа в Telegram:', error));

    onOrderComplete();
  };
  


  let sum = 0;
  orders.forEach(el => sum += el.price * el.quantity); // Учет количества товаров при подсчете суммы
  
  return (
    <div className='modal-background'>
      <div ref={modalRef} className='modal-content'>
        <div className='head'>
          <h2>Оформление заказа</h2>
          <FaXmark className='close-btn' onClick={onClose} />
        </div>
        {errorMessage && (
          <p className={`error-message ${shake ? 'shake' : ''}`}>
            {errorMessage}
          </p>
        )}
        <div className='order-summary'>
          <h3>Ваши товары:</h3>
          {orders.map(order => (
            <div key={order.id} className='order-item'>
              <span>{order.title} - {order.quantity}шт = </span>
              <span>{order.price * order.quantity} руб</span>
            </div>
          ))}
        </div>
        <p className='sum'>Сумма: {new Intl.NumberFormat().format(sum)} руб</p>
        <div className='checkout-details'>
          <h3>Контактные данные</h3>
          <label>Телефон* :
            <input
              type='text'
              value={phone}
              onChange={(e) => {
                setPhone(e.target.value);
                setInputErrors({ ...inputErrors, phone: false });
              }}
              placeholder='Введите номер телефона'
              className={`styled-input ${inputErrors.phone ? 'input-error' : ''}`}
              required
            />
          </label>
          <label>Электронная почта* :
            <input
              type='email'
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setInputErrors({ ...inputErrors, email: false });
              }}
              placeholder='Введите электронную почту'
              className={`styled-input ${inputErrors.email ? 'input-error' : ''}`}
              required
            />
          </label>
          <label>Адрес доставки* :
            <textarea
              value={address}
              onChange={(e) => {
                setAddress(e.target.value);
                setInputErrors({ ...inputErrors, address: false });
              }}
              placeholder='Введите адрес доставки'
              className={`styled-input ${inputErrors.address ? 'input-error' : ''}`}
              required
            />
          </label>
          <label>Способ оплаты* :
            <select
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
              className='styled-input'
            >
              <option value='Card'>Картой курьеру</option>
              <option value='Cash'>Наличными курьеру</option>
            </select>
          </label>
        </div>
        <button className='checkout-btn' onClick={handleSubmit}>Оформить</button>
      </div>
    </div>
  );
}
