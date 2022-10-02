import {
    ADD_TO_CART,
    CHANGE_ATTRIBUTES,
    INCREMENT_AN_ITEM,
    DECREMENT_AN_ITEM,
    REMOVE_FROM_CART
  } from "./Cart.type.js";
  
export const addProductToCart = (id, attributes = [], cartID) => ({
    type: ADD_TO_CART,
    id,
    attributes,
    cartID
  });

  export const changeAttributes = (id, payload, cartId) => ({
    type: CHANGE_ATTRIBUTES,
    id,
    payload, 
    cartId,

  });
  
  export const removeProductFromCart = (cartId) => ({
    type: REMOVE_FROM_CART,
    cartId,
  });
  
  export const incrementAnItem = (cartId) => ({
    type: INCREMENT_AN_ITEM,
    cartId,
  });
  
  export const decrementAnItem = (cartId) => ({
    type: DECREMENT_AN_ITEM,
    cartId,
  });