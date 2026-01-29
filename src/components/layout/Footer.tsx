const Footer = () => {
  return (
    <footer
      id="contact"
      className="bg-white border-t-2 border-purple-100 py-12"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          {/* Logo Section */}
          <div className="flex justify-center md:justify-start">
            <img
              src="/assets/Logo.png"
              alt="Ashri Logo"
              className="h-32 w-auto"
            />
          </div>

          {/* Contact Info Section */}
          <div className="text-center space-y-4">
            <h3 className="text-xl font-bold mb-4 text-purple-600">
              Contact Us{" "}
            </h3>

           
          
          </div>

          {/* Social Media or Additional Info */}
          <div className="text-center md:text-right">
            <p className="text-gray-600">© 2025 Ashri. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
