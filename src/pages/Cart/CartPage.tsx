import { useState, useEffect } from "react";
import {
  getCart,
  updateCartItem,
  deleteCartItem,
} from "../../utils/cartService";
import type { Cart } from "../../utils/cartService";
import { Link, useNavigate } from "react-router-dom";
import { FiTrash2 } from "react-icons/fi";

const CartPage = () => {
  const [cart, setCart] = useState<Cart | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCart = async () => {
      try {
        setLoading(true);
        const sessionId = localStorage.getItem("cartSessionId");
        if (sessionId) {
          const cartData = await getCart(sessionId);
          setCart(cartData);
        }
      } catch (error) {
        console.error("Error fetching cart:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, []);

  const handleUpdateQuantity = async (itemId: string, newQuantity: number) => {
    try {
      const sessionId = localStorage.getItem("cartSessionId");
      if (!sessionId) return;

      const updatedCart = await updateCartItem(sessionId, itemId, {
        quantity: newQuantity,
      });
      setCart(updatedCart);
      window.dispatchEvent(new Event("cartUpdated"));
    } catch (error) {
      console.error("Error updating cart:", error);
    }
  };

  const handleDeleteItem = async (itemId: string) => {
    try {
      const sessionId = localStorage.getItem("cartSessionId");
      if (!sessionId) return;

      const updatedCart = await deleteCartItem(sessionId, itemId);
      setCart(updatedCart);
      window.dispatchEvent(new Event("cartUpdated"));
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-amber-500"></div>
      </div>
    );
  }

  if (!cart || cart.items.length === 0) {
    return (
      <div className="min-h-screen bg-slate-900 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-20">
            <h2 className="text-3xl font-bold text-slate-100 mb-4">
              Your cart is empty
            </h2>
            <p className="text-slate-300 mb-8">
              Start shopping to add items to your cart
            </p>
            <Link
              to="/"
              className="inline-block bg-amber-500 text-slate-950 px-8 py-3 rounded-lg font-semibold hover:bg-amber-400 transition-colors"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-slate-100 mb-8">
          Shopping Cart
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cart.items.map((item) => (
              <div
                key={item._id}
                className="bg-slate-800 border border-slate-700 rounded-xl shadow-lg shadow-black/20 p-6 flex gap-6"
              >
                {/* Product Image */}
                <div className="w-32 h-32 flex-shrink-0">
                  <img
                    src={item.product.images[0]}
                    alt={item.product.name}
                    className="w-full h-full object-contain rounded-lg bg-slate-900"
                  />
                </div>

                {/* Product Info */}
                <div className="flex-grow">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-bold text-slate-100">
                      {item.product.name}
                    </h3>
                    <button
                      onClick={() => handleDeleteItem(item._id)}
                      className="text-red-500 hover:text-red-700 transition-colors p-2"
                      title="Remove item"
                    >
                      <FiTrash2 className="w-5 h-5" />
                    </button>
                  </div>
                  <div className="space-y-1 text-sm text-slate-300">
                    <p>Color: {item.color}</p>
                    <p>Size: {item.size}</p>
                    <p className="text-lg font-bold text-slate-100 mt-2">
                      {item.price} EGP
                    </p>
                  </div>
                </div>

                {/* Quantity Controls */}
                <div className="flex flex-col items-end justify-between">
                  <div className="flex items-center border-2 border-slate-600 rounded-lg bg-slate-900/60">
                    <button
                      onClick={() =>
                        handleUpdateQuantity(item._id, item.quantity - 1)
                      }
                      disabled={item.quantity <= 1}
                      className="px-3 py-1 text-lg font-semibold text-slate-200 hover:bg-slate-700 transition-colors disabled:opacity-50"
                    >
                      −
                    </button>
                    <span className="px-4 py-1 text-lg font-semibold text-slate-100 border-x-2 border-slate-600">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() =>
                        handleUpdateQuantity(item._id, item.quantity + 1)
                      }
                      className="px-3 py-1 text-lg font-semibold text-slate-200 hover:bg-slate-700 transition-colors"
                    >
                      +
                    </button>
                  </div>

                  <p className="text-xl font-bold text-slate-100">
                    {(item.price * item.quantity).toFixed(2)} EGP
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-slate-800 border border-slate-700 rounded-xl shadow-lg shadow-black/20 p-6 sticky top-8">
              <h2 className="text-2xl font-bold text-slate-100 mb-6">
                Order Summary
              </h2>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-slate-300">
                  <span>Subtotal ({cart.totalItems} items)</span>
                  <span>{cart.totalPrice.toFixed(2)} EGP</span>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span>Shipping</span>
                  <span>Calculated at checkout</span>
                </div>
              </div>

              <div className="border-t border-slate-700 pt-4 mb-6">
                <div className="flex justify-between text-xl font-bold text-slate-100">
                  <span>Total</span>
                  <span>{cart.totalPrice.toFixed(2)} EGP</span>
                </div>
              </div>

              <button
                onClick={() => navigate("/checkout")}
                className="w-full bg-amber-500 text-slate-950 py-4 rounded-full text-lg font-semibold hover:bg-amber-400 transition-colors mb-4"
              >
                Proceed to Checkout
              </button>

              <Link
                to="/"
                className="block text-center text-amber-400 font-medium hover:text-amber-300 transition-colors"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
