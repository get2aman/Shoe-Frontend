import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Register from './pages/Register';
// import Home from './pages/Home';
import Login from './pages/Login';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Cart from './pages/cart';
import Home from './pages/Home';
import '@fortawesome/fontawesome-free/css/all.min.css';


const App = () => {
  return (
    <BrowserRouter>
    <Navbar/>
      <Routes>
      <Route path="/" element={<Home/>} />
        <Route path='/signup' element={<Register/>}/>
        <Route path="/login" element={<Login/>} />
        <Route path='/Cart'  element={<Cart/>}/>
          </Routes>
          <Footer/>
    </BrowserRouter>
  );
};

export default App;