import React from 'react';

class Home extends React.Component {
  render() {
    return (
      <div>
        <li />
        {/* deixar um li criado só p lembrar d fazer uma lista dinâmica */}
        <span data-testid="home-initial-message">
          Digite algum termo de pesquisa ou escolha uma categoria.
        </span>
      </div>
    );
  }
}

export default Home;
