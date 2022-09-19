import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import './CartOverlay.style.css';

import {
  incrementAnItem,
  decrementAnItem,
  removeProductFromCart,
  changeAttributes
} from '../../Redux/store/Cart/Cart.action';
import delIcon from '../../Assets/delIcon.png';
// import Slider from '../Slider';
import AttributeCompare from "./AttributeCompare"




class CartOverlay extends Component {
 constructor(props) {
  super(props);
  this.state = {
    attributes: [],
    checker: new Set(),
    isThereAttributes: false,
  };


 }





  render() {
    const {
      setIsOpen,
      cart,
      symbol,
      totalPrice,
      numberOfItems,
      incrementAnItem,
      changeAttributes,
      decrementAnItem,
      removeProductFromCart,
    } = this.props;




    return ReactDOM.createPortal(
      <>
        <section className="mini-cart">
          <h3 className="mini-cart-title">
            <strong>
              My Bag.
              {' '}
              {numberOfItems}
              {numberOfItems === 1 ? ' item' : ' items'}
            </strong>
          </h3>
          <div className="items-container  container-container">
            {cart.map((item) => (
              <article key={item.id} className="item">
                <div className="item-info">
                  <h4 className="brand-name">{item.brand}</h4>
                  <h5 className="item-name">{item.name}</h5>
                  {item.prices.map(
                    (price) => price.currency.symbol === symbol && (
                    <div key={price.currency.symbol}>
                      <p className="mini-cart-price">
                        {price.currency.symbol}
                        {price.amount}
                      </p>
                    </div>
                    ),
                  )}
                  
                  {item.attributes.map((attribute, index) =>{
           
               return (
                  <AttributeCompare
                  cartOverlay={true}
                     key={`${index}`}
                     attributes={attribute}
                     selectedAttributes={item.selectedAttributes}
                     isCartPage={true}
                     changeAttributes={changeAttributes}
                     itemCardID={item.cardID}
                  />
               )}
                  )}
                </div>
                <div className="qty-bts-container">
                  <button
                    className="quantity-btn"
                    type="button"
                    onClick={() => incrementAnItem(item.cartId)}
                  >
                    +
                  </button>
                  <p>{item.quantity}</p>
                  <button
                    className="quantity-btn"
                    type="button"
                    onClick={() => decrementAnItem(item.cartId)}
                  >
                    -
                  </button>
                </div>
                <div className="item-pictures">
                 <img src={item.gallery[0]} style={{width:'150px', height: '250px'}}/>
            </div>               <button
                  className="mini-delete-icon"
                  type="button"
                 
                  onClick={() => removeProductFromCart(item.cartId)}
                >
                  <img src={delIcon} alt="delete icon" />
                </button>
             
              
              </article>
            ))}
         </div>
          <div className="total-container">
            <p className="mini-cart-total">Total</p>
            <p className="mini-cart-total-price">{totalPrice}</p>
          </div>
          <div className="mini-cart-action-btns-container">
            <Link
              to="/Cart"
              type="button"
              onClick={setIsOpen}
              className="view-bag-btn"
            >
              VIEW BAG
            </Link>
            <button type="button" className="checkout-btn">
              CHECKOUT
            </button>
          </div>
        </section>
        <div aria-hidden="true" onClick={setIsOpen} className="overlay" />
      </>,
      document.getElementById('portal'),
    );
  }
}

const mapStateToProps = (state) => {
  const {
    cartReducer: { cart },
  } = state;
  return { cart };
};

const mapDispatchToProps = {
  incrementAnItem,
  decrementAnItem,
  changeAttributes,
  removeProductFromCart,
};

export default connect(mapStateToProps, mapDispatchToProps)(CartOverlay);
