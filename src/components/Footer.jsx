import PropTypes from 'prop-types';

function Footer({ companyName = 'AutoDev Studio', email = 'hello@autodev.live' }) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center mb-4">
              <span className="text-2xl font-bold text-primary-400">
                {companyName.split(' ')[0]}
              </span>
              <span className="text-2xl font-light">
                {companyName.split(' ').slice(1).join(' ')}
              </span>
            </div>
            <p className="text-gray-400 mb-4 max-w-md">
              We build custom web applications, automate workflows, and create
              digital solutions that help businesses scale and succeed.
            </p>
            <p className="text-gray-400">{email}</p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Services</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="#services"
                  className="text-gray-400 hover:text-white transition duration-150"
                >
                  Web Development
                </a>
              </li>
              <li>
                <a
                  href="#services"
                  className="text-gray-400 hover:text-white transition duration-150"
                >
                  Automation
                </a>
              </li>
              <li>
                <a
                  href="#services"
                  className="text-gray-400 hover:text-white transition duration-150"
                >
                  UI/UX Design
                </a>
              </li>
              <li>
                <a
                  href="#services"
                  className="text-gray-400 hover:text-white transition duration-150"
                >
                  DevOps
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="#home"
                  className="text-gray-400 hover:text-white transition duration-150"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="#services"
                  className="text-gray-400 hover:text-white transition duration-150"
                >
                  Services
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  className="text-gray-400 hover:text-white transition duration-150"
                >
                  Contact
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${email}`}
                  className="text-gray-400 hover:text-white transition duration-150"
                >
                  Hire Us
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400">
            &copy; {currentYear} {companyName}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

Footer.propTypes = {
  companyName: PropTypes.string,
  email: PropTypes.string,
};

export default Footer;