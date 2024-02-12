'use client'
import Link from 'next/link'; // Import Link from Next.js
import Home from '@/components/Home';
import Charts from '@/components/Charts';
const AppRouter = () => {
  return (
    <div>
      {/* Use Link component for navigation */}
      <Link href="/">
        <Home/>
      </Link>
      {/* Define a new route for the Charts component */}
      <Link href="/charts">
        <Charts/>
      </Link>
    </div>
  );
};

export default AppRouter;
