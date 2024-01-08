import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios";


function Login() {
    return (
        <div>
            <div className={'min-w-full min-h-20 bg-orange-400 flex items-center justify-center'}>
                <h1 className={'text-orange-100 text-3xl text-center top-10 font-extrabold'}>Car rental Management system</h1>
            </div>
            <Logi />
        </div>
    )
}

function Logi() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();


        // Simulate authentication (replace with actual API call)
        async function handleSubmit(e) {
            e.preventDefault();

            try {
                const response = await axios.get(`http://localhost:5000/auth`, {
                    params :{
                        email: email,
                        pass: password
                    }
                });
                console.log(response.data)
                if (response.data === 't') {
                    localStorage.setItem('isAuthenticated', true);
                    navigate('/home');
                } else {
                    alert('Invalid email or password');
                }
            } catch (error) {
                console.error('Authentication error:', error);
                alert('An error occurred during authentication');
            }
        }


     return (
            <div className="max-w-md mx-auto mt-6 p-6 border rounded-md shadow-md bg-orange-200">
                <h1 className="text-xl font-semibold mb-4">Login</h1>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block mb-1">Email:</label>
                        <input type="text" value={email} onChange={(e) => setEmail(e.target.value)}
                               className="border rounded px-2 py-1 w-full" required/>
                    </div>
                    <div className="mb-4">
                        <label className="block mb-2">Password:</label>
                        <input type="text" value={password}  type='password' onChange={(e) => setPassword(e.target.value)}
                               className="border rounded px-2 py-1 w-full" required/>
                    </div>
                    <button type="submit"
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                        Login
                    </button>
                </form>
            </div>
        );
}

export default Login;
