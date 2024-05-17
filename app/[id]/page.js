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
        <div className="flex flex-1 items-center justify-center flex-col">
          <h1 className="text-3xl font-bold text-red-800 mb-4">Not Found</h1>
          <Link href="/" className="bg-red-800 text-white px-6 py-3 rounded text-center">
            Go back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen">
      <Navbar />
      <div className="flex flex-1 items-center justify-center overflow-hidden relative">
        <div className="w-3/4 h-3/4 bg-white border rounded-lg shadow-xl overflow-hidden flex">
          <div className="w-1/2 h-full">
            <img src={disc.image} alt={disc.name} className="w-75 h-full object-cover" />
          </div>
          <div className="w-1/2 p-6 flex flex-col justify-between border-r-8 border-red-800 bg-slate-100">
            <div className='ml-12'>
              <h1 className="text-4xl font-bold mb-4">{disc.name}</h1>
              <div className="space-y-4">
                <h2 className="text-xl">Type: {disc.type}</h2>
                <h2 className="text-xl">Speed: {disc.speed}</h2>
                <h2 className="text-xl">Color: {disc.color}</h2>
                <h2 className="text-xl">Weight: {disc.weight}g</h2>
                <h2 className="text-xl">Price: ${disc.price}</h2>
              </div>
            </div>
            <div className="flex mt-6 ml-12">
              <Link href="/" className="bg-red-800 text-white px-6 py-3 rounded text-center">
                Go back to Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
