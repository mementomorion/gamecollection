import React from "react";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Items from "./components/Items";
import Categirues from "./components/Categirues";
import ShowFullItem from "./components/ShowFullItem";
import itemData from "./shop/items.json";


class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      orders: [],
      currentItems: [],
      items: itemData,
      showFullItem: false,
      fullItem: {}
    }
    this.state.currentItems = this.state.items
    this.chooseCategory = this.chooseCategory.bind(this)
    this.onShowItem = this.onShowItem.bind(this)
  }
  render() {
    return (
      <div className="wrapper">
        <Header onClearOrders={this.clearOrders} onShowItem={this.onShowItem} orders={this.state.orders} onDelete={this.handleDeleteItem}/>
        <Categirues chooseCategory={this.chooseCategory}/>
        <Items onShowItem={this.onShowItem} items={this.state.currentItems} onAdd={this.handleAddToCart}/>
        {this.state.showFullItem && <ShowFullItem onShowItem={this.onShowItem} onAdd={this.handleAddToCart} item={this.state.fullItem}/>}
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

  handleAddToCart = (item) => {
    this.setState((prevState) => {
      const existingItem = prevState.orders.find(order => order.id === item.id);
      if (existingItem) {
        // Если товар уже есть в корзине, увеличиваем его количество
        return {
          orders: prevState.orders.map(order =>
            order.id === item.id ? { ...order, quantity: order.quantity + 1 } : order
          ),
        };
      } else {
        // Если товара еще нет в корзине, добавляем его с quantity = 1
        return {
          orders: [...prevState.orders, { ...item, quantity: 1 }],
        };
      }
    });
  };

  handleDeleteItem = (id) => {
    this.setState((prevState) => ({
      orders: prevState.orders.filter(order => order.id !== id),
    }));
  };

  clearOrders = () => {
    this.setState({ orders: [] });
  };

}

export default App;
