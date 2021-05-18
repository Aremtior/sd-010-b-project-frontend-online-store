import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import CartItem from '../components/Cart/CartItem';
import '../css/Cart/Cart.css';

const fakeCartItems = [
  {
    id: '01',
    name: 'Máquina de lavar',
    source: '',
    quantity: 1,
    price: 4000,
  },
  {
    id: '02',
    name: 'Máquina de lavar',
    source: '',
    quantity: 1,
    price: 2000,
  },
  {
    id: '04',
    name: 'Máquina de lavar',
    source: '',
    quantity: 1,
    price: 5500,
  },
  {
    id: '03',
    name: 'Máquina de lavar',
    source: '',
    quantity: 1,
    price: 5250,
  },
];
class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: fakeCartItems,
    };
  }

  cloneProducts = () => {
    const { products } = this.state;
    return products.slice(0);
  }

  render() {
    const { products } = this.state;
    return (
      <>
        <Link to="/">Voltar</Link>
        <header>Carrinho de compras</header>
        <div data-testid="shopping-cart-empty-message">Seu carrinho está vazio</div>
        <div className="cart-item-container">
          { products.map((product) => (
            <CartItem
              key={ product.id }
              cartProduct={ product }
              removeProduct={ this.removeProduct }
              updateQuantity={ this.updateQuantity }
            />)) }
        </div>
        <p>
          Valor total da compra: R$
          { this.updateTotalPurchase() }
        </p>
        <button type="button">Finalizar compra</button>
      </>
    );
  }
}
export default Cart;
