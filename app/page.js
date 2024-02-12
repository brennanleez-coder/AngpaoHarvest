'use client'
import React, { useEffect } from 'react';

import MainContent from '@/components/MainContent';
import { initialiseApp, resumeAppState } from '@/utils/utils';

const App = () => {

  
  useEffect(() => {
    const cnyDocument = localStorage.getItem('CNY')
    if (!cnyDocument) {
      initialiseApp();
    } else {
      console.log('App already initialised');
    }
  }
  , []);
  return (
    <div className="min-h-screen p-3 flex flex-col justify-center items-center shadow-2xl">
      {/* <NavBar /> */}
      <main className="flex-1 w-full sm:p-2 max-w-lg px-4 py-8 bg-white rounded-lg shadow-2xl">
        <div className="flex justify-center items-center">
          <MainContent/>
        </div>
      </main>
      
      <footer className="bg-gray-100 w-full py-4 shadow-md rounded-b-lg">
        <p className="text-center text-gray-600">© 2024 Angpao Harvest V1</p>
      </footer>
    </div>
  );
};

export default App;
