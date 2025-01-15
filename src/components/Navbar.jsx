import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Navbar = () => {
  const navigate = useNavigate();
  const cart= useSelector((state)=>state.cart.cart)
  console.log("cart",cart);
  // Check for userId in localStorage
  const userId = localStorage.getItem("userid");

  const handleLogout = () => {
    localStorage.removeItem("userid"); // Remove userId from localStorage
    navigate("/login"); // Redirect to login page
  };

  return (
    <nav className="bg-blue-700 text-white px-6 py-4 flex justify-between items-center shadow-md">
      <div className="flex items-center space-x-3">
        <img
          src="https://iheartcraftythings.com/wp-content/uploads/2021/05/Shoes6.jpg"
          alt="Logo"
          className="w-10 h-10 rounded-full"
        />
        <span className="text-2xl font-extrabold tracking-wide">Shoe Shop</span>
      </div>

      <div>
        {userId ? (
          <>
            <button
              className="bg-blue-500 px-4 py-2 rounded-lg hover:bg-blue-600 transition-all mr-3"
              onClick={() => navigate("/Cart")}
            >
              Cart ({cart.length})
            </button>
            <button
              className="bg-red-500 px-4 py-2 rounded-lg hover:bg-red-600 transition-all"
              onClick={handleLogout}
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <button
              className="bg-blue-500 px-4 py-2 rounded-lg hover:bg-blue-600 transition-all mr-3"
              onClick={() => navigate("/login")}
            >
              Login
            </button>
            <button
              className="bg-blue-500 px-4 py-2 rounded-lg hover:bg-blue-600 transition-all"
              onClick={() => navigate("/signup")}
            >
              Sign Up
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
