import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import ItemCard from './ItemCard';

export default class CartItems extends Component {
  constructor(props) {
    super(props);

    this.state = {
      products: [],
      totalPrice: 0,
    };
  }

  componentDidMount() {
    this.updateState();
  }

  storageUpdate = () => {
    if (localStorage.length !== 0) {
      const getProducts = JSON.parse(localStorage.getItem('products-on-cart'));
      return getProducts;
    }
    return [];
  }

  updateState = () => {
    const productsInStorage = this.storageUpdate();
    this.setState({
      products: productsInStorage,
      totalPrice: localStorage.getItem('total-price'),
    });
  }

  calculateTotalPrice = () => {
    const { products } = this.state;
    const storageKey = 'total-price';
    let totalPrice = products.reduce((accumulator, currentProduct) => {
      accumulator += currentProduct.product.price * currentProduct.quantity;
      return accumulator;
    }, 0);
    totalPrice = totalPrice.toFixed(2).toString().replace('.', ',');
    this.numberWithCommas(totalPrice);
    localStorage.setItem(storageKey, totalPrice);
    this.setState({
      totalPrice: localStorage.getItem(storageKey),
    });
  }

  // adicionar ponto na casa dos milhares e milhões
  // https://stackoverflow.com/questions/2901102/how-to-print-a-number-with-commas-as-thousands-separators-in-javascript?page=1&tab=votes#tab-top
  numberWithCommas = (x) => x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')

  render() {
    const { products, totalPrice } = this.state;
    return (
      <div>
        <div>
          <p>
            Itens no carrinho:
            {' '}
            { products.length }
          </p>
        </div>
        <div className="top-cart">
          <span className="prod-names">Produtos</span>
          <span className="quantprice-names">Quantidade</span>
          <span className="quantprice-names">Preço</span>
        </div>

        {products.map((product) => (
          <ItemCard
            key={ product.product.id }
            product={ product }
            commaFunction={ this.numberWithCommas }
            calculateTotal={ this.calculateTotalPrice }
          />
        ))}
        <hr />
        <div className="finish">
          <Link to="/checkout">
            <button
              data-testid="checkout-products"
              type="button"
            >
              Finalizar compra

            </button>
          </Link>
          <span />
          <span />
          <div>
            <span>Total da compra: </span>
            <span>
              R$
              {' '}
              { this.numberWithCommas(totalPrice) }
            </span>
          </div>
        </div>
      </div>
    );
  }
}
