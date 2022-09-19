import { Query } from '@apollo/client/react/components';
import PropTypes from 'prop-types';
import React from 'react';
import Loading from '../../Components/Loading/Loading';
import Productdetails from '../../Components/ProductDetails/ProductDetails';
import { QueryProducts} from '../../GraphQL/Query/QueryProducts';


const ProdctDescriptionPage = ({ productId, symbol }) => (

  <Query query={QueryProducts(productId)}>
    {({ data, loading }) => {
      console.log("data", data)
      if (loading) return <Loading />;
      const { product } = data;
      return <Productdetails symbol={symbol} product={product} />;
    }}
  </Query>
);

export default ProdctDescriptionPage;

ProdctDescriptionPage.propTypes = {
  productId: PropTypes.string.isRequired,
  symbol: PropTypes.string.isRequired,
};
