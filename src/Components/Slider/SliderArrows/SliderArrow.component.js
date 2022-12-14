import PropTypes from 'prop-types';
import { PureComponent } from 'react';
import style from "./SlideArrow.module.css";

export class SliderArrow extends PureComponent {
  static propTypes = {
    handleClick: PropTypes.func.isRequired,
    direction: PropTypes.string.isRequired,
    opacity: PropTypes.number,
  };

  renderArrowRight() {
    return (
      <svg
        width="5.63"
        height="11.24"
        viewBox="0 0 8 14"
        fill="none"
        xmlns="http://www.w3.org/2000/svg">
        <path
          d="M1 13L7 7L1 1"
          stroke="#fff"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  renderArrowLeft() {
    return (
      <svg
        width="5.63"
        height="11.24"
        viewBox="0 0 8 14"
        fill="none"
        xmlns="http://www.w3.org/2000/svg">
        <path
          d="M7 13L1 7L7 1"
          stroke="#fff"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  render() {
    const { handleClick, direction, opacity } = this.props;
    return (
        <div className={style.ArrowWrapper} 
        style={{left: this.direction === 'left' ?  '128px' : '160px', opacity: `${this.opacity}`}}
onClick={() => handleClick()}>
          {direction === 'left' ? this.renderArrowLeft() : this.renderArrowRight()}
        </div>
    );
  }
}

export default SliderArrow;
