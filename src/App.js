import React from "react";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Items from "./components/Items";
import Categirues from "./components/Categirues";
import ShowFullItem from "./components/ShowFullItem";

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      orders: [],
      currentItems: [],
      items: [
        {
          id: 1,
          title: 'Toy Pudge',
          img: 'toypudge.webp',
          desc: 'Toy Buther model good luck.',
          category: 'dota',
          game: 'dota',
          price: 2000
        },
        {
          id: 2,
          title: 'Shadow Fiend Arcana',
          img: 'sf_arcana.webp',
          desc: 'Dead zxc inside model good luck.',
          category: 'dota',
          game: 'dota',
          price: 2000
        },
        {
          id: 3,
          title: 'Pudge',
          img: 'pudge.webp',
          desc: 'Buther model good luck.',
          category: 'dota',
          game: 'dota',
          price: 2000
        },
        {
          id: 4,
          title: 'Shadow Fiend',
          img: 'sf.webp',
          desc: 'zxc model good luck.',
          category: 'dota',
          game: 'dota',
          price: 2000
        },
        {
          id: 5,
          title: 'Blood Seeker',
          img: 'bs.webp',
          desc: 'Blood siknul model good luck.',
          category: 'dota',
          game: 'dota',
          price: 2000
        },
        {
          id: 6,
          title: 'Genshin Impact - Skyward Blade',
          img: 'skyward_blade.webp',
          desc: 'Elegant weapon model from Genshin Impact.',
          category: 'genshin',
          game: 'genshin',
          price: 6000
        },
        {
          id: 7,
          title: 'glock-18 fade',
          img: 'glock.png',
          desc: 'weapon model from cs.',
          category: 'cs',
          game: 'cs',
          price: 1000
        }
      ],
      showFullItem: false,
      fullItem: {}
    }
    this.state.currentItems = this.state.items
    this.addToOrder = this.addToOrder.bind(this)
    this.deleteOrder = this.deleteOrder.bind(this)
    this.chooseCategory = this.chooseCategory.bind(this)
    this.onShowItem = this.onShowItem.bind(this)
  }
  render() {
    return (
      <div className="wrapper">
        <Header onShowItem={this.onShowItem} orders={this.state.orders} onDelete={this.deleteOrder}/>
        <Categirues chooseCategory={this.chooseCategory}/>
        <Items onShowItem={this.onShowItem} items={this.state.currentItems} onAdd={this.addToOrder}/>
        {this.state.showFullItem && <ShowFullItem onShowItem={this.onShowItem} onAdd={this.addToOrder} item={this.state.fullItem}/>}
        <Footer />
      </div>
    )
  }

  onShowItem(item) {
    this.setState({fullItem: item})
    this.setState({showFullItem: !this.state.showFullItem})
  }

  chooseCategory(category) {
    if(category === 'all') {
      this.setState({currentItems: this.state.items})
      return
    }

    this.setState({
      currentItems: this.state.items.filter(el => el.category === category)
    })
  }

  addToOrder(item) {
    let isIn = false
    this.state.orders.forEach(el => {
      if(el.id === item.id)
        isIn = true
    })
    if(!isIn)
      this.setState({orders: [...this.state.orders, item]}, () => {
    })
  }

  deleteOrder(id) {
    this.setState({orders: this.state.orders.filter(el => el.id !== id)})
  }

}

export default App;
