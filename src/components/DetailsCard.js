import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { getProductsFromCategoryAndQuery } from '../services/api';
import Rating from './Rating';

class DetailsCard extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.state = {
      details: {},
      nameItems: [],
      textArea: '',
      select: 5,
    };
  }

  componentDidMount() {
    this.getAPI();
  }

  componentDidUpdate() {
    const { nameItems } = this.state;
    if (nameItems.length !== 0) {
      const value = JSON.parse(localStorage.getItem('cartItems'));
      const result = !value ? [] : value;
      localStorage.setItem('cartItems', JSON.stringify([...result, nameItems]));
    }
  }

  handleChange(field, newValue) {
    this.setState({ [field]: newValue });
  }

  handleSubmit = (id) => () => {
    const { textArea, select } = this.state;
    const conteudo = `${textArea} Nota:${select}`;
    const value = JSON.parse(localStorage.getItem(id));
    const result = !value ? [] : value;
    localStorage.setItem(id, JSON.stringify([...result, conteudo]));
  }

  getName = (product) => () => {
    this.setState({ nameItems: product });
  }

  getAPI = async () => {
    const { match: { params: { title } } } = this.props;
    const products = await getProductsFromCategoryAndQuery('', title);
    this.setState({
      details: products.results[0],
    });
  }

  render() {
    const { details: { title, thumbnail, price, id }, details } = this.state;
    const { value } = this.state;
    return (
      <div>
        <h2 data-testid=" product-detail-name">{ title }</h2>
        <img src={ thumbnail } alt={ title } />
        <p>{ price }</p>
        <Link to="/">Home</Link>
        <Link data-testid="shopping-cart-button" id="cart" to="/cart">Carrinho</Link>
        <button
          data-testid="product-detail-add-to-cart"
          type="button"
          onClick={ this.getName(details) }
        >
          Adicionar ao Carrinho
        </button>
        <form>
          <select
            defaultValue={ 5 }
            onChange={ (event) => this.handleChange('select', event.target.value) }
          >
            <option value={ 1 }>1</option>
            <option value={ 2 }>2</option>
            <option value={ 3 }>3</option>
            <option value={ 4 }>4</option>
            <option value={ 5 }>5</option>
          </select>
          <label htmlFor="evaluation">
            Comentário:
            <textarea
              name="textArea"
              data-testid="product-detail-evaluation"
              value={ value }
              onChange={ (event) => this.handleChange('textArea', event.target.value) }
            />
          </label>
          <input onClick={ this.handleSubmit(id) } type="submit" value="Enviar" />
        </form>
        <Rating id={ id } />
      </div>
    );
  }
}

DetailsCard.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      title: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    }),
  }).isRequired,
};

export default DetailsCard;
