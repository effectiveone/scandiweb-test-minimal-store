import PropTypes from 'prop-types';
import { PureComponent } from 'react';
import style from "./SlideImage.module.css";


export class SliderImage extends PureComponent {
  static propTypes = {
    content: PropTypes.string.isRequired,
    width: PropTypes.number.isRequired,
  };

  render() {
    const { content, width } = this.props;
    return (
      <div className={style.ImageWrapper} width={width}>
        <img className={style.SliderImageComponent} style={{width: `${this.width}`}} alt="slider" src={content} />
      </div>
    );
  }
}

export default SliderImage;
