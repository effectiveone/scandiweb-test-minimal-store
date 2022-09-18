import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Routes, useParams } from 'react-router';
import NavBar from '../Components/Navbar/NavBar';
import ProductListPage from '../Pages/ProductListPage';
import Cart from '../Pages/Cart';
import ProdctDescriptionPage from '../Pages/ProductDescriptionPage';
import NotFoundPage from '../Pages/NotFoundPage/NotFoundPage';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      symbol: localStorage.getItem('symbol') || '$',
    };
  }


  totalVat = () => {
    const { cart } = this.props;
    const { symbol } = this.state;
    let totalProducs = 0;
        let Vat = 0;
    let numberOfItemes = 0;
    cart.forEach((item) => {
      numberOfItemes += item.quantity;
      item.prices.forEach((price) => {
        if (price.currency.symbol === symbol) {
          Vat += price.amount * item.quantity;
          totalProducs += price.amount * item.quantity*1.23;
        }
      });
    });
    let totalVat =  totalProducs - Vat
    return [`${symbol}${totalVat.toFixed(2)}`, numberOfItemes];
  };

  totalPrice = () => {
    const { cart } = this.props;
    const { symbol } = this.state;
    let total = 0;
    let numberOfItems = 0;
    cart.forEach((item) => {
      numberOfItems += item.quantity;
      item.prices.forEach((price) => {
        if (price.currency.symbol === symbol) {
          total += price.amount * item.quantity*1.21;
        }
      });
    });
    return [`${symbol}${total.toFixed(2)}`, numberOfItems];
  };

  handleOnChange = (event) => {
    const { value } = event.target;
    this.setState({ symbol: value });
    localStorage.setItem('symbol', value);
  };

  handleCurrencyOnLoad = () => {
    const elem = document.querySelector('.currencies-select');
    elem.value = localStorage.getItem('symbol');
  };


  render() {
    const { cart } = this.props;
    const [totalVat, numberOfItemes] = this.totalVat();
    const [totalPrice, numberOfItems] = this.totalPrice();
    window.addEventListener('load', this.handleCurrencyOnLoad);
    const { symbol } = this.state;
    const ParamsWrapper = () => {
      const { productId } = useParams();
      return <ProdctDescriptionPage symbol={symbol} productId={productId} />;
    };
    return (
      <>
        <NavBar
          numberOfItems={numberOfItems}
          totalPrice={totalPrice}
          totalVat={totalVat}
          onChangeCurrency={this.handleOnChange}
          symbol={symbol}
        />
       
        <Routes>
          <Route element={<ProductListPage symbol={symbol} />} path="/" />
          <Route
            element={<ProductListPage symbol={symbol} category="tech" />}
            path="tech"
          />
          <Route
            element={<ProductListPage symbol={symbol} category="clothes" />}
            path="clothes"
          />
          <Route element={<ParamsWrapper />} path="/:productId" />
          <Route element={<ParamsWrapper />} path=":category/:productId" />
          <Route
            element={(
              <Cart
                cart={cart}
                symbol={symbol}
                numberOfItems={numberOfItems}
                totalPrice={totalPrice}
                totalVat={totalVat}
              />
            )}
            path="/Cart"
          />
                    <Route  path="/404" element={<NotFoundPage/>} />

        </Routes>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  const {
    cartReducer: { cart },
  } = state;
  return { cart };
};

export default connect(mapStateToProps, null)(App);
