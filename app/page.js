import React from 'react';
import Navbar from './components/Navbar/Navbar';
import Hero from '@/app/herosection/Hero.jsx';
import VenuesPage from './venues/page';

const page = () => {
  return (
    <>
      <Navbar />
      <Hero />
      <VenuesPage />
    </>
  );
};

export default page;
