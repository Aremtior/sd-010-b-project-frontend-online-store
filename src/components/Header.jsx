import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Header extends Component {
  render() {
    return (
      <nav className="cart-block">
        <h2>
          Project Frontend Online Store
        </h2>
        <Link className="btn-type" to="/cart" data-testid="shopping-cart-button">
          <img
            src="https://www.seekpng.com/png/detail/257-2572499_close-shopping-cart-light-gray-shopping-cart.png"
            alt="cart"
            width="100px"
          />
        </Link>
      </nav>

    );
  }
}

export default Header;
