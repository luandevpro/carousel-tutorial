import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import CarouselContainer from "./containers/CarouselContainer";
import "./components/Carousel.css";
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<CarouselContainer />, document.getElementById('root'));
registerServiceWorker();
