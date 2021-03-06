import React, { Component } from 'react'
import Carousel from '../components/Carousel';
import Slide from "../components/Slide"
import data from "./../data.json"

export default class CarouselContainer extends Component {
   showCarousel = (data)  => {
      return data.map((state)=>{
        return (
          <Slide
            name={state.name}
            key={state.abbreviation}
          />
        );
      })}
  
  render() {
    return (
      <Carousel>
         {this.showCarousel(data)}
      </Carousel>
    )
  }
}
