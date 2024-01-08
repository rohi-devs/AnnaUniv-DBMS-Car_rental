import React, { useState } from 'react';
import axios from 'axios';

const AddCar = () => {
  const [brand, setBrand] = useState('');
  const [name, setName] = useState('');
  const [mil, setMil] = useState('');
  const [isAvail, setIsAvail] = useState(false);
  const [price, setPrice] = useState('');
  const [message, setMessage] = useState('');
  const [formErrors, setFormErrors] = useState({});

  const validateForm = () => {
    const errors = {};
    if (!brand.trim()) {
      errors.brand = 'Brand is required';
    }
    if (!name.trim()) {
      errors.name = 'Name is required';
    }
    if (!mil.trim()) {
      errors.mil = 'Mileage is required';
    }
    if (!price.trim()) {
      errors.price = 'Price is required';
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isValid = validateForm();
    if (isValid) {
      try {
        const response = await axios.get('http://localhost:5000/add_car', {
          params: {
            brand,
            name,
            mil,
            is_avail: isAvail,
            price,
          },
        });
        setMessage(response.data.message);
      } catch (error) {
        console.error('Error:', error);
      }
    }
  };

  return (
    <div className="max-w-md mx-auto mt-6 p-6 border rounded-md shadow-md bg-orange-200">
      <h1 className="text-xl font-semibold mb-4">Add Car</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block mb-1">Brand:</label>
          <input type="text" value={brand} onChange={(e) => setBrand(e.target.value)} className="border rounded px-2 py-1 w-full" />
          {formErrors.brand && <p className="text-red-500">{formErrors.brand}</p>}
        </div>
        <div className="mb-4">
          <label className="block mb-2">Name:</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="border rounded px-2 py-1 w-full" />
          {formErrors.name && <p className="text-red-500">{formErrors.name}</p>}
        </div>
        <div className="mb-4">
          <label className="block mb-2">Mileage:</label>
          <input type="text" value={mil} onChange={(e) => setMil(e.target.value)} className="border rounded px-2 py-1 w-full" />
          {formErrors.mil && <p className="text-red-500">{formErrors.mil}</p>}
        </div>
        <div className="mb-4">
          <label className="block mb-2">Availability:</label>
          <input type="checkbox" checked={isAvail} onChange={(e) => setIsAvail(e.target.checked)} className="rounded border-gray-300" />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Price:</label>
          <input type="text" value={price} onChange={(e) => setPrice(e.target.value)} className="border rounded px-2 py-1 w-full" />
          {formErrors.price && <p className="text-red-500">{formErrors.price}</p>}
        </div>
        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" disabled={Object.keys(formErrors).length !== 0}>
          Add Car
        </button>
      </form>
      {message && <p className="mt-4 p-2 bg-green-200 text-green-800 rounded-md">{message}</p>}
    </div>
  );
};

export default AddCar;
