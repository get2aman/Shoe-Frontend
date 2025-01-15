import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import {useDispatch} from 'react-redux'
import { useNavigate} from "react-router-dom";
import cartSlice, { fetchCartData } from "../features/cartSlice";


const Home = () => {
  const userId=window.localStorage.getItem('userid');
  const navigate = useNavigate();
  const dispatch=useDispatch();
  const [shoes, setShoes] = useState([]); // State to store shoe data
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  // Fetch data from the API using Axios
  useEffect(() => {
    const fetchShoes = async () => {
      try {
        const response = await axios.get("https://shoe-backend-lku1.onrender.com/cartdata"); // Replace with your API URL
        setShoes(response.data); // Set shoe data from API response
        setLoading(false);
      } catch (err) {
        setError(err.message); // Handle any error that occurs
        setLoading(false);
      }
    };
   
    dispatch( fetchCartData(userId))
    fetchShoes();
  }, []);

  // Function to handle "Buy Now" button click
  const handleBuyNowClick = (shoeId) => {
    const userId = window.localStorage.getItem("userid"); // Retrieve userId from localStorage
    if (userId) {
      // If userId exists, navigate to the cart page
      navigate(`/cart/`);
    } else {
      // If no userId, navigate to the login page
      navigate("/login");
    }
  };

  // Function to handle "Add to CArt" button click
  const handleAddToCartClick = async (shoe) => {
    const response = await axios.put(`https://shoe-backend-lku1.onrender.com/${shoe._id}`, {userId});
    console.log(response.data.message)
    console.log(userId)
    // Dispatch Redux action to update cart state
    if(response.data.message=='Added to cart'){
    dispatch(
      cartSlice.actions.Addtocart((shoe))
    );
  }
};


  return (
    <div className="font-sans">

      {/* Main Content */}
      <main className="p-8 bg-gray-50 min-h-screen">
        <h1 className="text-4xl font-extrabold mb-8 text-center text-blue-700">
          Explore Our Collection
        </h1>
        {loading ? (
          <p className="text-center text-lg text-gray-700">Loading...</p>
        ) : error ? (
          <p className="text-center text-lg text-red-600">{error}</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {shoes.map((shoe) => (
              <div
                key={shoe.id}
                className="bg-white shadow-lg rounded-lg overflow-hidden hover:scale-105 transition-transform duration-300"
              >
                <img
                  src={shoe.img}
                  alt={shoe.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-5">
                  <h2 className="text-xl font-bold mb-3 text-gray-800">
                    {shoe.title}
                  </h2>
                  <p className="text-gray-600 mb-4 text-lg">${shoe.price}</p>
                  {/* Button container with Flexbox */}
                  <div className="flex gap-4">
                    <button
                      className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition-all w-full sm:w-auto"
                      onClick={() => handleBuyNowClick(shoe.id)}
                    >
                      Buy Now
                    </button>
                    <button
                      className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition-all w-full sm:w-auto"
                      onClick={() => handleAddToCartClick(shoe)}
                    >
                      Add to cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-blue-700 text-white text-center py-4">
        <p className="text-sm">&copy; 2024 Shoe Shop. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Home;
