import React, { useState } from 'react';

const ModalForm = ({ addDisc, closeModal }) => {
  const [formData, setFormData] = useState({
    type: 'Putter',
    name: '',
    speed: 1,
    color: '',
    weight: 0,
    price: 0,
    image: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && file.size <= 5 * 1024 * 1024) { // 5MB limit
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, image: reader.result });
      };
      reader.readAsDataURL(file);
    } else {
      alert('File size must be less than 5MB');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addDisc(formData);
    closeModal();
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg w-2/4 h-3/4 overflow-auto">
        <h2 className="text-2xl mb-4">Create New Disc</h2>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="mb-4">
              <label className="block mb-1">Disc Type</label>
              <select name="type" value={formData.type} onChange={handleChange} className="w-full p-2 border rounded">
                <option value="Putter">Putter</option>
                <option value="Mid-range">Mid-range</option>
                <option value="Driver">Driver</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="block mb-1">Name</label>
              <input type="text" name="name" value={formData.name} onChange={handleChange} className="w-full p-2 border rounded" required />
            </div>
            <div className="mb-4">
              <label className="block mb-1">Speed</label>
              <input type="number" name="speed" value={formData.speed} onChange={handleChange} min="1" max="14" className="w-full p-2 border rounded" required />
            </div>
            <div className="mb-4">
              <label className="block mb-1">Color</label>
              <input type="text" name="color" value={formData.color} onChange={handleChange} className="w-full p-2 border rounded" required />
            </div>
            <div className="mb-4">
              <label className="block mb-1">Weight (g)</label>
              <input type="number" name="weight" value={formData.weight} onChange={handleChange} className="w-full p-2 border rounded" required />
            </div>
            <div className="mb-4">
              <label className="block mb-1">Price ($)</label>
              <input type="number" name="price" value={formData.price} onChange={handleChange} className="w-full p-2 border rounded" required />
            </div>
            <div className="mb-4 col-span-2">
              <label className="block mb-1">Image</label>
              <input type="file" onChange={handleImageChange} className="w-full p-2 border rounded" accept="image/*" required />
            </div>
          </div>
          <div className="flex justify-end mt-4">
            <button type="submit" className="bg-red-800 text-white px-4 py-2 rounded">Create</button>
            <button type="button" onClick={closeModal} className="ml-4 bg-gray-500 text-white px-4 py-2 rounded">Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModalForm;
