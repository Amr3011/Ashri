import { Link } from "react-router-dom";

interface Product {
  _id: string;
  id: string;
  name: string;
  description: string;
  price: number;
  images: string[];
  category: string;
  variants: Array<{
    color: string;
    sizes: Array<{
      name: string;
      quantity: number;
      status: string;
      available: boolean;
    }>;
  }>;
  totalStock: number;
  isActive: boolean;
}

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <Link
      to={`/product/${product.id}`}
      className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300 block"
    >
      <div className="aspect-square overflow-hidden bg-gray-100">
        <img
          src={product.images[0]}
          alt={product.name}
          className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
        />
      </div>
      <div className="p-5">
        <span className="text-sm text-purple-600 font-medium uppercase tracking-wide">
          {product.category}
        </span>
        <h3 className="text-xl font-bold text-gray-900 mt-2 mb-3">
          {product.name}
        </h3>
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-gray-900">
            {product.price} EGP
          </span>
          <button className="bg-purple-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-purple-700 transition-colors">
            Add to Cart
          </button>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
export type { Product };
