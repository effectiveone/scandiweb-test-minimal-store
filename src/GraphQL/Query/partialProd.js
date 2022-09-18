import { gql } from '@apollo/client';

const partialProd = gql`
fragment partialProd on Product {
  id
  brand
  name
  gallery
  inStock
  prices {
    amount
    currency {
      label
      symbol
    }
  }
}
`;

export default partialProd;
