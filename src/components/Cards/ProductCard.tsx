import { Link } from "react-router-dom";

interface Product {
  _id: string;
  id: string;
  name: string;
  description: string;
  price: number;
  oldPrice?: number;
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
      className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300 block h-full flex flex-col"
    >
      <div className="aspect-square overflow-hidden bg-gray-100 relative">
        <img
          src={product.images[0]}
          alt={product.name}
          className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
        />
        {product.oldPrice && product.oldPrice > product.price && (
          <div className="absolute top-3 right-3 bg-purple-600 text-white px-4 py-2 rounded-full text-lg font-bold shadow-lg">
            -
            {Math.round(
              ((product.oldPrice - product.price) / product.oldPrice) * 100
            )}
            %
          </div>
        )}
      </div>
      <div className="p-5 flex flex-col flex-grow">
        <span className="text-sm text-purple-600 font-medium uppercase tracking-wide">
          {product.category}
        </span>
        <h3 className="text-xl font-bold text-gray-900 mt-2 mb-3 line-clamp-2 min-h-[3.5rem]">
          {product.name}
        </h3>
        <div className="flex flex-col mt-auto gap-3">
          <div className="flex flex-col min-h-[4rem] justify-center">
            <span className="text-2xl font-bold text-gray-900">
              {product.price} EGP
            </span>
            {product.oldPrice && product.oldPrice > product.price ? (
              <span className="text-lg text-gray-500 line-through">
                {product.oldPrice} EGP
              </span>
            ) : (
              <span className="text-lg text-transparent select-none">
                &nbsp;
              </span>
            )}
          </div>
          <button className="w-full bg-purple-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-purple-700 transition-colors">
            Add to Cart
          </button>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
export type { Product };
