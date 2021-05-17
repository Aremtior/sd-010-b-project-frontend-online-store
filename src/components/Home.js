import React from 'react';
import { Link } from 'react-router-dom';
import Img from '../images/cart.png';
import Category from './Categories';
import ItemProduct from './ItemProduct';
import { getProductsFromCategoryAndQuery } from '../services/api';

class Home extends React.Component {
  constructor() {
    super();
    this.onChangeHandle = this.onChangeHandle.bind(this);
    this.onClickHandle = this.onClickHandle.bind(this);
    this.state = {
      products: [],
      inputfilter: null,
    };
  }

  onChangeHandle({ target }) {
    this.setState({
      inputfilter: target.value,
    });
  }

  onClickHandle(event) {
    event.preventDefault();
    const { inputfilter } = this.state;
    getProductsFromCategoryAndQuery(null, inputfilter)
      .then((products) => this.setState({
        products,
      }));
  }

  render() {
    const { inputfilter, products } = this.state;
    return (
      <div className="App">
        <Category />
        <Link to="/cart">
          <button type="button">
            <img
              data-testid="shopping-cart-button"
              src={ Img }
              width="100px"
              alt="cart shop"
            />
          </button>
        </Link>
        <p data-testid="home-initial-message">
          Digite algum termo de pesquisa ou escolha uma categoria.
        </p>
        <div>
          <input
            value={ inputfilter }
            type="text"
            className="input-pesquisa-produto"
            data-testid="query-input"
            onChange={ this.onChangeHandle }
          />
          <button
            type="button"
            data-testid="query-button"
            onClick={ this.onClickHandle }
          >
            pesquisar
          </button>
        </div>
        <div>
          <ItemProduct products={ products } />
        </div>
      </div>
    );
  }
}

export default Home;
