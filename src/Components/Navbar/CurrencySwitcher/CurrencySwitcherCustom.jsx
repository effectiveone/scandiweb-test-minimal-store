import { Query } from "@apollo/client/react/components";
import React, { PureComponent } from "react";
import {QueryCurrencies} from '../../../GraphQL/Query/QueryCurrencies';
import "./CurrencySwitcherCustom.css";
import { BiChevronDown, BiChevronUp } from "react-icons/bi";
import { isDOMComponent } from "react-dom/test-utils";

export class CurrencySwitcherCustom extends PureComponent {
    constructor(props) {
        super(props);  
      }

      state = { isOpen: false,
    currentSymbol: "$",
        currentValue: "USD"
    }
 

      toggling = () => {
        this.setState({ isOpen: !this.state.isOpen });
      };
      
  render() {
    const {
        onChangeCurrency, symbol, numberOfItems, totalPrice,
      } = this.props;
      const isOpen = this.state.isOpen;
      const currentSymbol = this.state.currentSymbol;
      const currentValue = this.state.currentValue;


      

      const onOptionClicked = value => () => {
        this.setState({ currentSymbol: value.symbol })
        this.setState({ currentValue: value.label })

        this.setState({ isOpen: false })
        onChangeCurrency(value)
      };

    


    return (
  <div className="DropDownContainer">
    <div className="DropDownHeader" onClick={this.toggling}>{currentSymbol}{currentValue}   {!isOpen ? <BiChevronDown /> : <BiChevronUp />}</div>
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
                <li className="NavCurrencyItem"
                onClick={onOptionClicked(item)}
                
  key={index}>
   <div className="Attribute" >{item.symbol}</div>  
   <div className="Attribute">{item.label}</div>
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