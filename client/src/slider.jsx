import React, { useEffect, useRef } from 'react';
import Glide from '@glidejs/glide';
import '@glidejs/glide/dist/css/glide.core.min.css';
import '@glidejs/glide/dist/css/glide.theme.min.css';

const Slider = ({ children, options = {} }) => {
  const sliderRef = useRef(null);
  const glideRef = useRef(null);

  useEffect(() => {
    if (sliderRef.current) {
      // Default options
      const defaultOptions = {
        type: 'carousel',
        startAt: 0,
        perView: 3,
        gap: 20,
        breakpoints: {
          1024: { perView: 2 },
          600: { perView: 1 }
        }
      };

      // Initialize Glide
      glideRef.current = new Glide(sliderRef.current, {
        ...defaultOptions,
        ...options
      });

      glideRef.current.mount();

      // Cleanup
      return () => {
        if (glideRef.current) {
          glideRef.current.destroy();
        }
      };
    }
  }, [options]);

  return (
    <div className="glide" ref={sliderRef}>
      <div className="glide__track" data-glide-el="track">
        <ul className="glide__slides">
          {React.Children.map(children, (child, index) => (
            <li className="glide__slide" key={index}>
              {child}
            </li>
          ))}
        </ul>
      </div>

      {/* Navigation arrows */}
      <div className="glide__arrows" data-glide-el="controls">
        <button className="glide__arrow glide__arrow--left" data-glide-dir="<">
          ←
        </button>
        <button className="glide__arrow glide__arrow--right" data-glide-dir=">">
          →
        </button>
      </div>

      {/* Bullet navigation */}
      <div className="glide__bullets" data-glide-el="controls[nav]">
        {React.Children.map(children, (_, index) => (
          <button
            className="glide__bullet"
            data-glide-dir={`=${index}`}
            key={index}
          />
        ))}
      </div>
    </div>
  );
};

export default Slider;