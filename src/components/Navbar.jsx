import { useState } from 'react';
import PropTypes from 'prop-types';

function Navbar({ companyName = 'AutoDev Studio' }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white shadow-sm fixed w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center">
              <span className="text-2xl font-bold text-primary-600">
                {companyName.split(' ')[0]}
              </span>
              <span className="text-2xl font-light text-gray-700">
                {companyName.split(' ').slice(1).join(' ')}
              </span>
            </div>
          </div>

          {/* Desktop menu */}
          <div className="hidden md:flex items-center space-x-8">
            <a
              href="#home"
              className="text-gray-700 hover:text-primary-600 px-3 py-2 text-sm font-medium"
            >
              Home
            </a>
            <a
              href="#services"
              className="text-gray-700 hover:text-primary-600 px-3 py-2 text-sm font-medium"
            >
              Services
            </a>
            <a
              href="#contact"
              className="text-gray-700 hover:text-primary-600 px-3 py-2 text-sm font-medium"
            >
              Contact
            </a>
            <a
              href="mailto:hello@autodev.live"
              className="bg-primary-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-primary-700 transition duration-150"
            >
              Hire Us
            </a>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 hover:text-primary-600 focus:outline-none"
              aria-label="Toggle menu"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <a
              href="#home"
              className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-primary-600 hover:bg-gray-50 rounded-md"
            >
              Home
            </a>
            <a
              href="#services"
              className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-primary-600 hover:bg-gray-50 rounded-md"
            >
              Services
            </a>
            <a
              href="#contact"
              className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-primary-600 hover:bg-gray-50 rounded-md"
            >
              Contact
            </a>
            <a
              href="mailto:hello@autodev.live"
              className="block px-3 py-2 text-base font-medium text-primary-600 hover:text-primary-800 hover:bg-gray-50 rounded-md"
            >
              Hire Us
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}

Navbar.propTypes = {
  companyName: PropTypes.string,
};

export default Navbar;