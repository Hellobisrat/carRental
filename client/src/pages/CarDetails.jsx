import {useEffect,useState} from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { assets, dummyCarData } from '../assets/assets'
import Loading from '../components/Loading'

const CarDetails = () => {

  const {id} = useParams()
  const navigate = useNavigate()
  const [car,setCar]=useState(null)
  const currency =import.meta.VITE_CURRENCY

  const handleSubmit = async (e)=>{
    e.preventDefault()
  }

  useEffect(()=>{
    setCar(dummyCarData.find(car=>car._id===id))
  },[id])



  return car ? (
    <div className='px-6 md:px-16  lg:px-32 mt-16'>
      <button onClick={()=>navigate(-1)} className='flex items-center gap-2 mb-6 text-gray-500 cursor-pointer'>
        <img src={assets.arrow_icon} alt='' className='rotate-18 opacity-65'/>
        Back to all cars
        
      </button>
      <div className='grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12'>
         {/* Left: Car Image  & Details */}
         <div className='lg:col-span-2'>
             <img src={car.image} alt=''
             className='w-full h-auto md:max-h-100
             object-cover rounded-xl mb-6 shadow-md'/>
             <div className='space-y-6'>
                <div>
                  <h1 className='text-3xl font-bold'>{car.brand} {car.model}</h1>
                  <p className='text-gray-500 text-lg'>{car.category} . {car.year}</p>
                </div>
                <hr className='border-borderColor my-6'/>
                <div className='grid grid-cols-2 sm:grid-cols-4 gap-4'>
                  {[
                    {icon: assets.users_icon, text:`${car.seating_capacity} Seats`},
                    {icon: assets.fuel_icon, text:car.transmission},
                    {icon: assets.location_icon, text:car.location}
                  ].map(({icon,text})=>(
                    <div key={text} className='flex flex-col items-center bg-light
                    p-4 rounded-lg'>
                      <img src={icon}  alt=""/>
                      {text}
                      </div>
                  ))}
                </div>
                <div>
                  <h1 className='text-xl font-medium mb-3'>Description</h1>
                  <p className='text-gray-500'>{car.description}</p>
                </div>
                <div>
                  <h1 className='text-xl font-medium mb-3'>Features</h1>
                  <ul className='grid grid-col-1 sm:grid-col-2 gap-2'>
                     {
                      ["360 Camera", "Bluetooth", "GPS", "Heated Seats"]
                      .map((item)=>(
                        <li key={item} className='flex items-center text-gray-500'>
                          <img src={assets.check_icon} className='h-4 mr-2' alt=''/>
                           {item}
                        </li>
                      ))
                     }
                  </ul>
                </div>
             </div>
         </div>
         {/* Right: Booking Form */}
         <form className='shadow-lg h-max sticky top-18
         rounded-xl p-6 space-y-6 text-gray-500'>
        <p className='flex items-center justify-between text-2xl text-gray-800
        font-semibold'>{currency}{car.pricePerDay}
          <span className='text-base text-gray-400 font-normal'>per Day</span></p>
          <hr className='border-borderColor my-6'/>
          <div className='flex flex-col gap-2'>
            <label htmlFor='pickup-date'>Pick Up Date</label>
            <input type='date' className='border border-borderColor px-3 py-2
            rounded-lg' required id='pickup-date'
            min={new Date().toISOString().split('T')[0]}/>
          </div>
          <div className='flex flex-col gap-2'>
            <label htmlFor='return-date'>Return Date</label>
            <input type='date' className='border border-borderColor px-3 py-2
            rounded-lg' required id='return-date'
            />
          </div>
          <button onClick={handleSubmit} className='w-full bg-primary hover:bg-primary-dull
          transition-all py-3 font-medium text-white rounded-xl
          cursor-pointer  '>Book Now</button>
          <p className='text-center text-sm'>No credit card required to reserve</p>
         </form>
      </div>
    </div> 
  ) : <Loading/>
}

export default CarDetails