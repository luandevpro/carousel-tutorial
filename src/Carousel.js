import React, { Component } from 'react'
import scrollTo from './scrollToAnimate';

export default class Carousel extends Component {
   constructor(props){
      super(props);
      this.handleLeftNav = this.handleLeftNav.bind(this);

   }
   handleLeftNav(e){
      console.log("ngng")
   }
   handleRightNav = (e) => {
      var {carouselViewport} = this.refs;
      console.log(carouselViewport)
      var numOfSlidesToScroll = 4;
      var widthToScroll = 328
      var newPos = carouselViewport.scrollLeft + widthToScroll * numOfSlidesToScroll;
      var timeToMoveOneSlide = 300;
      var totalTimeMove = numOfSlidesToScroll * timeToMoveOneSlide;
      scrollTo(carouselViewport, newPos , totalTimeMove ,"scrollLeft")
   }
  render() {
    return (
      <div className="carousel-container">
        <button 
            onClick={this.handleLeftNav} 
            className="carousel-left-nav carousel-nav">
            &#60;
         </button>
        <div 
            className="carousel-viewport" 
            ref="carouselViewport">
            {this.props.children}
         </div>
        <button onClick={this.handleRightNav} className="carousel-right-nav carousel-nav">&#62;</button>
      </div>
    )
  }
}
