import React, { Component } from 'react';
import CheckoutForm from '../components/CheckoutForm';

export default class Checkout extends Component {
  renderProducts = () => {
    const productsCheckout = JSON.parse(localStorage.getItem('products-on-cart'));
    console.log(productsCheckout);
    return productsCheckout.map((product) => (
      <div key={ product.product.id }>
        <div>
          <img src={ product.product.thumbnail } alt="Imagem do produto" />
          <p>{ product.product.title }</p>
          <p>{product.product.price * product.quantity}</p>
        </div>
      </div>));
  }

  render() {
    return (
      <main>
        <section className="product-list">
          <h3>Revise seus produtos</h3>
          {this.renderProducts()}
          <p>
            Total: R$
            {' '}
            {(localStorage.getItem('total-price'))}
          </p>
        </section>
        <section className="form">
          <CheckoutForm />
        </section>
        <h3>Método de Pagamento</h3>
        <section className="payment">
          <div>
            <label htmlFor="boleto">
              <p>Boleto</p>
              <input type="radio" id="boleto" />
              <span role="img" aria-label="money">&#128181;</span>
            </label>
          </div>
          <div>
            <label htmlFor="cartao">
              <p>Cartão de crédito</p>
              <input type="radio" id="visa" />
              Visa
              &#128179;

              <input type="radio" id="master" />
              MasterCard
              &#128179;
            </label>
          </div>
        </section>
        <section>
          <button type="submit"> Comprar </button>
        </section>
      </main>
    );
  }
}
