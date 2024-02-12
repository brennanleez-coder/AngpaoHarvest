import React, { useState } from 'react';
import { Button } from '@/components/ui/button';

import ResetApp from '@/components/ResetApp';
import Settings from '@/components/Settings';


const Home = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-2 rounded-b-lg">
      <div className="bg-white rounded-xl shadow-xl p-6 m-4 w-full max-w-md">
        <h2 className="text-xl font-semibold text-center text-gray-800 mb-4">Welcome to Angpao Harvest</h2>
        <p className="text-gray-600">
         Never lose track of your angpaos again and see how well you are doing this CNY.
        </p>
      </div>

      <div className="bg-white rounded-xl shadow-xl p-6 m-4 w-full max-w-md">
        <h2 className="text-xl font-semibold text-center text-gray-800 mb-4">Pro Tips</h2>
        <p className="text-gray-600">
          1. Please open your angpaos discretely when checking the value. <br/>
          2. Don't lose all your angpao money on gambling. <br/>
          3. Invest in S&P 500<br/>

        </p>
      </div>

      <div className="bg-white rounded-xl shadow-xl p-6 m-4 w-full max-w-md">
        <h2 className="text-xl font-semibold text-center text-gray-800 mb-4">Contact Us</h2>
        <p className="text-gray-600">
          Have any questions or feedback? Our team is ready to help you. Get in touch with us through our contact form, email, or social media channels.
        </p>
      </div>
      <div className="flex space-x-3">
        <Settings/>
      </div>
      
    </div>
  )
}

export default Home;
