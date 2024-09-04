import React from "react";

const Footer = () => {
  return (
    <footer className="bg-black text-white py-11">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-start">
        {/* Logo and Description - 34% width */}
        <div className="w-full md:w-1/3 mb-4 md:mb-0">
          <img
            src="/path-to-logo.png" // Replace with the path to your logo
            alt="Bequant Logo"
            className="w-16 h-16 mb-2"
          />
          <h2 className="text-2xl font-bold">Bequant</h2>
          <p className="text-gray-400 mt-2 max-w-xs">
            Pioneering network optimization that improves speed, reduces latency
            and congestion – along with full visibility.
          </p>
        </div>

        {/* Links Sections - 22% width each */}
        <div className="w-full md:w-2/3 flex flex-col md:flex-row justify-between">
          {/* Product Section */}
          <div className="w-full md:w-2/9 mb-4 md:mb-0">
            <h3 className="text-sm text-gray-400 uppercase tracking-widest mb-4">Product</h3>
            <ul>
              <li className="mb-2">
                <a href="#" className="text-gray-300 hover:text-white">TCP Optimization</a>
              </li>
              <li className="mb-2">
                <a href="#" className="text-gray-300 hover:text-white">Bandwidth Management</a>
              </li>
              <li className="mb-2">
                <a href="#" className="text-gray-300 hover:text-white">Network Visibility</a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white">BQN Platform</a>
              </li>
            </ul>
          </div>

          {/* General Section */}
          <div className="w-full md:w-2/9 mb-4 md:mb-0">
            <h3 className="text-sm text-gray-400 uppercase tracking-widest mb-4">General</h3>
            <ul>
              <li className="mb-2">
                <a href="#" className="text-gray-300 hover:text-white">Customers</a>
              </li>
              <li className="mb-2">
                <a href="#" className="text-gray-300 hover:text-white">Newsroom</a>
              </li>
              <li className="mb-2">
                <a href="#" className="text-gray-300 hover:text-white">Where to Buy</a>
              </li>
              <li className="mb-2">
                <a href="#" className="text-gray-300 hover:text-white">About</a>
              </li>
              <li className="mb-2">
                <a href="#" className="text-gray-300 hover:text-white">Careers</a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white">Contact</a>
              </li>
            </ul>
          </div>

          {/* Social Section */}
          <div className="w-full md:w-2/9">
            <h3 className="text-sm text-gray-400 uppercase tracking-widest mb-4">Social</h3>
            <ul>
              <li className="mb-2">
                <a href="#" className="text-gray-300 hover:text-white">LinkedIn</a>
              </li>
              <li className="mb-2">
                <a href="#" className="text-gray-300 hover:text-white">Twitter</a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white">Facebook</a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Links */}
      <div className="border-t border-gray-700 ">
        <div className="container mx-auto flex justify-between text-gray-400 text-sm">
          <a href="#" className="hover:text-white">Documentation</a>
          <a href="#" className="hover:text-white">Privacy & Cookie Policy</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
