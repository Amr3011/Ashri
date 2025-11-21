import Model from "../../../public/assets/Model.jpg";
const Hero = () => {
  return (
    <section className="bg-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text Content - Left Side */}
          <div className="space-y-6">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 leading-tight">
              Discover Your
              <span className="block text-purple-600">Perfect Style</span>
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              Elevate your wardrobe with our curated collection of premium
              clothing. From casual everyday wear to elegant statement pieces,
              we bring you the latest trends and timeless classics that define
              your unique style.
            </p>
            <div className="flex gap-4 pt-4">
              <button className="bg-purple-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-purple-700 transition-colors">
                Shop Now
              </button>
              <button className="border-2 border-purple-600 text-purple-600 px-8 py-3 rounded-lg font-medium hover:bg-purple-50 transition-colors">
                View Collection
              </button>
            </div>
          </div>

          {/* Image - Right Side */}
          <div className="relative">
            <div className="aspect-square rounded-2xl overflow-hidden shadow-2xl">
              <img
                src={Model}
                alt="Fashion Model"
                className="w-full h-full object-cover"
              />
            </div>
            {/* Decorative Element */}
            <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-purple-200 rounded-full opacity-50 blur-2xl"></div>
            <div className="absolute -top-6 -right-6 w-40 h-40 bg-pink-200 rounded-full opacity-50 blur-2xl"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
