import React, { Component } from 'react'

export class Item extends Component {
  render() {
    return (
        <div className='item'>
            <img alt='Фото коллекционной фигурки' src={'./img/' + this.props.item.img} onClick={() => this.props.onShowItem(this.props.item)}/>
            <h3>{this.props.item.title}</h3>
            <p>{this.props.item.desc}</p>
            <b>{this.props.item.price} rub</b>
            <div className='add-to-cart' onClick={() => this.props.onAdd(this.props.item)}>В корзину</div>
        </div>
    )
  }
}

export default Item