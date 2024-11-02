import React, { Component } from 'react'
import { FaXmark } from "react-icons/fa6";

export class Order extends Component {
  render() {
    return (
      <div className='item'>
            <div className='back' onClick={() => this.props.onShowItem(this.props.item)}></div>
            <img alt='Товар' src={'./img/' + this.props.item.img} onClick={() => this.props.onShowItem(this.props.item)} />
            <h3 onClick={() => this.props.onShowItem(this.props.item)}>{this.props.item.title} </h3>
            <b onClick={() => this.props.onShowItem(this.props.item)}>{this.props.item.price}₽</b>
            <p>Количество: {this.props.item.quantity}</p> {/* Отображение количества */}
            <FaXmark  className='delete-icon' onClick={() => this.props.onDelete(this.props.item.id)} />
      </div>
    )
  }
}

export default Order