import React from 'react';
import PropTypes from 'prop-types';

import '../css/ProductCard.css';

class ProductCard extends React.Component {
  render() {
    const { price, title, thumbnail } = this.props;

    return (
      <div data-testid="product" className="product-card">
        <div className="product-title-section">
          <h2 className="product-title">{ title }</h2>
        </div>
        <img className="product-img" src={ thumbnail } alt="Product" />
        <h3 className="product-price">
          R$
          {' '}
          { price.toFixed(2) }
        </h3>
        <button type="button">Adicionar ao Carrinho</button>
      </div>
    );
  }
}

ProductCard.propTypes = {
  price: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  thumbnail: PropTypes.string.isRequired,
}.isRequired;

export default ProductCard;
