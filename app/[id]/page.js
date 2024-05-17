"use client";

import React, { useEffect, useState } from 'react';
import Navbar from '../components/NavBar';
import Link from 'next/link';
import { FaSpinner } from 'react-icons/fa';

const Page = ({ params }) => {
  const [disc, setDisc] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const discs = JSON.parse(localStorage.getItem('discs') || '[]');
    const foundDisc = discs.find(disc => disc.id === params.id);
    setDisc(foundDisc);
    setLoading(false);
  }, [params.id]);

  if (loading) {
    return (
      <div className="flex flex-col h-screen">
        <Navbar />
        <div className="flex flex-1 items-center justify-center">
          <FaSpinner className="animate-spin text-6xl text-red-800" />
        </div>
      </div>
    );
  }

  if (!disc) {
    return (
      <div className="flex flex-col h-screen">
        <Navbar />
        <div className="flex flex-1 items-center justify-center">
          <h1 className="text-3xl font-bold text-red-800">Not Found</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen">
      <Navbar />
      <div className="flex flex-1 items-center justify-center overflow-hidden relative">
        <div className="w-full h-full flex items-center justify-center">
          <div className="w-2/6 h-4/5 bg-white border rounded-lg shadow-xl overflow-hidden relative">
            <img src={disc.image} alt={disc.name} className="w-full h-48 object-cover mb-4" />
            <div className="p-4">
              <div className="flex flex-col items-start">
                <h1 className="text-3xl font-bold">{disc.name}</h1>
              </div>
              <div className="flex flex-col mt-4 space-y-2">
                <h2 className='text-2xl'>Type: {disc.type}</h2>
                <h2 className='text-2xl'>Speed: {disc.speed}</h2>
                <h2 className='text-2xl'>Color: {disc.color}</h2>
                <h2 className='text-2xl'>Weight: {disc.weight}g</h2>
                <h2 className='text-2xl'>Price: ${disc.price}</h2>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-2 flex justify-center">
                <Link href="/" className="bg-red-800 text-white px-4 py-2 rounded text-center">
                  Go back to Home
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
