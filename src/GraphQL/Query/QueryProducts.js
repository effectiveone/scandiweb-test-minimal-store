import { gql } from "@apollo/client";
import partialProd from "./partialProd"

export  function QueryProducts(id) {
    return gql`
      ${partialProd}
      query getProd {
        product(id: "${id}") {
          ...partialProd
          description
          attributes {
            id
            type
            name
            items {
              displayValue
              value
              id
            }
          }
        }
      }
    `;
  }