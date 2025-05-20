import React from 'react';
import '@scss/components/_weatherForecastSkeleton.scss'; // styles below

const WeatherForecastSkeleton: React.FC = () => {
  return (
    <div className='weatherForecast__wrapper'>
      <div className='weatherForecast__daily'>
        {[...Array(3)].map((_, dateIdx) => (
          <React.Fragment key={dateIdx}>
            <div className='skeleton skeleton-date'></div>
            {[...Array(4)].map((_, hourIdx) => (
              <div className='weatherForecast__daily--timeline skeleton-timeline' key={hourIdx}>
                <div className='skeleton skeleton-time'></div>
                <div className='skeleton skeleton-temp'></div>
                <div className='skeleton skeleton-desc'></div>
              </div>
            ))}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default WeatherForecastSkeleton;
