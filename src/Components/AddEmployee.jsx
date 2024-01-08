import React, { useState } from 'react';
import axios from 'axios';

const AddEmployee = () => {
    const [name, setName] = useState('');
    const [branch, setBranch] = useState([]);
    const [contact, setContact] = useState('');
    const [bid, setBid] = useState('');
    const [success, setSuccess] = useState(false);

    useState(() => {
        const fetchData = async () => {
            const carResponse = await axios.get('http://localhost:5000/get_branch');
            if (carResponse.status == 200) {
                setBranch(carResponse.data)
            }
        }
        fetchData();
    }, []);

    console.log(branch);
    const validateForm = () => {
        return branch && name && contact;
    };



        const handleSubmit = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/add_employee?name=${name}&contact=${contact}&bid=${bid}`);

                if (response.status === 200) {
                    setSuccess(true);
                }

            } catch (error) {
                console.error('Error:', error);
            }
        };

        return (
            <div className="max-w-md mx-auto mt-6 p-6 border rounded-md shadow-xl bg-orange-200 ">
                <h1 className="text-xl font-semibold mb-4">Add Employee</h1>
                <div className="mb-4">
                    <label className="block mb-1">Name:</label>
                    <input
                        type="text"
                        className="border rounded px-2 py-1 w-full"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-1">Contact:</label>
                    <input
                        type="text"
                        className="border rounded px-2 py-1 w-full"
                        value={contact}
                        onChange={(e) => setContact(e.target.value)}
                    />
                </div>
                {/*<div className="mb-4">*/}
                {/*    <label className="block mb-1">Branch:</label>*/}
                {/*    <input*/}
                {/*        type="text"*/}
                {/*        className="border rounded px-2 py-1 w-full"*/}
                {/*        value={bid}*/}
                {/*        onChange={(e) => setContact(e.target.value)}*/}
                {/*    />*/}
                {/*</div>*/}
                <div className="mb-4">
                    <label className="block mb-2">Branch:</label>
                    <select
                        value={bid}
                        onChange={(e) => setBid(e.target.value)}
                        className="border rounded px-2 py-1 w-full"
                    >
                        <option value="">Select Branch</option>
                        {branch.map((option) => (
                            <option key={option} value={option}>
                                {option}
                            </option>
                        ))}
                    </select>
                </div>
                <button
                    className="bg-orange-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    onClick={handleSubmit}
                >
                    Add Employee
                </button>
                {success && (
                    <div className="mt-4 p-2 bg-green-200 text-green-800 rounded-md">
                        Employee added successfully!
                    </div>
                )}
            </div>
        );
    };

export default AddEmployee;
