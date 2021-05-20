import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import AddToCart from './AddToCart';

class ProductCard extends React.Component {
  // adicionar ponto na casa dos milhares e milhões
  // https://stackoverflow.com/questions/2901102/how-to-print-a-number-with-commas-as-thousands-separators-in-javascript?page=1&tab=votes#tab-top
  numberWithCommas = (x) => x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')

  render() {
    const { product, product: { id, title, thumbnail,
      price, shipping: { free_shipping: frete } } } = this.props;
    /* troca o ponto para virgula nos centavos */
    /* https://stackoverflow.com/questions/13672106/jquery-replace-dot-to-comma-and-round-it/13672180 */
    const priceWithStyle = price.toFixed(2).toString().replace('.', ',');
    const freteGratis = (
      <span
        role="img"
        aria-label="cart"
        data-testid="free-shipping"
      >
        &#128722; Frete grátis

      </span>);
    return (
      <section className="products-section">
        <section data-testid="product" className="product-box">
          <div className="product-name">
            <p>{ title }</p>
          </div>
          <div className="product-image">
            <img src={ thumbnail } alt={ title } />
            { frete ? freteGratis : null }
          </div>
          <div className="product-price">
            <p>{ `R$${this.numberWithCommas(priceWithStyle)}` }</p>
          </div>
          <div>
            <AddToCart data-testid="product-add-to-cart" product={ product } />
            <Link
              to={ `/details/${id}/${title
                .replace('%', '').replaceAll(/\//g, '')}/${frete}` }
            >
              <span data-testid="product-detail-link">VER DETALHES</span>
            </Link>
          </div>
        </section>
      </section>
    );
  }
}

ProductCard.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    thumbnail: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    shipping: PropTypes.shape({
      free_shipping: PropTypes.bool.isRequired,
    }).isRequired,
  }).isRequired,
};

export default ProductCard;
