import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import ProductsSearchBar from '../components/ProductsSearchBar';
import ListCategories from '../components/ListCategories';
import ProductsList from '../components/ProductsList';

import './styles/ShoppingHome.css';

class ShoppingHome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: undefined,
      category: undefined,
    };

    this.fetchProductsFromQuery = this.fetchProductsFromQuery.bind(this);
  }

  async fetchProductsFromQuery() {

  }

  handleQuerySearch() {
    
  }

  render() {
    return (
      <section className="ShoppingHome">
        <aside>
          <ul>
            <ListCategories />
          </ul>
        </aside>
        <main>
          <ProductsSearchBar />
          <Link to="/cart" data-testid="shopping-cart-button">
            Cart
          </Link>
          <ProductsList />
        </main>
      </section>
    );
  }
}

export default ShoppingHome;
