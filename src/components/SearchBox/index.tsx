import { useAppDispatch } from '@store/hook'
import { useLazyGetLocationsByQueryQuery } from '@store/services/locationApi'
import { setLocationData } from '@store/slices/home'
import { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import type { LocationApiResponse } from 'types/weather'

const SearchBox: React.FC = () => {
  const inputRef = useRef(null)
  const [trigger, result] = useLazyGetLocationsByQueryQuery()
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const handleSearch = () => {
    const { value } = inputRef.current!
    if (value === '') return
    trigger({ query: value })
  }
  const handleEnterPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const { value } = e.currentTarget
    if (e.key === 'Enter') {
      trigger({ query: value })
    }
  }
  useEffect(() => {
    if (result && result.data && result.data.length > 0) {
      saveHistory(result.data[0])
      dispatch(setLocationData(result.data[0]))
      navigate('/')
    }
  }, [result])
  const saveHistory = (newLocation: LocationApiResponse) => {
    const storedData = localStorage.getItem('searchHistory')
    const history = storedData ? JSON.parse(storedData) : []
    history.push(newLocation)
    localStorage.setItem('searchHistory', JSON.stringify(history))
  }
  return (
    <div className='searchbox__wrapper'>
      <div className='searchbox__content'>
        <input
          className='searchbox__content--input'
          type='text'
          placeholder='Search country or city here...'
          ref={inputRef}
          onKeyUp={handleEnterPress}
        />
        <button className='searchbox__content--btn' onClick={handleSearch}>
          Search
        </button>
        {result.data?.length === 0 && <p className='searchbox__content--errMsg'>Invalid country or city</p>}
      </div>
    </div>
  )
}

export default SearchBox
