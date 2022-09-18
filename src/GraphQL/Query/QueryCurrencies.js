import { gql } from "@apollo/client";


export const QueryCurrencies = gql`
  query getCurrency {
    currencies {
      label
      symbol
    }
  }
`;