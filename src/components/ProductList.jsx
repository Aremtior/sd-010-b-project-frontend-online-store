import React from 'react';
import * as api from '../services/api';
import Categories from './Categories';
import ProductCard from './ProductCart';

class ProductList extends React.Component {
  constructor() {
    super();
    this.state = {
      product: [],
      search: '',
      category: '',
    };
  }

  handleChange = ({ target: { value } }) => {
    this.setState({ search: value });
  }

  handleClick = async () => {
    const { search, category } = this.state;
    const response = await api.getProductsFromCategoryAndQuery(category, search);
    this.setState({
      product: response.results,
    });
  }

  render() {
    const { product } = this.state;
    return (
      <div>
        <label htmlFor="query-input">
          <input
            data-testid="query-input"
            type="text"
            onChange={ this.handleChange }
          />
        </label>
        <button
          data-testid="query-button"
          type="button"
          onClick={ this.handleClick }
        >
          Pesquisar
        </button>
        { product === []
          ? (<p>Nenhum produto foi encotrado</p>)
          : product.map((item) => (
            <ProductCard key={ item.id } product={ item } />
          ))}
      </div>
    );
  }
}

export default ProductList;
