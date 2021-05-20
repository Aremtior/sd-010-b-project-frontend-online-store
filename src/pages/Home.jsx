import React from 'react';
import '../App.css';

import CategoryBar from '../components/CategoryBar';
import Header from '../components/Header';
import ProductsList from '../components/ProductsList';
import SearchArea from '../components/SearchArea';

import { getProductsFromCategoryAndQuery } from '../services/api';

class Home extends React.Component {
  constructor() {
    super();
    this.fetchProducts = this.fetchProducts.bind(this);
    this.onChangeHandle = this.onChangeHandle.bind(this);
    this.onClickHandle = this.onClickHandle.bind(this);
    this.onChangeCategoryHandle = this.onChangeCategoryHandle.bind(this);
    this.state = {
      isLoading: false,
      products: {},
      inputfilter: '',
      categoryfilter: null,
    };
  }

  onChangeHandle({ target }) {
    this.setState({
      inputfilter: target.value,
    });
  }

  onClickHandle(event) {
    event.preventDefault();
    this.fetchProducts();
  }

  async onChangeCategoryHandle({ target }) {
    if (target.checked) {
      await this.setState({
        categoryfilter: target.id,
      });
    }
    this.fetchProducts();
  }

  fetchProducts() {
    const { inputfilter, categoryfilter } = this.state;
    this.setState({ isLoading: true });
    getProductsFromCategoryAndQuery(categoryfilter, inputfilter)
      .then((products) => this.setState({
        products,
        isLoading: false,
      }));
  }

  render() {
    const { products, isLoading, inputfilter, categoryfilter } = this.state;
    return (
      <div className="homepage">
        <Header />
        <section className="categories-bar">
          <CategoryBar onChange={ this.onChangeCategoryHandle } />
        </section>
        <section className="result-page">
          <SearchArea
            onChange={ this.onChangeHandle }
            onClick={ this.onClickHandle }
            inputfilter={ inputfilter }
            categoryfilter={ categoryfilter }
          />
          <p className="text-search" data-testid="home-initial-message">
            Digite algum termo de pesquisa ou escolha uma categoria.
          </p>
          <section className="products-list">
            <ProductsList
              products={ products }
              isLoading={ isLoading }
            />
          </section>
        </section>
      </div>
    );
  }
}

export default Home;
