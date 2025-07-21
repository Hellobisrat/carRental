import  { useState } from 'react'
import Navbar from './components/Navbar'
import { useLocation } from 'react-router-dom';
import {Routes,Route} from 'react-router-dom'
import Cars from './pages/Cars';
import CarDetails from './pages/CarDetails';
import Home from './pages/Home.jsx'
import Footer from './components/Footer.jsx';

const App = () => {
  const [setShowLogin]=useState(false);
  const isOwnerPath = useLocation().pathname.startsWith('/owner')
  return (
    <>
      {!isOwnerPath && <Navbar setShowLogin={setShowLogin}/>}
      <Routes>
        <Route path='/' element ={<Home/>}/>
        <Route path='/car-details/:id' element ={<CarDetails/>}/>
        <Route path='/cars' element ={<Cars/>}/>
      </Routes>
      {!isOwnerPath && <Footer/>}
    </>
  )
}

export default App