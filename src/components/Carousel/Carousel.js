// Import necessary modules
import React, { useState, useRef, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import './Carousel.css';

const CustomIconButton = styled(IconButton)(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
  border: '1px solid rgba(0, 0, 0, 0.1)',
  '&:hover': {
    color: theme.palette.primary.main,
    backgroundColor:'background',
    border: '1px solid rgba(0, 0, 0, 0.2)',
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.2)'
  },
}));

const Carousel = ({children, carouselItemsToShow=2}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const carouselWrapperRef = useRef(null);
  const itemWidth = children[0]?.props?.style?.width || 276; // Default to 276 if width is not defined

  const nextSlide = () => {
    if (carouselWrapperRef.current) {
      carouselWrapperRef.current.scrollBy({ left: itemWidth * carouselItemsToShow, behavior: 'smooth' });
    }
  };

  const prevSlide = () => {
    if (carouselWrapperRef.current) {
      carouselWrapperRef.current.scrollBy({ left: -itemWidth * carouselItemsToShow, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      if (carouselWrapperRef.current) {
        const scrollLeft = carouselWrapperRef.current.scrollLeft;
        const itemWidth = carouselWrapperRef.current.scrollWidth / children.length;
        const newIndex = Math.round(scrollLeft / itemWidth);
        setCurrentIndex(newIndex);
      }
    };

    const carouselWrapper = carouselWrapperRef.current;
    if (carouselWrapper) {
      carouselWrapper.addEventListener('scroll', handleScroll);
    }

    return () => {
      if (carouselWrapper) {
        carouselWrapper.removeEventListener('scroll', handleScroll);
      }
    };
  }, [children, carouselItemsToShow]);

  const hasRightOverflow = () => {
    if (carouselWrapperRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = carouselWrapperRef.current;
      return scrollLeft + clientWidth + 60 < scrollWidth;
    }
    return false;
  };

  const prevButton = (
    <CustomIconButton size='large' className='carousel-button' onClick={prevSlide}
      sx={{ position: 'absolute', top: '43%', left: 0, zIndex: 5, transform: 'translateX(-20%) scale(1.4)' }}
    >
      <ChevronLeftIcon />
    </CustomIconButton>
  )
  
  const nextButton = (
    <CustomIconButton size='large' className='carousel-button' onClick={nextSlide}
      sx={{ position: 'absolute', top: '43%', right: 0, zIndex: 5, transform: 'translateX(20%) scale(1.4)' }}
    >
      <ChevronRightIcon />
    </CustomIconButton>
  )

  return (
    <Container className='carousel-container' maxWidth='xl' sx={{ position: 'relative', mx: 0 }}>

      {currentIndex > 0 ? prevButton : ''}

      <div className="carousel-wrapper" ref={carouselWrapperRef}>
        <div className='carousel-inner'>
          {children}
        </div>
      </div>

      {hasRightOverflow() ? nextButton : ''}

    </Container>
  );
};

export default Carousel;
