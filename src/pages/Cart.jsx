import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import CartItems from '../components/CartItems';
import Header from '../components/Header';

export default class Cart extends Component {
  storageUpdate = () => {
    if (localStorage.length !== 0) {
      const getProducts = JSON.parse(localStorage.getItem('products-on-cart'));
      return getProducts;
    }
    return [];
  }

  emptyOrNot = () => {
    const cartLength = this.storageUpdate();
    if (cartLength === null || cartLength.length === 0) {
      return true;
    }
    return false;
  }

  render() {
    const cartEmpty = this.emptyOrNot();
    const MSG_FROM_EMPTY = (
      <span data-testid="shopping-cart-empty-message">
        Seu carrinho está vazio
      </span>
    );
    return (
      <div>
        <Header />
        <Link to="/" style={ { textDecoration: 'none' } }>
          <button
            className="btn-search"
            type="button"
          >
            Voltar &#10550;
          </button>
        </Link>
        <br />
        {cartEmpty ? MSG_FROM_EMPTY
          : <CartItems /> }
      </div>
    );
  }
}
