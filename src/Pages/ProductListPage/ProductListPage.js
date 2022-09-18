import React from 'react';
import { Query } from '@apollo/client/react/components';
import ProductItem from '../../Components/ProductItem/ProductItem';
import  QueryCategory  from '../../GraphQL/Query/QueryCategory';

import './ProductListPage.style.css';
import Loading from '../../Components/Loading/Loading';

const ProductListPage = ({ symbol, category }) => (
  <Query query={QueryCategory(category)}>
    {({ data, loading }) => {
      if (loading) return <Loading />;
      const { name, products } = data.category;
      return (     
        <section>
          <h1 className="category-title">{name}</h1>
          <div className="products-container">
            {products.map((product) => (
              <ProductItem key={product.id} symbol={symbol} product={product} />
            ))}
          </div>
        </section>
      );
    }}
  </Query>
);

export default ProductListPage;
