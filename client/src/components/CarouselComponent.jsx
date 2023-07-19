import React from 'react'
import Carousel from 'react-bootstrap/Carousel';
import customCarouselStyles from '../styles/customCarouselStyles'; // Import the custom styles object


const CarouselComponent = () => {
  return (
    <Carousel style={customCarouselStyles.carousel}>
      <Carousel.Item style={customCarouselStyles.carouselItem}>
        <img
          className="d-block w-100"
          src="https://source.unsplash.com/random/?burger"
          alt="First slide"
          style={customCarouselStyles.carouselImage}
        />
        
      </Carousel.Item>
      <Carousel.Item style={customCarouselStyles.carouselItem}>
        <img
          className="d-block w-100"
          src="https://source.unsplash.com/random/?indianfood"
          alt="Second slide"
          style={customCarouselStyles.carouselImage}
        />
        
      </Carousel.Item>
      <Carousel.Item style={customCarouselStyles.carouselItem}>
        <img
          className="d-block w-100"
          src="https://source.unsplash.com/random/?pizza"
          alt="Third slide"
          style={customCarouselStyles.carouselImage}
        />
        
      </Carousel.Item>
    </Carousel>
  );
};

export default CarouselComponent;



