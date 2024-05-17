import React, { useEffect, useRef } from 'react';
import { FaChevronLeft, FaChevronRight, FaUndo } from 'react-icons/fa';

const buttonSize = 22;

const Sidebar = ({ uniqueColors, setSort, setFilter, resetFilters, toggleSidebar, isSidebarOpen }) => {
  const handleSortChange = (e) => {
    setSort(e.target.value);
  };

  const handleFilterChange = (e) => {
    setFilter(e.target.name, e.target.value);

  };

  return (
    <div className={`h-full flex flex-col justify-between ${isSidebarOpen ? 'w-1/6 p-4' : 'w-0 overflow-hidden'} transition-width duration-300 border-r`}>
      {isSidebarOpen && (
        <>
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold">Sort By</h2>
              <button onClick={resetFilters} className="flex items-center text-gray-600 hover:text-red-800">
                <FaUndo size={buttonSize} className="mr-2" />
                Reset
              </button>
            </div>
            <select onChange={handleSortChange} className="w-full p-2 mb-4 border rounded">
              <option value="">None</option>
              <option value="speed">Speed</option>
              <option value="price">Price</option>
              <option value="weight">Weight</option>
            </select>
            <h2 className="text-xl font-bold mb-4">Filter By</h2>
            <div className="mb-4">
              <label className="block mb-2">Disc Type</label>
              <select name="type" onChange={handleFilterChange} className="w-full p-2 border rounded">
                <option value="">All</option>
                <option value="Putter">Putter</option>
                <option value="Mid-range">Mid-range</option>
                <option value="Driver">Driver</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="block mb-2">Color</label>
              <select name="color" onChange={handleFilterChange} className="w-full p-2 border rounded">
                <option value="">All</option>
                {uniqueColors.map((color, index) => (
                  <option key={index} value={color}>{color}</option>
                ))}
              </select>
            </div>
          </div>
        </>
      )}
      <button
        onClick={toggleSidebar}
        className="bg-red-800 text-white p-2 rounded-full absolute bottom-4 left-4"
        style={{ zIndex: 10 }}
      >
        {isSidebarOpen ? <FaChevronLeft size={buttonSize} /> : <FaChevronRight size={buttonSize} />}
      </button>
    </div>
  );
};

export default Sidebar;
