import React, {  Component } from 'react';

import CarouselContainer from './CarouselContainer'
import Wrapper from './Wrapper'
import CarouselSlot from './CarouselSlot'
class Carousel extends Component {
  constructor(props){
    super(props)
    this.state = {
      position: 0,
      direction: 'next',
      sliding: false
    }
  }
  getOrder = (itemIndex) => {
    const { position } = this.state
    const { children } = this.props
    const numItems = children.length || 1
    if (itemIndex - position < 0) {
      return numItems - Math.abs(itemIndex - position)
    }
    return itemIndex - position
  }
  nextSlide = () => {
    const { position } = this.state
    const { children } = this.props
    const numItems = children.length || 1
    this.doSliding('next', position === numItems - 1 ? 0 : position + 1)
  }
  doSliding = (direction, position) => {
    this.setState({
      sliding: true,
      direction,
      position
    })
    setTimeout(() => {
      this.setState({
        sliding: false
      })
    }, 50)
  }
  render() {
    const { title, children } = this.props
  
    return (
      <div>
        <h2>{ title }</h2>
        <Wrapper>
          <CarouselContainer>
            { children.map((child, index) => (
              <CarouselSlot
                key={ index }
                order={ this.getOrder(index) }
              >
                {child}
              </CarouselSlot>
            )) }
          </CarouselContainer>
        </Wrapper>
        <button onClick={ () => this.nextSlide() }>Next</button>
      </div>
    )
  }
}
export default Carousel;