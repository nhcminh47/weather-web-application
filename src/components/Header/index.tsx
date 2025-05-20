import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '@store/hook';

const Header: React.FC<{ location?: string }> = () => {
  const navigate = useNavigate();
  const {location} = useAppSelector(state => state.home)
  return (
    <div className='main__header--inner'>
      <div className='main__header--location'>
        <FontAwesomeIcon icon={faMapMarkerAlt} />
        <span className='main__header--location-name'>{location?.label}</span>
      </div>
      <div className='main__header--btnSearch' onClick={()=> navigate('/search')}>
        <FontAwesomeIcon icon={faMagnifyingGlass} />
      </div>
    </div>
  )
}

export default Header
