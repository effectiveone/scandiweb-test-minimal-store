import React, {Component} from 'react';
import { Query } from '@apollo/client/react/components';
import ProductItem from '../../Components/ProductItem/ProductItem';
import  QueryCategory  from '../../GraphQL/Query/QueryCategory';

import './ProductListPage.style.css';
import Loading from '../../Components/Loading/Loading';
import uuid from 'react-uuid';


  class ProductListPage extends Component {
    render() {
      const {
        symbol, category
      } = this.props;

return (


  <Query query={QueryCategory(category)}>
    {({ data, loading }) => {
      if (loading) return <Loading />;
      const { name, products } = data.category;
      return (     
        <section>
          <h1 className="category-title">{name}</h1>
          <div className="products-container">
            {products.map((product) => (
              <ProductItem key={uuid()} symbol={symbol} product={product} />
            ))}
          </div>
        </section>
      );
    }}
  </Query>
)}}

export default ProductListPage;
