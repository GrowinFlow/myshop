import React, { useState, useEffect, useRef } from 'react';
import { FaAngleRight, FaAngleLeft } from 'react-icons/fa6';



function SliderGallery() {
  const slides = [
    "https://flowbite.s3.amazonaws.com/docs/gallery/square/image-1.jpg",
    "https://flowbite.s3.amazonaws.com/docs/gallery/square/image-2.jpg",
    "https://flowbite.s3.amazonaws.com/docs/gallery/square/image-3.jpg",
    "https://flowbite.s3.amazonaws.com/docs/gallery/square/image-4.jpg",
    "https://flowbite.s3.amazonaws.com/docs/gallery/square/image-5.jpg"
  ];

  const [currentIndex, setCurrentIndex] = useState(1); // Start at the first real slide
  const [isTransitioning, setIsTransitioning] = useState(true);
  const slideRef = useRef(null);

  const totalSlides = slides.length;

  // Function to go to the next slide
  const nextSlide = () => {
    setCurrentIndex((prevIndex) => prevIndex + 1);
    setIsTransitioning(true);
  };

  // Function to go to the previous slide
  const prevSlide = () => {
    setCurrentIndex((prevIndex) => prevIndex - 1);
    setIsTransitioning(true);
  };

  // Set up the interval to auto slide every 2 seconds
  useEffect(() => {
    const intervalId = setInterval(() => {
      nextSlide();
    }, 2000); // 2000ms = 2 seconds

    // Cleanup the interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  // Effect to handle the seamless loop transition
  useEffect(() => {
    const handleTransitionEnd = () => {
      if (currentIndex === totalSlides + 1) {
        // Jump to the first real slide without transition
        setIsTransitioning(false);
        setCurrentIndex(1);
      } else if (currentIndex === 0) {
        // Jump to the last real slide without transition
        setIsTransitioning(false);
        setCurrentIndex(totalSlides);
      }
    };

    const node = slideRef.current;
    if (node) {
      node.addEventListener('transitionend', handleTransitionEnd);
    }

    // Cleanup the event listener on component unmount
    return () => {
      if (node) {
        node.removeEventListener('transitionend', handleTransitionEnd);
      }
    };
  }, [currentIndex, totalSlides]);

  // Reset transition after the jump to a real slide to prevent visual jump
  useEffect(() => {
    if (!isTransitioning) {
      const timeoutId = setTimeout(() => {
        setIsTransitioning(true);
      }, 50); // Restore transition after a short delay to make the jump invisible
      return () => clearTimeout(timeoutId);
    }
  }, [isTransitioning]);

  return (
    <div id="gallery" className="relative w-full overflow-hidden" data-carousel="slide">
      <div
        className={`flex ${isTransitioning ? 'transition-transform duration-700 ease-in-out' : ''}`}
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        ref={slideRef}
      >
        {/* Cloned last slide at the start */}
        <div className="w-full flex-shrink-0  rounded-lg overflow-hidden">
          <img
            src={slides[slides.length - 1]}
            className="block w-full h-auto object-cover  rounded-lg overflow-hidden"
            alt={`Slide ${slides.length}`}
          />
        </div>
        
        {slides.map((slide, index) => (
          <div
            key={index}
            className="w-full flex-shrink-0 rounded-lg overflow-hidden shadow-lg"
          >
            <img
              src={slide}
              className="block w-full h-auto object-cover  rounded-lg overflow-hidden"
              alt={`Slide ${index + 1}`}
            />
          </div>
        ))}

        {/* Cloned first slide at the end */}
        <div className="w-full flex-shrink-0 rounded-lg overflow-hidden">
          <img
            src={slides[0]}
            className="block w-full h-auto object-cover rounded-lg overflow-hidden"
            alt={`Slide 1`}
          />
        </div>
      </div>

      <button
        type="button"
        className="absolute top-0 left-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
        onClick={prevSlide}
        data-carousel-prev
      >
        <span className="inline-flex items-center justify-center w-8 h-8 rounded-full themeGlassBg backdrop-blur-sm group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
        <FaAngleLeft className='themeText'/>
          <span className="sr-only">Previous</span>
        </span>
      </button>

      <button
        type="button"
        className="absolute top-0 right-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
        onClick={nextSlide}
        data-carousel-next
      >
        <span className="inline-flex items-center justify-center w-8 h-8 themeIconBg rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
       <FaAngleRight className='themeText'/>
          <span className="sr-only">Next</span>
        </span>
      </button>
    </div>
  );
}

export default SliderGallery;
