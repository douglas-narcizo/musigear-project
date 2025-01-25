// Import necessary modules
import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import './Carousel.css';

/*rgba(0, 0, 0, 0.05)*/
const CustomIconButton = styled(IconButton)(({ theme }) => ({
  backgroundColor: 'background',
  border: '1px solid rgba(0, 0, 0, 0.2)',
  '&:hover': {
    backgroundColor:'background',
    border: '1px solid rgba(0, 0, 0, 0.4)',
    boxShadow: '0px 3px 6px rgba(0, 0, 0, 0.3)'
  },
}));

const Carousel = ({children, itemsToShow=3}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
//  const rem = parseInt(getComputedStyle(document.documentElement).fontSize);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => Math.min(prevIndex + itemsToShow, children.length - itemsToShow));
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => Math.max(prevIndex - itemsToShow, 0));
  };

  const prevButton = (
    <CustomIconButton size='large' className='carousel-button' onClick={prevSlide}
      sx={{ position: 'absolute', top: '43%', left: 0, zIndex: 5, transform: 'translateX(-85%) scale(1.4)' }}
    >
      <ChevronLeftIcon />
    </CustomIconButton>
  )
  const nextButton = (
    <CustomIconButton size='large' className='carousel-button' onClick={nextSlide}
      sx={{ position: 'absolute', top: '43%', right: 0, zIndex: 5, transform: 'translateX(60%) scale(1.4)' }}
    >
      <ChevronRightIcon />
    </CustomIconButton>
  )

  return (
    <div className='carousel-container' style={{width: itemsToShow * 280 }}>

      {currentIndex > 0 ? prevButton : ''}
        
      <div className='carousel-wrapper'>
        <div
          className='carousel-inner'
          style={{
            transform: `translateX(${((100 / itemsToShow) * currentIndex) * -1 + 0.1}%)`,
            transition: 'transform 0.3s ease-in-out'
          }}
        >
          {children}
        </div>
      </div>

      {currentIndex < children.length - itemsToShow ? nextButton : ''}

    </div>
  );
};

export default Carousel;
