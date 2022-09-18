import {GET_PRODUCTS, SELECT_ATTRIBUTE, UPDATE_ACTIVE_PRODUCT,RESET_PRODUCT_ATTRIBUTES} from "./Product.type"
export const getProductsList = (products) => ({
  type: GET_PRODUCTS,
  products,
});
export const selectAttribute = (attribute) => ({
  type: SELECT_ATTRIBUTE,
  attribute,
});

export const updateActiveProduct = (product) => ({
  type: UPDATE_ACTIVE_PRODUCT,
  product,
});

export const resetProductAttributes = (product) => ({
  type: RESET_PRODUCT_ATTRIBUTES,
  product,
});
