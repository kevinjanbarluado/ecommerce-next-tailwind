"use client"

import { useState, useEffect } from 'react';
import ProductGrid from '../app/components/ProductGrid';
import ModalForm from './components/ModalForm';
import Sidebar from '../app/components/Sidebar';
import Navbar from './components/NavBar';
import { v4 } from "uuid";
import { FaSpinner } from 'react-icons/fa';

const Home = () => {
  const [discs, setDiscs] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [sort, setSort] = useState('');
  const [filters, setFilters] = useState({ type: '', color: '' });
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch discs from local storage
    const storedDiscs = localStorage.getItem('discs');
    if (storedDiscs) {
      setDiscs(JSON.parse(storedDiscs));
    }
    setLoading(false);
  }, []);

  const addDisc = (disc) => {
    const newDisc = { ...disc, id: v4() };
    const updatedDiscs = [...discs, newDisc];
    setDiscs(updatedDiscs);
    localStorage.setItem('discs', JSON.stringify(updatedDiscs));
  };

  const filteredDiscs = discs.filter((disc) => {
    return (
      (!filters.type || disc.type === filters.type) &&
      (!filters.color || disc.color.toLowerCase().includes(filters.color.toLowerCase()))
    );
  });

  const sortedDiscs = filteredDiscs.sort((a, b) => {
    if (!sort) return 0;
    return a[sort] - b[sort];
  });

  const handleDelete = (id) => {
    if (window.confirm("Are you sure to delete this product?")) {
      const updatedDiscs = discs.filter((disc) => disc.id !== id);
      setDiscs(updatedDiscs);
      localStorage.setItem('discs', JSON.stringify(updatedDiscs));
    }
  };

  // Extract unique colors from the list of discs
  const uniqueColors = Array.from(new Set(discs.map(disc => disc.color)));

  const resetFilters = () => {
    setSort('');
    setFilters({ type: '', color: '' });
    document.querySelectorAll('select').forEach(option => {
      option.value = '';
    });
  };

  if (loading) {
    return (
      <div className="flex flex-col h-screen justify-center items-center">
        <FaSpinner className="animate-spin text-6xl text-red-800" />
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen">
      <Navbar />
      <div className="flex flex-1 overflow-hidden relative">
        <Sidebar
          uniqueColors={uniqueColors}
          setSort={setSort}
          filters={filters}
          setFilter={(name, value) => setFilters({ ...filters, [name]: value })}
          resetFilters={resetFilters}
          toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
          isSidebarOpen={isSidebarOpen}
        />
        <div className={`flex-1 p-4 overflow-y-auto ${isSidebarOpen ? 'ml-1/6' : 'ml-0'} transition-margin duration-300`}>
          <button onClick={() => setIsModalOpen(true)} className="bg-red-800 text-white px-4 py-2 rounded mb-4">Add New Disc</button>
          {discs.length === 0 && <p className="text-center text-gray-500">No products available. Please add a new disc.</p>}
          <ProductGrid discs={sortedDiscs} handleDelete={handleDelete} />
          {isModalOpen && <ModalForm addDisc={addDisc} closeModal={() => setIsModalOpen(false)} />}
        </div>
      </div>
    </div>
  );
};

export default Home;
