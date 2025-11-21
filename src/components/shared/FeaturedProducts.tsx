import ProductCard, { type Product } from "../Cards/ProductCard";
import { useState, useEffect } from "react";
import { api_url } from "../../utils/ApiClient";
import Pagination from "./Pagination";

const FeaturedProducts = () => {
  const [selectedCategory, setSelectedCategory] = useState("All Products");
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const itemsPerPage = 8;

  const categories = ["All Products", "Hoodie", "Pants", "Suit", "Crewneck"];

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const categoryParam =
          selectedCategory === "All Products"
            ? ""
            : `&category=${selectedCategory}`;
        const response = await fetch(
          `${api_url}/products?page=${currentPage}&limit=${itemsPerPage}${categoryParam}`
        );
        const result = await response.json();
        if (result.success && result.data) {
          setProducts(result.data);
          setTotalPages(result.pages || 1);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [currentPage, selectedCategory]);

  const filteredProducts = products;

  return (
    <section id="products" className="bg-gray-50 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Featured Products
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Explore our handpicked selection of trending fashion pieces
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex justify-center gap-4 mb-12 flex-wrap">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => {
                setSelectedCategory(category);
                setCurrentPage(1);
              }}
              className={`px-16 py-3 rounded-full font-medium transition-all duration-300 ${
                selectedCategory === category
                  ? "bg-purple-600 text-white shadow-lg"
                  : "bg-white text-gray-700 hover:bg-purple-50 border border-gray-200"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-purple-600"></div>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            {/* Pagination */}
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </>
        )}
      </div>
    </section>
  );
};

export default FeaturedProducts;
