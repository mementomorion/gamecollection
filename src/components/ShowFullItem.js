import React, { Component } from 'react'

export class ShowFullItem extends Component {
  render() {
    return (
        <div className='wrapper-full'>
            <div className='back-grd' onClick={() => this.props.onShowItem(this.props.item)}></div>
            <div className='full-item'>
                <img alt='Фото коллекционной фигурки' src={'./img/' + this.props.item.img}/>
                <div className='info'>
                    <h3>{this.props.item.title}</h3>
                    <h1> </h1>
                    <p>Описание: <br></br>{this.props.item.desc}</p>
                    <p>Состав:<br></br> {this.props.item.form} </p>
                    <b>Цена: {this.props.item.price} rub</b>
                <div className='add-to-cart' onClick={() => this.props.onAdd(this.props.item)}>В корзину</div>
                </div>
            </div>
        </div>
    )
  }
}

export default ShowFullItem