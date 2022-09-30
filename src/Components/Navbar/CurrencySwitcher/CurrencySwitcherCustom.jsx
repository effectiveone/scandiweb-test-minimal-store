import { Query } from "@apollo/client/react/components";
import React, { PureComponent } from "react";
import {QueryCurrencies} from '../../../GraphQL/Query/QueryCurrencies';
import "./CurrencySwitcherCustom.css";
import { BiChevronDown, BiChevronUp } from "react-icons/bi";
import { isDOMComponent } from "react-dom/test-utils";

export class CurrencySwitcherCustom extends PureComponent {
    constructor(props) {
        super(props);  
        this.wrapperRef = React.createRef();
        this.handleClickOutside = this.handleClickOutside.bind(this);
      }

      state = { isOpen: false,
    currentSymbol: "$",
        currentValue: "USD",
        hovered: "-1"
    }
 
   
  

  componentDidMount() {
    document.addEventListener("mousedown", this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleClickOutside);
  }

  /**
   * Alert if clicked on outside of element
   */


     MouseEnter = (index) => {
      this.setState({hovered: index})
    }
     MouseLeave = () => {
      this.setState({hovered: -1})
    }

      toggling = () => {
        this.setState({ isOpen: !this.state.isOpen });
      };

      handleClickOutside(event) {
        if (this.wrapperRef && !this.wrapperRef.current.contains(event.target)) {
          this.setState({ isOpen: false });
        }}
      
  render() {
    const {
        onChangeCurrency, symbol, numberOfItems, totalPrice,
      } = this.props;
      const isOpen = this.state.isOpen;
      const currentSymbol = this.state.currentSymbol;
      const currentValue = this.state.currentValue;
      const hovered = this.state.hovered;

      

      const onOptionClicked = value => () => {
        this.setState({ currentSymbol: value.symbol })
        this.setState({ currentValue: value.label })

        this.setState({ isOpen: false })
        onChangeCurrency(value)
      };

    


    return (
  <div className="DropDownContainer" ref={this.wrapperRef}>
    <div className="DropDownHeader" onClick={this.toggling}>{currentSymbol}{"   "}
    {currentValue}   {!isOpen ? <BiChevronDown /> : <BiChevronUp />}</div>
        <Query query={QueryCurrencies}>
        {({ loading, error, data }) => {
          if (loading) return null;
          if (error) return console.log(error);
          if (data.currencies === undefined) return null;

          return (

            isOpen && (
                <div className="DropDownListContainer" >
                <div className="DropDownList">
               { data.currencies.map((item, index) => ( 
                <React.Fragment key={index}>
                  
                <li className="NavCurrencyItem" 
                              style={hovered === index ? {backgroundColor: '#f0f0f0', color: "black"} : {color: "black"}}
                              onMouseEnter={() => this.MouseEnter(index)} onMouseLeave={this.MouseLeave}
                onClick={onOptionClicked(item)}
                
  >
    <div className="Grid">
       <div className="Attribute" >{item.symbol}
 </div>  
   <div className="AttributeBis" >{item.label}
 </div>  </div>
  {/* //  <div className="Attribute" ></div>  */}
                </li></React.Fragment>
               
                ))}
                </div>
                </div>

           ) )
          
        }}
      </Query>

      </div>

    );
  }
}

export default CurrencySwitcherCustom;