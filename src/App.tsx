import './scss/main.scss'
import MainLayout from './layouts/MainLayout'
import Home from './pages/Home'
import Search from './pages/Search'
import { Route, Routes } from 'react-router-dom'

function App() {
  return (
    <MainLayout>
      <Routes>
        <Route
          path='/'
          element={<Home />}
        />
        <Route
          path='/search'
          element={<Search />}
        />
      </Routes>
    </MainLayout>
  )
}

export default App
