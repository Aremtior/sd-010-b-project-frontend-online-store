import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export default class ProductDetails extends Component {
constructor(props) {
  super(props)

  this.handleClickAddCart2 = this.handleClickAddCart2.bind(this)

  this.state = {}
}
  

  handleClickAddCart2 = (product) => {
    const { location: { state } } = this.props;
    const { cart } = state;
    const haveCart = cart.length;
    if (!haveCart) {
      const { id, title } = product;
      const productCart = [{ id, title, count: 1 }];
      this.setState({
        cart: productCart,
      });
    } else {
      let productCart = cart;
      const findProduct = productCart.find((data) => data.id === product.id);
      if (findProduct) {
        const key = productCart.indexOf(findProduct);
        productCart[key].count += 1;
        this.setState({
          cart: productCart,
        });
      } else {
        const { id, title } = product;
        productCart = [...productCart, { id, title, count: 1 }];
        this.setState({
          cart: productCart,
        });
      }
    }
  }

  render() {
    const { location: { state } } = this.props;
    const { product } = state;
    const { title, price, thumbnail } = product;
    
    return (
      <div>
        <div>
          <h3 data-testid="product-detail-name">{title}</h3>
          <img src={ thumbnail } alt={ title } />
          <h2>{`Preço: R$ ${price}`}</h2>
        </div>
        <button
          type="button"
          value={ product.id }
          onClick={ () => this.handleClickAddCart2(product) }
          data-testid="product-add-to-cart"
        >
          Adicionar ao Carrinho
            </button>
        <button type="button">
          <Link to="/">
            Voltar
          </Link>
        </button>
      </div>
    );
  }
}

ProductDetails.propTypes = {
  location: PropTypes.shape({
    state: PropTypes.shape({
      product: PropTypes.shape({
        title: PropTypes.string.isRequired,
        thumbnail: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        id: PropTypes.string.isRequired,
      }).isRequired,
    }).isRequired,
  }).isRequired,
};
