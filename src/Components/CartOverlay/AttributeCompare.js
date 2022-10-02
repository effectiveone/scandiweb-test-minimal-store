import React, { Component } from 'react'
import "./AttributeCompare.style.css"
import { BsCheck2Circle } from "react-icons/bs";

export default class AttributeCompare extends Component {
  constructor(props) {
    super(props);
    const {  cartOverlay
    } = this.props

  }

  
  render() {

    const {
       attributes: { items, name },
       selectedAttributes,
       selectAttribute = () => {},
       isCartPage = false,
       itemCardID,
       productName,
       changeAttributes, 
       
    } = this.props;



    return (
      <div>
      <h4>
        {this.props.attributes.name}

      </h4>
      <ul>
      <li className="items-container-attributes">
      {this.props.attributes?.items.map((item, index) => {

       const propsChecker =  this.props.selectedAttributes.find(p =>{

   if(p.name !== this.props.attributes.name ) {return} 
        return(
          

        p.name === 'Color' ?
(
        p.name === this.props.attributes.name
        &&  p.value === item.id  ||  p.value === item.value) : (
        p.name === this.props.attributes.name
        &&  p.id === item.value || p.value === item.id )
       )})
        return (this.props.attributes?.name === 'Color' ? (

          <label
            // htmlFor={item.id}
            key={index}
            className="color-radio-btnss"

            style={{ backgroundColor: `${item.value}`,
            }}

          >
            <input
              className="color-radio-btnss"
              checked={ propsChecker }
             
              type="radio"
              id={item.id}
              style={{ backgroundColor: `${item.value}`}}
              name={item.value}
              value={item.id}

              onChange={() => changeAttributes(productName, {
                name: this.props.attributes?.name,
                value:   item.value}, itemCardID)
              }
            />
            <div className="checkmark">
            <BsCheck2Circle size="12em" fill="rgb(255,255,255)"/>
            </div>
       
            <span />
          </label>
        ) : (
          <label key={item.id} className="other-radio-btnss"
        
          >
              <input
                className="other-radio-btn"
               
                type="radio"
                id={item.name}
              checked={ propsChecker }
            
                // checked={item.value === this.props.selectedAttributes[0].value}
                name={item.name}
                value={item.value}

                onChange={() => changeAttributes(productName, {
                  name: this.props.attributes?.name,
                  value:   item.value}, itemCardID)
                     }            />
              <span className="other-checkmark">{item.value}</span>
            </label>)
        )}
        )}
      </li>
    </ul>
    </div>
    );
 }
}

