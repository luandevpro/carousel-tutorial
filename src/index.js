import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import CarouselContainer from "./containers/CarouselContainer"

import "./Carousel.css"
ReactDOM.render(<CarouselContainer />, document.getElementById('root'));
registerServiceWorker();
