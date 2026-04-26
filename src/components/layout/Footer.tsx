const Footer = () => {
  return (
    <footer
      id="contact"
      className="bg-slate-950 border-t border-slate-800 py-12"
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

          {/* Social Media or Additional Info */}
          <div className="text-center md:text-right">
            <p className="text-slate-400">© 2025 Ashri. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
