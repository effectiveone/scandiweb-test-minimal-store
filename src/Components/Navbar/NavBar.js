import React, { Component } from 'react';
import cartIcon from '../../Assets/cartIcon.svg';
import CartOverlay from '../CartOverlay/CartOverlay';
import './NavBar.style.css';
import Logo from './Logo';
import CurrencySwitcherCustom from "./CurrencySwitcher/CurrencySwitcherCustom";
import CategorySwitcher from "./CategorySwitcher/CategorySwitcher";


class NavBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: false,
    };
  }

  setIsOpen = () => {
    this.setState({ isOpen: false });
  };

  render() {
    const { isOpen } = this.state;
    const {
      onChangeCurrency, symbol, numberOfItems, totalPrice, totalVat
    } = this.props;
    return (
      <header>
  

        <CategorySwitcher
        />
     
        <div className="logo">
          <Logo/>
        </div>
        <div className="currencies-cart-and-container">
       
<CurrencySwitcherCustom onChangeCurrency={onChangeCurrency}
/>

          <button
            onClick={() => (isOpen
              ? this.setState({ isOpen: false })
              : this.setState({ isOpen: true }))}
            className="cart-btn"
            type="button"
          >
            <img src={cartIcon} alt="cart icon" />
            <span>{numberOfItems}</span>
          </button>
          {isOpen && (
          <CartOverlay
            totalPrice={totalPrice}
            totalVat={totalVat}
            numberOfItems={numberOfItems}
            symbol={symbol}
            setIsOpen={this.setIsOpen}
          />
          )}
        </div>
      </header>
    );
  }
}

export default NavBar

