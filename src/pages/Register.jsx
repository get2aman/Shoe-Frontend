import React, { useState } from 'react';
import axios from 'axios';
import { NavLink, useNavigate } from 'react-router-dom';


const Register = () => {
  
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const body = { username, email, password };

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("https://shoe-backend-lku1.onrender.com/signup", body);
      if (response.data.message === "User Register Sucessfully") {
        alert('Successfully registered');
        navigate('/login');
      }
    } catch (error) {
      console.error('Registration error:', error);
      alert('An error occurred. Please try again.');
    }
  };

  return (
    <div className='font-sans'>
      {/* <nav className="bg-blue-700 text-white px-6 py-4 flex justify-between items-center shadow-md">
        <div className="flex items-center space-x-3">
          <img
            src="https://iheartcraftythings.com/wp-content/uploads/2021/05/Shoes6.jpg"
            alt="Logo"
            className="w-10 h-10 rounded-full"
          />
          <span className="text-2xl font-extrabold tracking-wide">Shoe Shop</span>
        </div>
        <div>
        <button className="bg-blue-500 px-4 py-2 rounded-lg hover:bg-blue-600 transition-all mr-3" onClick={()=>navigate('/login')}>
            Login
          </button>
          <button className="bg-blue-500 px-4 py-2 rounded-lg hover:bg-blue-600 transition-all" onClick={()=>navigate('/')}>
            Home
          </button>
        </div>
      </nav> */}
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-300 via-white-100 to-white-500">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Create an Account
        </h2>
        <form onSubmit={handleRegister} className="space-y-6">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">
              Username
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition duration-300 ease-in-out"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition duration-300 ease-in-out"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition duration-300 ease-in-out"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-750 to-blue-700 text-white p-3 rounded-md hover:from-blue-600 hover:to-blue-400 focus:outline-none focus:ring-2 focus:ring-pink-500 transition duration-500 ease-in-out transform hover:scale-105"
          >
            Register
          </button>
        </form>
        <p className="text-center text-sm text-gray-600 mt-6">
          Already Registered?{' '}
          <NavLink to='/login' className="text-blue-500 hover:text-blue-600 transition duration-300 ease-in-out">
            Login Here
          </NavLink>
        </p>
      </div>
    </div>
    </div>
  );
};

export default Register;
