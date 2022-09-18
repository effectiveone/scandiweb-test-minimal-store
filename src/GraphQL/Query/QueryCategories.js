import { gql } from "@apollo/client";

export  const QueryCategories = gql`
  query getCategories {
    categories {
      name
    }
  }
`;

