import PropTypes from 'prop-types';
import { PureComponent } from 'react';
import style from "./Slide.module.css"
import SliderArrows from './SliderArrows';
import SliderImage from './SliderImage/SliderImage.component';

export class Slider extends PureComponent {
  static propTypes = {
    images: PropTypes.arrayOf(PropTypes.string),
  };

  constructor(props) {
    super(props);
    this.state = {
      activeSlide: 0,
      translate: 0,
    };
    this.handleNextSlide = this.handleNextSlide.bind(this);
    this.handlePrevSlide = this.handlePrevSlide.bind(this);
  }

  handlePrevSlide() {
    const { images } = this.props;
    const widthSlide = 100 / images?.length;
    this.setState((state) => {
      return {
        activeSlide:
          state.activeSlide < images.length - 1 ? state.activeSlide + 1 : images.length - 1,
        translate:
          state.translate < 100 - widthSlide ? state.translate + widthSlide : 100 - widthSlide,
      };
    });
  }

  handleNextSlide() {
    const { images } = this.props;
    const widthSlide = 100 / images?.length;
    this.setState((state) => {
      return {
        activeSlide: state.translate > widthSlide ? state.activeSlide - 1 : 0,
        translate: state.translate > widthSlide ? state.translate - widthSlide : 0,
      };
    });
  }

  renderSlider() {
    const { images } = this.props;
    return (
      <div className={style.SliderElement}>
        <div className={style.SliderContent} 
        style={{transform: `translateX(${this.state.translate})`,
        width: `calc(100% * ${this.images?.length}})`
      }}>
          {images && images.length > 0
            ?  
            <SliderImage  content={images[`${this.state.activeSlide}`]} width={100 / images.length} />
            // images?.map((image, i) => (
            //     <SliderImage key={image + i} content={image} width={100 / images.length} />
            //   ))
            : 'No images to show'}
        </div>
      </div>
    );
  }

  render() {
    const { images } = this.props;
    const activeSlide = this.state.activeSlide;

    return (
      <div className={style.StyledSlider}>
        <div className={style.SliderContent}>{this.renderSlider()}</div>
        {images && images.length >= 2 && (
          <>
          <div style={{position: "relative", right: 0}}>
          {activeSlide !== images.length -1 && (
<div style={{position: "absolute", top: "-40px", right: "-25%"}}     >       <SliderArrows
              direction={'right'}
              opacity={activeSlide !== images.length - 1 ? 1 : 0}
              handleClick={this.handlePrevSlide}
            /></div>
            )}
            {activeSlide > 0 && (
              <div style={{position: "absolute", top: "-40px", right: "0"}}     >   
            <SliderArrows
              direction={'left'}
              opacity={activeSlide !== 0 ? 1 : 0}
              handleClick={this.handleNextSlide}
            /></div>
            )}
</div>
          </>
        )}
      </div>
    );
  }
}

export default Slider;
