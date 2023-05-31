import React from 'react';
import Chart from './icons/chart.svg'
import Sensor from './icons/sensor.svg'

export default function NavBar() {
  return (
    <div className='h-screen bg-zinc-900 shadow-lg w-48 flex p-4'>
      <div className='flex flex-col justify-start w-full'>
        <h1 className='text-white font-bold text-center'>Heartense</h1>
        <div className='space-y-5 my-10'>
          <NavItem text='Activity' icon={<Chart/>}/>
          <NavItem text='Sensors' icon = {<Sensor/>}/>
        </div>
      </div>
    </div>
  )
}


function NavItem(p: { text: string, icon: React.ReactNode }) {
  return (
    <div className='flex flex-col items-center w-full p-4 shadow-md border border-stone-800 justify-center hover:border-red-400 rounded-md text-white'>
      <div className='w-12 mb-4 '>
        {p.icon}
      </div>
      <span className='text-sm text-center font-medium'>{p.text}</span>
    </div>
  )
}
