// SmoothScroll.js
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const SmoothScroll = ({ children }) => {
  const wrapperRef = useRef(null);
  const contentRef = useRef(null);
  const smootherRef = useRef(null);

  useEffect(() => {
    // Load ScrollSmoother from the global window object
    const { ScrollSmoother } = window;
    if (ScrollSmoother) {
      smootherRef.current = ScrollSmoother.create({
        wrapper: wrapperRef.current,
        content: contentRef.current,
        smooth: 2, // Adjust this value for scroll speed
        effects: true,
      });
    }

    return () => {
      // Clean up the ScrollSmoother instance on unmount
      if (smootherRef.current) {
        smootherRef.current.kill();
      }
    };
  }, []);

  return (
    <div ref={wrapperRef} id="wrapper">
      <div ref={contentRef} id="content">
        {children}
      </div>
    </div>
  );
};

export default SmoothScroll;
