import { Query } from '@apollo/client/react/components';
import PropTypes from 'prop-types';
import React, {Component} from 'react';
import Loading from '../../Components/Loading/Loading';
import Productdetails from '../../Components/ProductDetails/ProductDetails';
import { QueryProducts} from '../../GraphQL/Query/QueryProducts';



  class ProdctDescriptionPage extends Component {
    render() {
      const {
        productId, symbol
      } = this.props;

return (
  <Query query={QueryProducts(productId)}>
    {({ data, loading }) => {
      console.log("data", data)
      if (loading) return <Loading />;
      const { product } = data;
      return <Productdetails symbol={symbol} product={product} />;
    }}
  </Query>)
    }}
  

export default ProdctDescriptionPage;

ProdctDescriptionPage.propTypes = {
  productId: PropTypes.string.isRequired,
  symbol: PropTypes.string.isRequired,
};
