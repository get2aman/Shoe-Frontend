import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  

  const handleLogin = async (e) => {
    e.preventDefault();
    const body = { username, password };
    try {
      const response = await axios.post("https://shoe-backend-lku1.onrender.com/signin", body);
      if (response.data.message === "Logged in Sucessfully") {
        
        window.localStorage.setItem("userid",response.data.userid)
        window.localStorage.setItem("token",response.data.token)
        navigate('/');
      } else {
        alert('Login Failed');
      }
    } catch (error) {
      alert('invalid credential')
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
        <button className="bg-blue-500 px-4 py-2 rounded-lg hover:bg-blue-600 transition-all mr-3" onClick={()=>navigate('/signup')}>
            SignUp
          </button>
          <button className="bg-blue-500 px-4 py-2 rounded-lg hover:bg-blue-600 transition-all" onClick={()=>navigate('/')}>
            Home
          </button>
        </div>
      </nav> */}
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-300 via-white-100 to-white-500">

      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Login
        </h2>
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label htmlFor="Username" className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition duration-300 ease-in-out"
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
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition duration-300 ease-in-out"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-750 to-blue-700 text-white p-3 rounded-md hover:from-blue-600 hover:to-blue-600 focus:outline-none focus:from-purple-700 focus:to-pink-700 transition duration-500 ease-in-out transform hover:scale-105"
          >
            Login
          </button>
        </form>
        <p className="text-center text-sm text-gray-600 mt-6">
          Don't have an account?{' '}
          <NavLink to="/" className="text-pink-500 hover:text-pink-600 transition duration-300 ease-in-out">
            Register Here
          </NavLink>
        </p>
      </div>
    </div>
    </div>
  );
};

export default Login;
