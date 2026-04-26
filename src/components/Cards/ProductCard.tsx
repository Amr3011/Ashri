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
      className="bg-slate-800 border border-slate-700 rounded-xl shadow-lg shadow-black/30 overflow-hidden hover:shadow-2xl hover:shadow-black/40 transition-shadow duration-300 block h-full flex flex-col"
    >
      <div className="aspect-square overflow-hidden bg-slate-900 relative">
        <img
          src={product.images[0]}
          alt={product.name}
          className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
        />
        {product.oldPrice && product.oldPrice > product.price && (
          <div className="absolute top-3 right-3 bg-amber-500 text-slate-950 px-4 py-2 rounded-full text-lg font-bold shadow-lg shadow-amber-900/30">
            -
            {Math.round(
              ((product.oldPrice - product.price) / product.oldPrice) * 100,
            )}
            %
          </div>
        )}
      </div>
      <div className="p-5 flex flex-col flex-grow">
        <span className="text-sm text-amber-400 font-medium uppercase tracking-wide">
          {product.category}
        </span>
        <h3 className="text-xl font-bold text-slate-100 mt-2 mb-3 line-clamp-2 min-h-[3.5rem]">
          {product.name}
        </h3>
        <div className="flex flex-col mt-auto gap-3">
          <div className="flex flex-col min-h-[4rem] justify-center">
            <span className="text-2xl font-bold text-slate-100">
              {product.price} EGP
            </span>
            {product.oldPrice && product.oldPrice > product.price ? (
              <span className="text-lg text-slate-400 line-through">
                {product.oldPrice} EGP
              </span>
            ) : (
              <span className="text-lg text-transparent select-none">
                &nbsp;
              </span>
            )}
          </div>
          <button className="w-full bg-amber-500 text-slate-950 px-6 py-2 rounded-lg font-medium hover:bg-amber-400 transition-colors">
            Add to Cart
          </button>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
export type { Product };
