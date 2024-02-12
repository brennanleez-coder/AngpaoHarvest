import React, { useState } from 'react'
import NavBar from '@/components/Navbar'
import ViewAllAngpao from '@/components/Angpao/ViewAllAngpao'
import Charts from '@/components/Charts'
import { Separator } from '@/components/ui/separator'
import { AddAngPao } from '@/components/Angpao/AddAngPao'
import Home from '@/components/Home';
import { Toaster } from './ui/toaster'

const MainContent = () => {
  const [page, setPage] = useState('Home')

  const navigate = (page) => {
   switch (page) {
      case 'Home':
        return <Home/>
      case 'Charts':
        return <Charts/>
      case 'Angpao':
        return <ViewAllAngpao/>
      case 'AddAngpao':
        return <AddAngPao/>
      default:
        return <div>Home</div>
   }
  }
  return (
    <div className='w-full space-y-2'>
      <Toaster />
      <NavBar setPage={setPage}/>
      <Separator className="min-w-full" />
      <div className='flex justify-center items-center'>
        {navigate(page)}
      </div>
    </div>
  )
}

export default MainContent
