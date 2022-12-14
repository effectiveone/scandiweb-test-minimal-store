import React, { Component }from 'react';
import { BsCheck2Circle } from "react-icons/bs";
import './ProductAttribute.style.css';
import uuid from 'react-uuid';


class Productattribute extends Component {

  render() {
    const {
      attribute, handleAttributeOnChange
    } = this.props;

return (


  <div>
    <h4>
      {attribute.name}
      :
    </h4>
    <ul>
      <li className="items-container-attribute">
        {attribute?.items.map((item) => (attribute.name === 'Color' ? (
          <label
            htmlFor={item.id}
            key={uuid()}
            style={{ backgroundColor: `${item.value}` }}
            className="color-radio-btns"
          >
            <input
              className="color-radio-btn"
              type="radio"
              id={item.id}
              name={attribute.name}
              value={item.id}
              onChange={handleAttributeOnChange}
            />
  <div className="checkmark">
            <BsCheck2Circle size="1em" fill="rgb(255,255,255)"/>
            </div>
                        <span />
          </label>
        ) : (
          <label key={uuid()} className="other-radio-btns">
            <input
              className="other-radio-btn"
              type="radio"
              id={attribute.name}
              name={attribute.name}
              value={item.value}
              onChange={handleAttributeOnChange}
            />
            <span className="other-checkmark">{item.value}</span>
          </label>
        )))}
      </li>
    </ul>
  </div>
)}}
export default Productattribute;
