import cache from '../../..';
import {
  ADD_TO_CART,
  CHANGE_ATTRIBUTES,
  INCREMENT_AN_ITEM,
  DECREMENT_AN_ITEM,
  REMOVE_FROM_CART
} from "./Cart.type.js";

const initialState = {
  cart: [],
};
let num = 0;


const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART: {
      let cartId = null;
      let mt = 0;
      const attributeChecker = new Set();
      const productsObject = cache?.data?.data;
      const productData = productsObject[`Product:${action.id}`];
      const ProductInCart = state.cart.some(
        (item) => item.id === productData.id,
      );
      if (ProductInCart) {
        action.attributes.forEach((attribute) => {
          attributeChecker.add(attribute.value);
        });
        for (const cartItem of state.cart) {
          const { attributes } = cartItem;
          if (mt === attributeChecker.size) break;
          for (const attribute of attributes) {
            if (attributeChecker.has(attribute.value)) {
              cartId = cartItem.cartId;
              mt++;
            } else {
              mt = 0;
            }
          }
        }
        if (mt === attributeChecker.size) {
          return {
            ...state,
            cart: [state.cart.attributes,
              ...state.cart.map((product) => {
                if (cartId !== product.cartId) {
                  return product;
                }
                return {
                  ...product,
                  quantity: product.quantity + 1,
                };
              }),
            ],
          };
        }
      }
      return {
        ...state,
        cart: [
          ...state.cart,
          {
            ...productData,
            attributes: productData.attributes,
            quantity: 1,
            selectedAttributes: action.attributes,
            cartId: num++,
          },
        ],
      };
    }
    case CHANGE_ATTRIBUTES: {
      const { name, value, cartId } = action.payload;
      return {
        ...state,
        cart: [

          ...state.cart.map((product) => {
            if (name !== "Color" && action.cartId !== product.cartId) {
              return product;
            }

            return {
              ...product,
       
             
            ...product.selectedAttributes.map(p =>{
                
                if(p.name === name && p.value !== value){ 
                  p.value = value
                 p.id = value
                 }

            })
      
       
            
            };
          }),
        ],
      }};
    case INCREMENT_AN_ITEM:
      return {
        ...state,
        cart: [
          ...state.cart.map((product) => {
            if (action.cartId !== product.cartId) {
              return product;
            }
            return {
              ...product,
              quantity: product.quantity + 1,
            };
          }),
        ],
      };
    case DECREMENT_AN_ITEM:
      return {
        ...state,
        cart: [
          ...state.cart.map((product) => {
            if (action.cartId !== product.cartId) {
              return product;
            }
            if (product.quantity === 1) return product;
            return {
              ...product,
              quantity: product.quantity - 1,
            };
          }),
        ],
      };
    case REMOVE_FROM_CART:
      return {
        ...state,
        cart: [
          ...state.cart.filter((product) => product.cartId !== action.cartId),
        ],
      };
    default:
      return state;
  }
};

export default cartReducer;
