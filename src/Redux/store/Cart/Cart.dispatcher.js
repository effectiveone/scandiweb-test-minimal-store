import {
  addProductToCart,
  removeProduct,
  updateProductAmount,
  changeAttributes,
} from "./Cart.action";

export class CartDispatcher {
  static addProductToCart(dispatch, product) {
    dispatch(addProductToCart(product));
  }

  static changeAttributes(dispatch, product, attributes) {
       dispatch(changeAttributes(product, attributes));
  }

  static updateProductAmount(dispatch, product, amount) {
    amount <= 0
      ? dispatch(removeProduct(product))
      : dispatch(updateProductAmount(product, amount));
  }
}

export default new CartDispatcher();
