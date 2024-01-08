import React, { useState, useEffect } from 'react';
import axios from 'axios';

const BookCar = () => {
  const [carOptions, setCarOptions] = useState([]);
  const [customerOptions, setCustomerOptions] = useState([]);
  const [employeeOptions, setEmployeeOptions] = useState([]);
  const [carId, setCarId] = useState('');
  const [customerId, setCustomerId] = useState('');
  const [employeeId, setEmployeeId] = useState('');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const carResponse = await axios.get('http://localhost:5000/get_car');
        const customerResponse = await axios.get('http://localhost:5000/get_customer');
        const employeeResponse = await axios.get('http://localhost:5000/get_employee');

        setCarOptions(carResponse.data);
        setCustomerOptions(customerResponse.data);
        setEmployeeOptions(employeeResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const validateForm = () => {
      console.log(carId,customerId,employeeId,fromDate,toDate);
    return carId && customerId && employeeId && fromDate && toDate && fromDate <= toDate;
  };

  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      console.error('Please fill in all fields');
      return;
    }

    try {
      const response = await axios.get('http://localhost:5000/book_car', {
        params: {
          car_id: carId,
          customer_id: customerId,
          employee_id: employeeId,
          from_date: fromDate,
          to_date: toDate,
        },
      });
      console.log(response.data.message);
      setCarId('');
      setCustomerId('');
      setEmployeeId('');
      setFromDate('');
      setToDate('');
      if (response.status === 200) {
          setSuccess(true);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

    console.log(carOptions,customerOptions,employeeOptions)

  return (
    <div className="max-w-md mx-auto mt-6 p-6 border rounded-md shadow-md bg-orange-200">
      <h1 className="text-xl font-semibold mb-4">Book Car</h1>
        <form onSubmit={handleBookingSubmit}>
            <div className="mb-4">
                <label className="block mb-2">Car:</label>
                <select
                    value={carId}
                    onChange={(e) => setCarId(e.target.value)}
                    className="border rounded px-2 py-1 w-full"
                >
                    <option value="">Select Car</option>
                    {carOptions.map((option) => (
                        <option key={option.id} value={option.id}>
                            {option.name}
                        </option>
                    ))}
                </select>
            </div>
            <div className="mb-4">
                <label className="block mb-2">Customer:</label>
                <select
                    value={customerId}
                    onChange={(e) => setCustomerId(e.target.value)}
                    className="border rounded px-2 py-1 w-full"
                >
                    <option value="">Select Customer</option>
                    {customerOptions.map((option) => (
                        <option key={option.id} value={option.id}>
                             {option.id +'\t'+ option.name}
                        </option>
                    ))}
                </select>
            </div>
            <div className="mb-4">
                <label className="block mb-2">Employee:</label>
                <select
                    value={employeeId}
                    onChange={(e) => setEmployeeId(e.target.value)}
                    className="border rounded px-2 py-1 w-full"
                >
                    <option value="">Select Employee</option>
                    {employeeOptions.map((option) => (
                        <option key={option.id} value={option.id}>
                            {option.id +'\t'+ option.name}
                        </option>
                    ))}
                </select>
            </div>
            <div className="mb-4">
                <label className="block mb-2">From Date:</label>
                <input
                    type="date"
                    value={fromDate}
                    onChange={(e) => setFromDate(e.target.value)}
                    className="border rounded px-2 py-1 w-full"
                />
            </div>
            <div className="mb-4">
                <label className="block mb-2">To Date:</label>
                <input
                    type="date"
                    value={toDate}
                    onChange={(e) => setToDate(e.target.value)}
                    className="border rounded px-2 py-1 w-full"
                />
            </div>
            <button
                type="submit"
                className="bg-orange-400 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
                Book Car
            </button>
            {success && (
                <div className="mt-4 p-2 bg-green-200 text-green-800 rounded-md">
                     Car Booked successfully!
                </div>
            )}

        </form>
    </div>
  );
};

export default BookCar;
