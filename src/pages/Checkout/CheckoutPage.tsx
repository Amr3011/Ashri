import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getCart } from "../../utils/cartService";
import type { Cart } from "../../utils/cartService";
import { api_url } from "../../utils/ApiClient";
import Alert from "../../components/shared/Alert";

const CheckoutPage = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useState<Cart | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [alert, setAlert] = useState<{
    show: boolean;
    type: "success" | "error";
    message: string;
  }>({ show: false, type: "success", message: "" });

  // Form state
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    companyName: "",
    country: "Egypt",
    streetAddress: "",
    apartment: "",
    city: "",
    governorate: "Giza",
    postcode: "",
    phone: "",
    email: "",
    orderNotes: "",
    createAccount: false,
    shipToDifferent: false,
    paymentMethod: "cash",
    subscribeNewsletter: false,
  });

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

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, type } = e.target;
    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!cart || cart.items.length === 0) {
      setAlert({ show: true, type: "error", message: "Your cart is empty" });
      return;
    }

    try {
      setSubmitting(true);

      const sessionId = localStorage.getItem("cartSessionId");

      const orderData = {
        sessionId: sessionId,
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        streetAddress: formData.streetAddress,
        city: formData.city,
        state: formData.governorate,
        orderNotes: formData.orderNotes || "",
      };

      console.log("Sending order data:", orderData);
      console.log("Form data:", formData);

      const response = await fetch(`${api_url}/orders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      });

      const result = await response.json();
      console.log("API Response:", result);

      if (result.success) {
        // Clear cart
        localStorage.removeItem("cartSessionId");
        setAlert({
          show: true,
          type: "success",
          message: "Order placed successfully!",
        });
        setTimeout(() => navigate("/"), 2000);
      } else {
        setAlert({
          show: true,
          type: "error",
          message: `Failed to place order: ${
            result.message || "Unknown error"
          }`,
        });
      }
    } catch (error) {
      console.error("Error placing order:", error);
      setAlert({ show: true, type: "error", message: "Failed to place order" });
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-purple-600"></div>
      </div>
    );
  }

  if (!cart || cart.items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-20">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Your cart is empty
            </h2>
            <button
              onClick={() => navigate("/")}
              className="inline-block bg-purple-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Billing Details */}
            <div className="bg-white rounded-xl shadow-sm p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Billing details
              </h2>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      First name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Last name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Street address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="streetAddress"
                    value={formData.streetAddress}
                    onChange={handleInputChange}
                    placeholder="House number and street name"
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent mb-2"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Town / City <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    State / County <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="governorate"
                    value={formData.governorate}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                  >
                    <option value="Cairo">Cairo</option>
                    <option value="Giza">Giza</option>
                    <option value="Alexandria">Alexandria</option>
                    <option value="Dakahlia">Dakahlia</option>
                    <option value="Red Sea">Red Sea</option>
                    <option value="Beheira">Beheira</option>
                    <option value="Fayoum">Fayoum</option>
                    <option value="Gharbia">Gharbia</option>
                    <option value="Ismailia">Ismailia</option>
                    <option value="Menofia">Menofia</option>
                    <option value="Minya">Minya</option>
                    <option value="Qaliubiya">Qaliubiya</option>
                    <option value="New Valley">New Valley</option>
                    <option value="Suez">Suez</option>
                    <option value="Aswan">Aswan</option>
                    <option value="Assiut">Assiut</option>
                    <option value="Beni Suef">Beni Suef</option>
                    <option value="Port Said">Port Said</option>
                    <option value="Damietta">Damietta</option>
                    <option value="Sharqia">Sharqia</option>
                    <option value="South Sinai">South Sinai</option>
                    <option value="Kafr El Sheikh">Kafr El Sheikh</option>
                    <option value="Qena">Qena</option>
                    <option value="Sohag">Sohag</option>
                    <option value="North Sinai">North Sinai</option>
                    <option value="Matrouh">Matrouh</option>
                    <option value="Luxor">Luxor</option>
                    <option value="Helwan">Helwan</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phone <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Order notes (optional)
                  </label>
                  <textarea
                    name="orderNotes"
                    value={formData.orderNotes}
                    onChange={handleInputChange}
                    rows={4}
                    placeholder="Notes about your order, e.g. special notes for delivery."
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                  />
                </div>
              </div>
            </div>

            {/* Your Order */}
            <div>
              <div className="bg-white rounded-xl shadow-sm p-8 mb-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Your order
                </h2>

                <div className="space-y-4">
                  <div className="flex justify-between font-semibold text-gray-900 pb-4 border-b">
                    <span>Product</span>
                    <span>Subtotal</span>
                  </div>

                  {cart.items.map((item) => (
                    <div
                      key={item._id}
                      className="flex justify-between text-gray-700 py-2 border-b border-gray-100"
                    >
                      <span>
                        {item.product.name} - {item.color} - {item.size} ×{" "}
                        {item.quantity}
                      </span>
                      <span className="font-semibold">
                        {(item.price * item.quantity).toFixed(2)} EGP
                      </span>
                    </div>
                  ))}

                  <div className="flex justify-between text-xl font-bold text-gray-900 py-4 border-t pt-4">
                    <span>Total</span>
                    <span>{cart.totalPrice.toFixed(2)} EGP</span>
                  </div>
                </div>
              </div>

              {/* Payment Method */}
              <div className="bg-white rounded-xl shadow-sm p-8">
                <div className="space-y-4">
                  <div className="border border-gray-300 rounded-lg p-4">
                    <div className="flex items-center">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="cash"
                        checked={formData.paymentMethod === "cash"}
                        onChange={handleInputChange}
                        className="w-4 h-4 text-purple-600"
                      />
                      <label className="ml-3 text-gray-900 font-medium">
                        Cash on delivery
                      </label>
                    </div>
                    <p className="mt-2 text-sm text-gray-600 ml-7">
                      Pay with cash upon delivery.
                    </p>
                  </div>

                  <p className="text-xs text-gray-600">
                    Your personal data will be used to process your order,
                    support your experience throughout this website, and for
                    other purposes described in our privacy policy.
                  </p>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full bg-red-600 text-white py-4 rounded-lg text-lg font-semibold hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {submitting ? "Placing Order..." : "Place order"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>

      {alert.show && (
        <Alert
          type={alert.type}
          message={alert.message}
          onClose={() => setAlert({ ...alert, show: false })}
        />
      )}
    </div>
  );
};

export default CheckoutPage;
