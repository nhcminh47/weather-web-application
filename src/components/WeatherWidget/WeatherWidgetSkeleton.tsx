import React from 'react';
import '@scss/components/_weatherWidgetSkeleton.scss'; // Styles below

const WeatherWidgetSkeleton: React.FC = () => {
  return (
    <div className='weatherWidget__wrapper'>
      <div className='skeleton skeleton-date'></div>

      <div className='weatherWidget__summary'>
        <div className='weatherWidget__summary--temperature'>
          <div className='skeleton skeleton-icon'></div>
          <div className='info'>
            <div className='skeleton skeleton-temp'></div>
            <div className='skeleton skeleton-status'></div>
          </div>
        </div>

        <div className='weatherWidget__summary--other'>
          {[...Array(3)].map((_, idx) => (
            <div className='block' key={idx}>
              <span className='text skeleton skeleton-label'></span>
              <span className='meter skeleton skeleton-value'></span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WeatherWidgetSkeleton;
