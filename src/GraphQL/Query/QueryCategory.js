import { gql } from '@apollo/client';

export const QueryCategory = (category = 'all') => {
  const GET_CATEGORY_PRODUCTS = gql`
      query GetProducts {
        category(input: { title: "${category}" }) {
          name
          products {
            id
            name
            gallery
            inStock
            prices {
              currency {
                symbol
              }
              amount
            }
            attributes {
              id
              name
              type
              items {
                id
                value
              }
            }
          }
        }
      }
  `;
  return GET_CATEGORY_PRODUCTS;
};

export default QueryCategory;
