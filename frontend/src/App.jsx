import {Routes, Route} from 'react-router'
import Home from './pages/Home'
import Add from './pages/Add'
import Edit from './pages/Edit'
import Show from './pages/Show'
import Login from './pages/Login'
import UnauthorizedRoutes from './routes/UnauthorizedRoutes'
import GuestRoutes from './routes/GuestRoutes'
import NotFound from './pages/NotFound'

const App = () => {
  return (
    <div className='relative h-full w-full'>
      <Routes>
        <Route path='/' element={
            <UnauthorizedRoutes>
              <Home />
            </UnauthorizedRoutes>
          } />
        <Route path='/notes/:id' element={
            <UnauthorizedRoutes>
              <Show />
            </UnauthorizedRoutes>
          } />
        <Route path='/notes/:id/edit' element={
            <UnauthorizedRoutes>
              <Edit />
            </UnauthorizedRoutes>
          } />
        <Route path='/new' element={
            <UnauthorizedRoutes>
              <Add />
            </UnauthorizedRoutes>
          } />
        <Route path='/login' element={
            <GuestRoutes>
              <Login />
            </GuestRoutes>
          } />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </div>
  )
}

export default App
