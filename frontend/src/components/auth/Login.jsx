import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../../redux/userSlice';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const apiUrl = import.meta.env.VITE_API_URL;

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${apiUrl}/api/users/login`, { email, password });
            dispatch(login({ token: response.data.token }));
            navigate('/');
        } catch (error) {
            if (error.response && error.response.status === 400) {
                alert('User not registered. Please sign up first.');
            } else if (error.response.status === 500 && error.response.data.error=='hey buddy!! Wrong password') {
                alert('Wrong password. Please try again.');
            } else {
                console.error('Login failed', error);
            }
        }
    };


    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                <h2 className="text-2xl font-semibold text-center text-gray-700">Login</h2>
                <form onSubmit={handleLogin} className="mt-4">
                    <div className="mb-4">
                        <label className="block text-gray-700" htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email"
                            className="mt-1 p-2 w-full border rounded focus:outline-none focus:ring focus:ring-blue-300"
                            required
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700" htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter your password"
                            className="mt-1 p-2 w-full border rounded focus:outline-none focus:ring focus:ring-blue-300"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition duration-200"
                    >
                        Login
                    </button>
                </form>
                <p className="mt-4 text-center text-gray-600">
                    Don't have an account?
                    <Link to="/signup" className="text-blue-600 hover:underline"> Sign Up</Link>
                </p>
            </div>
        </div>
    );
};

export default Login;
