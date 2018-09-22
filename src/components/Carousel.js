import React, { Component } from 'react'
import classNames from "classnames";
import scrollTo from "./scrollToAnimate";
import throttle from "lodash.throttle";

export default class Carousel extends Component {
   constructor(props){
      super(props);
      this.handleLeftNav  = this.handleLeftNav.bind(this);
      this.handleRightNav = this.handleRightNav.bind(this);
      this.throttleRezise = throttle(this.onResize , 250);
      this.throttleScroll = throttle(this.onScrollLeft , 250);
      this.animatingLeft = false;
      this.animatingRight = false;
      this.state = {
        numOfSlidesToScroll: 4,
        allTheWayLeft: false,
        allTheWayRight: false,
      };
   }

  componentDidMount() {
    this.onResize();
    this.onScrollLeft();
    window.addEventListener("resize", this.throttleRezise);
    window.addEventListener('keydown', this.onKeydown);
  }
  componentWillMount(){
    window.removeEventListener("resize" , this.throttleRezise);
    window.removeEventListener('keydown', this.onKeydown)
  }
  onResize = () => {
    let numOfSlidesToScroll ;
    if(window.innerWidth <= 900){
      numOfSlidesToScroll = "full";
    }else {
      numOfSlidesToScroll = 4;
    }
    if(this.state.numOfSlidesToScroll !== numOfSlidesToScroll){
      console.log("throttle")
      this.setState({
        numOfSlidesToScroll
      })
    }
  }
  onScrollLeft = (e) => {
    var {carouselViewport} = this.refs;
    console.log("scroll left")
    let allTheWayLeft;
    if(carouselViewport.scrollLeft === 0){
      allTheWayLeft = true;
    }
    let allTheWayRight = false;
    var amountScrolled = carouselViewport.scrollLeft;
    var viewportLength = carouselViewport.clientWidth;
    var totalWidthOfCarousel = carouselViewport.scrollWidth;
    // console.log('scrolling', totalWidthOfCarousel, amountScrolled + viewportLength, amountScrolled );
    if ( amountScrolled + viewportLength === totalWidthOfCarousel ) {
      allTheWayRight = true;
    } 
    if(this.state.allTheWayLeft !== allTheWayLeft || this.state.allTheWayRight !== allTheWayRight){
      this.setState({
        allTheWayLeft,
        allTheWayRight
      })
    }
  }
  onKeydown = (e) => {
    console.log(e.keyCode);
    const { keyCode } = e;
    var leftArrow = keyCode === 37;
    var rightArrow = keyCode === 39;
    var animatingRight = this.animatingRight;
    if ( leftArrow && !this.state.allTheWayLeft ) {
      if ( !this.animatingLeft ) {
        this.animatingLeft = true;
        this.handleLeftNav().then(()=>{
          this.animatingLeft = false;
        });
      }
    } else if ( rightArrow && !this.state.allTheWayRight ) {
      if ( !this.animatingRight ) {
        this.animatingRight = true;
        this.handleRightNav().then(()=>{
          this.animatingRight = false;
        });
      }
    }

  }
  widthAndTimeToScroll = () => {
    var  { carouselViewport } = this.refs;
    let {numOfSlidesToScroll} = this.state;
    if(numOfSlidesToScroll === "full"){
      return {
        widthOfSlide: carouselViewport.offsetWidth,
        timeToMoveSlide: 400
      }
    }else {
      let widthOfSlide = 219;
      let timeToMoveSlide = 200;
      return {
        widthOfSlide: widthOfSlide*numOfSlidesToScroll,
        timeToMoveSlide: Math.min( (timeToMoveSlide*numOfSlidesToScroll) , 600),
      }
    }
  }

   handleLeftNav(e){
    var  { carouselViewport } = this.refs;
    var {widthOfSlide ,timeToMoveSlide} = this.widthAndTimeToScroll();
    let newPos = carouselViewport.scrollLeft - widthOfSlide
    return scrollTo({
      element:carouselViewport, 
      to:newPos , 
      duration:timeToMoveSlide , 
      scrollDirection:"scrollLeft",
      callback: this.onScrollLeft,
      context: this
    })
   }
   handleRightNav(e){
    var  { carouselViewport } = this.refs;
    var {widthOfSlide ,timeToMoveSlide} = this.widthAndTimeToScroll();
    let newPos = carouselViewport.scrollLeft + widthOfSlide;
    var promise = scrollTo({
      element:carouselViewport, 
      to:newPos , 
      duration:timeToMoveSlide , 
      scrollDirection:"scrollLeft",
      callback: this.onScrollLeft,
      context: this
    })
    return promise;
  }
  render() {
    var carouselNav = classNames({
      "carousel-nav": true
    })
    var carouselLeftNav = classNames({
      "carousel-left-nav": true,
      "carousel-nav-disabled": this.state.allTheWayLeft
    }, carouselNav)
    var carouselRightNav = classNames({
      "carousel-right-nav": true,
      "carousel-nav-disabled": this.state.allTheWayRight
    }, carouselNav)
    return (
      <div className="carousel-container">
      
        <button 
            onClick={this.handleLeftNav} 
            className={carouselLeftNav}>
            &#60;
         </button>
        <div 
            className="carousel-viewport" 
            onScroll={this.throttleScroll}
            ref="carouselViewport">
            {this.props.children}
         </div>
        <button onClick={this.handleRightNav} className={carouselRightNav}>&#62;</button>
      </div>
    )
  }
}
