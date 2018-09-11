import React, { Component } from 'react';
import styled from 'styled-components'
import Carousel from './DemoCarousel'

const Item = styled.div`
  background: darkorange;
  text-align: center;
  padding: 50px;
  color: white;
`
export default class CarouselPage extends Component {
  render() {
    return (
      <div>
        <Carousel
          title="Carousel"
        >
          <Item>Item 1</Item>
          <Item>Item 2</Item>
          <Item>Item 3</Item>
          <Item>Item 4</Item>
        </Carousel>
      </div>
    );
  }
}