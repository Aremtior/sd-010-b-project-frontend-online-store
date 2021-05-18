import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import CartItem from '../components/Cart/CartItem';
import '../css/Cart/Cart.css';
import * as dataLocalStorage from '../services/dataLocalStorage';

class Cart extends Component {
  constructor(props) {
    super(props);
    const products = dataLocalStorage.getLocalStorage('dataShoppingCart');
    this.state = {
      products,
    };
  }

  cloneProducts = () => {
    const { products } = this.state;
    return products.slice(0);
  }

  removeProduct = (id) => {
    const productsCopy = this.cloneProducts();
    const indexProductFound = productsCopy.findIndex((product) => product.id === id);
    productsCopy.splice(indexProductFound, 1);
    dataLocalStorage.updateLocalStorage('dataShoppingCart', productsCopy);
    this.setState({ products: productsCopy });
  };

  updateQuantity = (operation, id) => {
    const productsCopy = this.cloneProducts();
    const indexProductFound = productsCopy.findIndex((product) => product.id === id);
    let prodQuantity = productsCopy[indexProductFound].quantity;
    if (operation === 'sum') {
      prodQuantity += 1;
    }
    if (operation === 'subtract') {
      prodQuantity = (prodQuantity > 1) ? prodQuantity - 1 : 0;
    }
    productsCopy[indexProductFound].quantity = prodQuantity;
    dataLocalStorage.updateLocalStorage('dataShoppingCart', productsCopy);
    this.setState({ products: productsCopy });
  };

  updateTotalPurchase = () => {
    const { products } = this.state;
    return products.reduce((acc, { quantity, price }) => {
      let totalPurchase = acc;
      totalPurchase += quantity * price;
      return totalPurchase;
    }, 0);
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
        <Link
          data-testid="checkout-products"
          to={ { pathname: '/checkout', state: { products } } }
        >
          Finalizar compra
        </Link>
      </>
    );
  }
}
export default Cart;
