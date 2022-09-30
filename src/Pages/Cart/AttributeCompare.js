import React, { Component } from 'react'
import checked from '../../Assets/checked.png';
import "./AttributeCompare.style.css"


export default class AttributeCompare extends Component {
  constructor(props) {
    super(props);
    const {  cartOverlay
    } = this.props

    console.log("Card", cartOverlay)
  }

  
  render() {

    const {
       attributes: { items, name },
       selectedAttributes,
       selectAttribute = () => {},
       isCartPage = false,
       itemCardID,
       changeAttributes
    } = this.props;



    return (
      <div>
      <h4>
        {this.props.attributes.name}


      </h4>
      <ul>
      <li className="items-container-attribute">
      {this.props.attributes?.items.map((item) => {
        const propsChecker =  this.props.selectedAttributes.find(p =>
          p.name === 'Color' ?
  (
          p.name === this.props.attributes.name
          &&  p.value === item.id ) : (
          p.name === this.props.attributes.name
          &&  p.value === item.value)
          )
        return (this.props.attributes?.name === 'Color' ? (

          <label
            htmlFor={item.id}
            key={item.id}
            className="color-radio-btns"

            style={{ backgroundColor: `${item.value}`,
            }}

          >
            <input
              className="color-radio-btn"
             
              type="radio"
              id={item.id}
              style={{ backgroundColor: `${item.value}`,
              
            }}
              checked={ propsChecker }
             
              name={item.value}
              value={item.id}
              onChange={() => changeAttributes(itemCardID, {   
                name: this.props.attributes?.name,
             value:   item.value}) }
            />
            <img src={checked} alt="checkmark" className="checkmark" />
            <span />
          </label>
        ) : (
          <label key={item.id} className="other-radio-btns"
        
        >
            <input
              className="other-radio-btn"
             
              type="radio"
              id={item.name}
            checked={ propsChecker }
          
              // checked={item.value === this.props.selectedAttributes[0].value}
              name={item.name}
              value={item.value}
              onChange={() => changeAttributes(itemCardID, {
                name: this.props.attributes?.name,
                value:   item.value})
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

