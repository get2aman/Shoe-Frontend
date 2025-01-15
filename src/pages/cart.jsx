import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const Cart = () => {
  
  const userId = window.localStorage.getItem("userid");
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalAmount, setTotalAmount] = useState(0);

  // Fetch cart data on component mount
  useEffect(() => {
    const fetchCartData = async () => {
      try {
        const response = await axios.get(`https://shoe-backend-lku1.onrender.com/cart/${userId}`);
        console.log(response);
        setCart(response.data.cart); // Assuming cart is an array of items
        calculateGrandTotal(response.data.cart);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching cart data", error);
        setLoading(false);
      }
    };
    fetchCartData();
  }, []);

  // Calculate Grand Total (Subtotal + Taxes + Delivery Charges)
  const calculateGrandTotal = (cart) => {
    const subtotal = cart.reduce(
      (total, item) => total + item.shoeId.price * item.quantity,
      0
    );
    const deliveryCharges = 50; // Fixed delivery charges
    const tax = subtotal * 0.18; // 18% tax
    setTotalAmount(subtotal + deliveryCharges + tax);
  };

  // Handle quantity increase
  const handleIncreaseQuantity = async (shoeId) => {
    try {
      await axios.put(`https://shoe-backend-lku1.onrender.com/increase/${shoeId}`, { userId });
      const updatedCart = cart.map(item => {
        if (item.shoeId._id === shoeId) {
          return { ...item, quantity: item.quantity + 1 };
        }
        return item;
      });
      setCart(updatedCart);
      calculateGrandTotal(updatedCart);
      toast.success("Item quantity increased!");
    } catch (error) {
      console.error("Error increasing quantity", error);
      toast.error("Error increasing quantity!");
    }
  };

  // Handle quantity decrease
  const handleDecreaseQuantity = async (shoeId) => {
    try {
      await axios.put(`https://shoe-backend-lku1.onrender.com/decrease/${shoeId}`, { userId });
      const updatedCart = cart
        .map((item) => {
          if (item.shoeId._id === shoeId) {
            return item.quantity > 1
              ? { ...item, quantity: item.quantity - 1 }
              : null;
          }
          return item;
        })
        .filter((item) => item !== null); // Remove items with 0 quantity
      setCart(updatedCart);
      calculateGrandTotal(updatedCart);
      toast.info("Item quantity decreased!");
    } catch (error) {
      console.error("Error decreasing quantity", error);
      toast.error("Error decreasing quantity!");
    }
  };

  // Handle item removal
  const handleDeleteItem = async (itemId) => {
    try {
      await axios.put(`https://shoe-backend-lku1.onrender.com/remove/${itemId}`, { userId });
      const updatedCart = cart.filter(item => item.shoeId._id !== itemId);
      setCart(updatedCart);
      calculateGrandTotal(updatedCart);
      toast.warning("Item removed from cart!");
    } catch (error) {
      console.error("Error removing item", error);
      toast.error("Error removing item!");
    }
  };

  if (loading) {
    return <div className="flex justify-center items-center min-h-screen">Loading your Cart...</div>;
  }

  return (
    <div className="container mx-auto px-100 py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left Side: Cart Items */}
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Your Cart</h2>
          {cart.length > 0 ? (
            cart.map((item) => (
              <div
                key={item.shoeId._id}
                className="flex items-center justify-between border-b border-gray-200 py-4"
              >
                <div className="flex items-center">
                  <img
                    src={item.shoeId.img}
                    alt={item.shoeId.title}
                    className="w-24 h-24 object-cover rounded-md mr-6"
                  />
                  <div>
                    <h3 className="text-lg font-medium text-gray-700 w-6">{item.shoeId.title}</h3>
                    <p className="text-gray-500">₹{item.shoeId.price}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <button
                    className="bg-red-500 text-white p-2 rounded-full hover:bg-red-600 focus:outline-none transition duration-300"
                    onClick={() => handleDecreaseQuantity(item.shoeId._id)}
                  >
                    <i className="fas fa-minus"></i>
                  </button>
                  <span className="text-xl">{item.quantity}</span>
                  <button
                    className="bg-green-500 text-white p-2 rounded-full hover:bg-green-600 focus:outline-none transition duration-300"
                    onClick={() => handleIncreaseQuantity(item.shoeId._id)}
                  >
                    <i className="fas fa-plus"></i>
                  </button>
                </div>
                <button
                  className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition duration-300"
                  onClick={() => handleDeleteItem(item.shoeId._id)}
                >
                  Remove
                </button>
              </div>
            ))
          ) : (
            <p className="text-gray-600">Your cart is empty.</p>
          )}
        </div>

        {/* Right Side: Price Details */}
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Price Details</h2>
          <div className="space-y-3">
            <div className="flex justify-between text-lg text-gray-700">
              <span>Subtotal</span>
              <span>₹{cart.reduce((total, item) => total + item.shoeId.price * item.quantity, 0).toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-lg text-gray-700">
              <span>Delivery Charges</span>
              <span>₹50.00</span>
            </div>
            <div className="flex justify-between text-lg text-gray-700">
              <span>Tax (18%)</span>
              <span>₹{(cart.reduce((total, item) => total + item.shoeId.price * item.quantity, 0) * 0.18).toFixed(2)}</span>
            </div>
          </div>
          <div className="border-t border-gray-300 mt-6 pt-4 text-xl font-semibold text-gray-800">
            <div className="flex justify-between">
              <span>Grand Total</span>
              <span>₹{totalAmount.toFixed(2)}</span>
            </div>
          </div>
          <button
            className="w-full mt-6 bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 focus:outline-none transition duration-300"
            
          >
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
