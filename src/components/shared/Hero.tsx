import Model from "../../../public/assets/Model.jpeg";
const Hero = () => {
  const scrollToProducts = () => {
    const productsSection = document.getElementById("products");
    if (productsSection) {
      productsSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text Content - Left Side */}
          <div className="space-y-6">
            <h1 className="text-5xl md:text-6xl font-bold text-slate-100 leading-tight">
              Discover Your
              <span className="block text-amber-400">Perfect Style</span>
            </h1>
            <p className="text-xl text-slate-300 leading-relaxed">
              Elevate your wardrobe with our curated collection of premium
              clothing. From casual everyday wear to elegant statement pieces,
              we bring you the latest trends and timeless classics that define
              your unique style.
            </p>
            <div className="flex gap-4 pt-4">
              <button
                onClick={scrollToProducts}
                className="bg-amber-500 text-slate-950 px-8 py-3 rounded-lg font-medium hover:bg-amber-400 transition-colors"
              >
                Shop Now
              </button>
              <button
                onClick={scrollToProducts}
                className="border-2 border-slate-500 text-slate-100 px-8 py-3 rounded-lg font-medium hover:bg-slate-800 transition-colors"
              >
                View Collection
              </button>
            </div>
          </div>

          {/* Image - Right Side */}
          <div className="relative">
            <div className="aspect-square rounded-2xl overflow-hidden shadow-2xl border border-slate-700/80">
              <img
                src={Model}
                alt="Fashion Model"
                className="w-full h-full object-cover"
              />
            </div>
            {/* Decorative Element */}
            <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-amber-400 rounded-full opacity-25 blur-2xl"></div>
            <div className="absolute -top-6 -right-6 w-40 h-40 bg-rose-300 rounded-full opacity-20 blur-2xl"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
