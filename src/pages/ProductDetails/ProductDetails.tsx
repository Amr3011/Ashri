import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { api_url } from "../../utils/ApiClient";
import { addToCart, getSessionId } from "../../utils/cartService";
import Alert from "../../components/shared/Alert";

interface Size {
  name: string;
  quantity: number;
  status: string;
  available: boolean;
}

interface Variant {
  color: string;
  sizes: Size[];
}

interface ProductDetail {
  _id: string;
  id: string;
  name: string;
  description: string;
  price: number;
  images: string[];
  category: string;
  variants: Variant[];
  totalStock: number;
  isActive: boolean;
}

const ProductDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<ProductDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [addingToCart, setAddingToCart] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState<"success" | "error">("success");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${api_url}/products/${id}`);
        const result = await response.json();
        if (result.success && result.data) {
          setProduct(result.data);
          if (result.data.variants.length > 0) {
            setSelectedColor(result.data.variants[0].color);
          }
        }
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProduct();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-purple-600"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-xl text-gray-600">Product not found</p>
      </div>
    );
  }

  const currentVariant = product.variants.find(
    (v) => v.color === selectedColor
  );

  const selectedSizeData = currentVariant?.sizes.find(
    (s) => s.name === selectedSize
  );

  const maxQuantity = selectedSizeData?.quantity || 0;

  const handleQuantityChange = (type: "increment" | "decrement") => {
    if (type === "increment" && quantity < maxQuantity) {
      setQuantity((prev) => prev + 1);
    } else if (type === "decrement" && quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  const handleAddToCart = async () => {
    if (!selectedSize) {
      setAlertMessage("Please select a size");
      setAlertType("error");
      setShowAlert(true);
      return;
    }

    try {
      setAddingToCart(true);
      const sessionId = await getSessionId();

      await addToCart(sessionId, {
        productId: product.id,
        name: product.name,
        price: product.price,
        quantity: quantity,
        size: selectedSize,
        color: selectedColor,
        image: product.images[0],
      });

      // Trigger cart update event
      window.dispatchEvent(new Event("cartUpdated"));
      setAlertMessage("Product added to cart!");
      setAlertType("success");
      setShowAlert(true);
    } catch (error) {
      console.error("Error adding to cart:", error);
      setAlertMessage("Failed to add to cart");
      setAlertType("error");
      setShowAlert(true);
    } finally {
      setAddingToCart(false);
    }
  };

  return (
    <>
      {showAlert && (
        <Alert
          message={alertMessage}
          type={alertType}
          onClose={() => setShowAlert(false)}
        />
      )}
      <div className="bg-white min-h-screen py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Images Section */}
            <div className="space-y-4">
              {/* Main Image */}
              <div className="aspect-square bg-gray-100 rounded-2xl overflow-hidden">
                <img
                  src={product.images[selectedImage]}
                  alt={product.name}
                  className="w-full h-full object-contain"
                />
              </div>

              {/* Thumbnail Images */}
              <div className="grid grid-cols-4 gap-4">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`aspect-square bg-gray-100 rounded-lg overflow-hidden border-2 transition-all ${
                      selectedImage === index
                        ? "border-purple-600"
                        : "border-transparent hover:border-gray-300"
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${product.name} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Product Info Section */}
            <div className="space-y-6">
              <h1 className="text-4xl font-bold text-gray-900">
                {product.name}
              </h1>

              <div className="flex items-center gap-4">
                <span className="text-3xl font-bold text-gray-900">
                  LE {product.price.toFixed(2)} EGP
                </span>
              </div>

              {/* Color Selection */}
              <div className="space-y-3">
                <label className="text-lg font-semibold text-gray-900">
                  Color
                </label>
                <div className="flex gap-3">
                  {product.variants.map((variant) => (
                    <button
                      key={variant.color}
                      onClick={() => {
                        setSelectedColor(variant.color);
                        setSelectedSize("");
                      }}
                      className={`px-6 py-2 rounded-lg font-medium transition-all ${
                        selectedColor === variant.color
                          ? "bg-purple-600 text-white"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      {variant.color}
                    </button>
                  ))}
                </div>
              </div>

              {/* Size Selection */}
              <div className="space-y-3">
                <label className="text-lg font-semibold text-gray-900">
                  Size
                </label>
                <div className="flex gap-3 flex-wrap">
                  {currentVariant?.sizes.map((size) => (
                    <button
                      key={size.name}
                      onClick={() => {
                        setSelectedSize(size.name);
                        setQuantity(1);
                      }}
                      disabled={!size.available}
                      className={`px-6 py-3 rounded-lg font-medium transition-all border-2 ${
                        selectedSize === size.name
                          ? "bg-white text-purple-600 border-purple-600"
                          : size.available
                          ? "bg-white text-gray-700 border-gray-300 hover:border-purple-600"
                          : "bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed line-through"
                      }`}
                    >
                      {size.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity Selector */}
              <div className="space-y-3">
                <label className="text-lg font-semibold text-gray-900">
                  Quantity
                </label>
                <div className="flex items-center gap-4">
                  <div className="flex items-center border-2 border-gray-300 rounded-lg">
                    <button
                      onClick={() => handleQuantityChange("decrement")}
                      disabled={!selectedSize || quantity <= 1}
                      className="px-6 py-3 text-xl font-semibold hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      −
                    </button>
                    <span className="px-8 py-3 text-xl font-semibold border-x-2 border-gray-300">
                      {quantity}
                    </span>
                    <button
                      onClick={() => handleQuantityChange("increment")}
                      disabled={!selectedSize || quantity >= maxQuantity}
                      className="px-6 py-3 text-xl font-semibold hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      +
                    </button>
                  </div>
                  {selectedSize && (
                    <span className="text-sm text-gray-600">
                      Available: {maxQuantity}
                    </span>
                  )}
                </div>
              </div>

              {/* Add to Cart Button */}
              <button
                onClick={handleAddToCart}
                disabled={!selectedSize || addingToCart}
                className="w-full bg-purple-600 text-white py-4 rounded-full text-lg font-semibold hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {addingToCart ? "ADDING..." : "ADD TO CART"}
              </button>

              {/* Product Description */}
              <div className="space-y-4 pt-6 border-t border-gray-200">
                <h2 className="text-2xl font-bold text-gray-900">
                  {product.category}
                </h2>
                <div className="space-y-2">
                  <p className="text-gray-700">{product.description}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetails;
