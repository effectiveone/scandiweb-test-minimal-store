import { Query } from "@apollo/client/react/components";
import React, { PureComponent } from "react";
import {QueryCurrencies} from '../../../GraphQL/Query/QueryCurrencies';
import "./CurrencySwitcherCustom.css";

export class CurrencySwitcherCustom extends PureComponent {
    constructor(props) {
        super(props);  
      }

      state = { isOpen: false };

      toggling = () => {
        this.setState({ isOpen: !this.state.isOpen });
      };
      
  render() {
    const {
        onChangeCurrency, symbol, numberOfItems, totalPrice,
      } = this.props;
      const isOpen = this.state.isOpen;

      const onOptionClicked = value => () => {
        this.setState({ isOpen: false })
        onChangeCurrency(value)
      };

    


    return (
  <div className="DropDownContainer">
    <div className="DropDownHeader" onClick={this.toggling}>Name</div>
        <Query query={QueryCurrencies}>
        {({ loading, error, data }) => {
          if (loading) return null;
          if (error) return console.log(error);
          if (data.currencies === undefined) return null;

          return (

            isOpen && (
                <div className="DropDownListContainer">
                <ul className="DropDownList">
               { data.currencies.map((item, index) => ( 
                <li className="ListItem"
                onClick={onOptionClicked(item)}
                
  key={index}>
    {item.symbol} {item.label}

                </li>
               
                ))}
                </ul>
                </div>

           ) )
          
        }}
      </Query>

      </div>

    );
  }
}

export default CurrencySwitcherCustom;