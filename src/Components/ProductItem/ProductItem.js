import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { addProductToCart } from '../../Redux/store/Cart/Cart.action';
import whiteCartIcon from '../../Assets/whiteCartIcon.svg';
import './ProductItem.style.css';
import Modal from '../Modal/Modal';
import uuid from 'react-uuid';

class ProductItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
    };
  }

  setIsOpen = () => {
    this.setState({ isOpen: false });
  };

  handleAddProductToCart = (id) => {
    const {
      addProductToCart,
      product: { name, attributes },
    } = this.props;
    const selectedAttributes = attributes.map(({ id, name, items }) => {
      return {
         id,
         name,
         
         value: items[0]?.id
      };
   });

      addProductToCart(id, selectedAttributes,  uuid() );
    }
//       addProductToCart(id);}
//       else{
// const selectedAttributes = this.product.filter(z => z.id === id).attributes.filter(m=> m.items[0])
//         addProductToCart(id, selectedAttributes);}
//       }

  


  render() {
    const {
      product,
      product: {
        id, name, gallery, prices, inStock, attributes,
      },
      symbol,
    } = this.props;
    const { isOpen } = this.state;
    return (
      <>
        <article className="product-item" key={uuid()}>
          {!inStock && <span className="out-of-stock">OUT OF STOCK</span>}
          <div
            className={
              !inStock ? 'product-link product-overlay' : 'product-link'
            }
          >
            <Link to={id}>
              <img
                src={gallery[0]}
                alt={name}
              />
              <h4>{name}</h4>
            </Link>
            {prices.map(
              (price) => price.currency.symbol === symbol && (
              <strong key={uuid()}>
                {price.currency.symbol}
                {price.amount}
              </strong>
              ),
            )}
          </div>
          {inStock && (
          <button
            type="button"
            className="main-product-btn"
            onClick={()=> (this.handleAddProductToCart(id))}
            // onClick={() => (!attributes.length
            //   ? this.handleAddProductToCart(id)
            //   : this.setState({ isOpen: true }))}
          >
            <img src={whiteCartIcon} alt="cart" />
          </button>)}
        </article>
        {/* {isOpen && (
          <Modal product={product} attributes={attributes} setIsOpen={this.setIsOpen} />
        )} */}
      </>
    );
  }
}

const mapDispatchToProps = {
  addProductToCart,
};

export default connect(null, mapDispatchToProps)(ProductItem);
