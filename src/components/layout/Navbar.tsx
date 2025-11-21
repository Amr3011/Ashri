import { Link } from "react-router-dom";
import { FiShoppingBag } from "react-icons/fi";
import { useState, useEffect } from "react";
import { getCart } from "../../utils/cartService";

const Navbar = () => {
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const fetchCartCount = async () => {
      try {
        const sessionId = localStorage.getItem("cartSessionId");
        if (sessionId) {
          const cart = await getCart(sessionId);
          setCartCount(cart.totalItems || 0);
        }
      } catch (error) {
        console.error("Error fetching cart:", error);
      }
    };

    fetchCartCount();

    // Update cart count when storage changes
    const handleStorageChange = () => {
      fetchCartCount();
    };

    window.addEventListener("storage", handleStorageChange);
    window.addEventListener("cartUpdated", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("cartUpdated", handleStorageChange);
    };
  }, []);

  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-28">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center">
              <img
                src="/assets/Logo.png"
                alt="ROKSTEP"
                className="h-36 w-auto"
              />
            </Link>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className="text-purple-400 font-medium border-b-2 border-purple-400 pb-1 hover:text-purple-500 transition-colors"
            >
              Home
            </Link>
            <a
              href="#products"
              onClick={(e) => {
                e.preventDefault();
                document
                  .getElementById("products")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
              className="text-gray-700 font-medium hover:text-purple-400 transition-colors cursor-pointer"
            >
              Products
            </a>
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                document
                  .getElementById("contact")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
              className="text-gray-700 font-medium hover:text-purple-400 transition-colors cursor-pointer"
            >
              Contact Us
            </a>
          </div>

          {/* Icons */}
          <div className="flex items-center space-x-4">
            <Link
              to="/cart"
              className="text-gray-700 hover:text-purple-400 transition-colors relative"
            >
              <FiShoppingBag className="w-6 h-6" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-purple-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
