import { Query } from "@apollo/client/react/components";
import React, { PureComponent } from "react";
import {QueryCurrencies} from '../../../GraphQL/Query/QueryCurrencies';
import "./CurrencySwitcher.css";

export class CurrencySwitcher extends PureComponent {
    constructor(props) {
        super(props);  
      }
  render() {
    const {
        onChangeCurrency, symbol, numberOfItems, totalPrice,
      } = this.props;
    return (
        <select
        className="currency__details"
        style={{width: '100%'}}
        onChange={onChangeCurrency}
      >
      <Query query={QueryCurrencies}>
        {({ loading, error, data }) => {
          if (loading) return null;
          if (error) return console.log(error);
          if (data.currencies === undefined) return null;

          return data.currencies.map((item, index) => (
            <option 
            onChange={onChangeCurrency}

                //  <option    onChange={() => {
                //     this.props.onChangeCurrency(item.symbol);
                    // window.location.reload(false);
                //   }}   
                key={index} value={item.symbol}>{item.symbol} {item.label}</option>     
          ));
        }}
      </Query>
      </select>

    );
  }
}

export default CurrencySwitcher;