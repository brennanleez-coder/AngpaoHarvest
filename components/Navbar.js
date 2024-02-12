import React, { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"


const Navbar = ({setPage}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [angpao, setAngpao] = useState(0);


  const calculateAngPao = () => {
    return localStorage.getItem('CNY') ? JSON.parse(localStorage.getItem('CNY')).angpao.length : 0 ;
  }

  useEffect(() => {
    calculateAngPao();
  }
  , [angpao]);

  return (
    <>
      <div className="flex justify-around">
        <button onClick={() => setPage('Home')} className="text-gray-500 hover:text-gray-900">Home</button>
        <button onClick={() => setPage('Charts')} className="text-gray-500 hover:text-gray-900">Charts</button>
        <button onClick={() => setPage('Angpao')} className="text-gray-500 hover:text-gray-900">
          <div className='relative'>
            <p>Angpao</p>
            <div className='absolute -top-4 -right-2'>
              <Badge variant={'secondary'} className="w-1 flex justify-center">{calculateAngPao()}</Badge>
            </div>
          </div>
          
        </button>
        {/* <button onClick={() => setPage('AddAngpao')} className="text-gray-500 hover:text-gray-900">Add Angpao</button> */}
        <Button onClick={() => setPage('AddAngpao')} className="bg-gray-500">
          <p className="text-gray-300" >Add Angpao</p>
        </Button>

      </div>
      
    </>
  );
};

export default Navbar;
