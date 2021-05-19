import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import CartItem from './CartItem';

class PageCart extends React.Component {
  // Faz a soma total do preço dos items que chegaram da props
  getTotalPrice = () => {
    const { cart } = this.props;
    return cart.reduce((acc, { qty, product: { price } }) => {
      acc += qty * price;
      return acc;
    }, 0);
  }

  render() {
    const { cart, handleCartBtnEvent } = this.props;
    if (!cart.length) {
      return (
        <p data-testid="shopping-cart-empty-message">Seu carrinho está vazio</p>
      );
    }
    return (
      <div>
        <h3>
          Total: R$
          {this.getTotalPrice()}
        </h3>
        {cart.map(({ qty, product: { title, price, available_quantity: Aqty }, id }) => (
          <CartItem
            key={ id }
            id={ id }
            name={ title }
            qty={ qty }
            Aqty={ Aqty }
            price={ price }
            handleCartBtnEvent={ handleCartBtnEvent }
          />
        ))}
        <Link to="/checkout" data-testid="checkout-products">Finalizar Compra</Link>
      </div>
    );
  }
}

PageCart.propTypes = {
  cart: PropTypes.arrayOf.isRequired,
  handleCartBtnEvent: PropTypes.func.isRequired,
};

export default PageCart;
