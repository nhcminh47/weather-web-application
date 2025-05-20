import { Card } from '@components/Card'
import { faMagnifyingGlass, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useAppDispatch } from '@store/hook'
import { setLocationData } from '@store/slices/home'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import type { LocationApiResponse } from 'types/weather'

const HistoryBox: React.FC = () => {
  const storageData = localStorage.getItem('searchHistory')
  const [seacrhHistory, setSearchHistory] = useState<LocationApiResponse[]>(storageData ? JSON.parse(storageData) : [])
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const handleSearchClick = (location: LocationApiResponse) => {
    dispatch(setLocationData(location))
    navigate('/')
  }
  const handleDeleteHistory = (index: number) => {
    const newHistory = seacrhHistory.filter((_item, idx) => idx !== index)
    setSearchHistory(newHistory)
    localStorage.setItem('searchHistory', JSON.stringify(newHistory))
  }

  const RenderComponent: React.FC = () => {
    return (
      <>
        {seacrhHistory.length > 0
          ? seacrhHistory.map((history, index) => (
              <li key={index} className='historybox__item'>
                <div className='historybox__item--detail'>
                  <span className='location'>{history.label}</span>
                  <div className='icon'>
                    <span onClick={() => handleSearchClick(history)}>
                      <FontAwesomeIcon icon={faMagnifyingGlass} />
                    </span>
                    <span onClick={() => handleDeleteHistory(index)}>
                      <FontAwesomeIcon icon={faTrash} />
                    </span>
                  </div>
                </div>
              </li>
            ))
          : 'There is no history'}
      </>
    )
  }
  return (
    <>
      <div className='historybox__title'>Search History</div>
      <Card>
        <ul className='historybox__wrapper'>
          <RenderComponent />
        </ul>
      </Card>
    </>
  )
}

export default HistoryBox
