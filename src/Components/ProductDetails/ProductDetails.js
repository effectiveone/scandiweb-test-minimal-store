import React, { Component } from 'react';
import parse from 'html-react-parser';
import { connect } from 'react-redux';
import { addProductToCart } from '../../Redux/store/Cart/Cart.action';
import Productattribute from './ProductAttribute';
import './ProductDetails.style.css';
import uuid from 'react-uuid';

class Productdetails extends Component {
  constructor(props) {
    super(props);
    const {
      product: { gallery },
    } = this.props;

    this.state = {
      attributes: [],
      checker: new Set(),
      isThereAttributes: false,
      defaultImage: gallery[0],
    };
  }

  handleAttributeOnChange = (event) => {
    const { checker, attributes } = this.state;
    const { name, value } = event.target;
    if (!checker.has(name)) {
      this.setState((state) => state.checker.add(name));
      this.setState({
        attributes: [...attributes, { name, value }],
      });
    } else {
      this.setState((state) => state.attributes.forEach((attribute) => {
        if (attribute.name === name) {
          attribute.value = value;
        }
      }));
    }
  };

  attributesNeeded = () => {
    const {
      product: { attributes },
    } = this.props;
    const { checker } = this.state;
    return attributes.filter((item) => !checker.has(item.name));
  };

  handleAddToCArtOnClick = () => {
    const { attributes } = this.state;
    const {
      product,
      product: { inStock, id },
      addProductToCart,
    } = this.props;
    const numberOfAttributes = product.attributes.length;
    if (numberOfAttributes !== attributes.length) {
      this.setState({ isThereAttributes: true });
    } else {
      if (!inStock) return;
      this.setState({ isThereAttributes: false });
      addProductToCart(id, attributes, uuid());
      this.setState({ attributes: [], checker: new Set() });
    }
  };

  displayImageOnclick = (event) => {
    const { src } = event.target;
    this.setState({ defaultImage: src });
  };

  render() {
    const {
      product: {
        brand,
        name,
        inStock,
        attributes,
        prices,
        description,
        gallery,
      },
      symbol,
    } = this.props;
    const { isThereAttributes, defaultImage } = this.state;
    return (
      <section className="product-details-container">
        <div className="product-img-conatiner">
          {gallery.map((picture) => (
            <img
              key={uuid()}
              src={picture}
              onClick={(e) => this.displayImageOnclick(e)}
              alt="product"
            />
          ))}
        </div>
        <img className="main-product-image" src={defaultImage} alt="product" />
        <div className="product-details-info-conatiner">
          <h2 className="product-brand">{brand}</h2>
          <h3>{name}</h3>
          {!inStock && (
            <strong>
              This product is not avaiable at the moment
            </strong>
          )}
          <div>
            {isThereAttributes && (
              <ul>
                {this.attributesNeeded().map((item) => (
                  <li key={uuid()}>
                    <strong>
                      {item.name}
                      {' '}
                      is not selected, Please try to choose one
                    </strong>
                  </li>
                ))}
              </ul>
            )}
            {attributes.map((attribute) => (
              <Productattribute
                handleAttributeOnChange={this.handleAttributeOnChange}
                key={uuid()}
                attribute={attribute}
              />
            ))}
          </div>
          {prices.map(
            (price) => price.currency.symbol === symbol && (
            <div key={uuid()}>
              <h4>Price:</h4>
              <h5>
                {price.currency.symbol}
                {price.amount}
              </h5>
            </div>
            ),
          )}
          <button
            className="add-to-cart-btn"
            type="button"
            onClick={this.handleAddToCArtOnClick}
          >
            ADD TO CART
          </button>
          <div>{parse(description)}</div>
        </div>
      </section>
    );
  }
}

const mapDispatchToProps = {
  addProductToCart,
};

export default connect(null, mapDispatchToProps)(Productdetails);
