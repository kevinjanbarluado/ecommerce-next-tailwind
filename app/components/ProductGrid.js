import React from 'react';
import { FaTrash } from 'react-icons/fa';
import Link from 'next/link';

const ProductGrid = ({ discs, handleDelete }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {discs.map((disc) => (
        <div key={disc.id} className="border p-4 rounded-lg bg-white">
          <Link href={`./${disc.id}`}>
            <img src={disc.image} alt={disc.name} className="w-full h-48 object-cover mb-4" />
          </Link>
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-2xl font-bold flex-grow-0 truncate">{disc.name}</h2>
            <button onClick={() => handleDelete(disc.id)} className="bg-red-800 text-white p-2 rounded-full ml-2">
              <FaTrash />
            </button>
          </div>
          <p>Type: {disc.type}</p>
          <p>Speed: {disc.speed}</p>
          <p>Color: {disc.color}</p>
          <p>Weight: {disc.weight}g</p>
          <p>Price: ${disc.price}</p>
        </div>
      ))}
    </div>
  );
};

export default ProductGrid;
