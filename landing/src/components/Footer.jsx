import PropTypes from 'prop-types';

function Footer({ copyright, links }) {
  return (
    <footer className="bg-gray-900 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 mb-4 md:mb-0">{copyright}</p>
          <div className="flex space-x-6">
            {links.map((link, index) => (
              <a
                key={index}
                href={link.href}
                className="text-gray-400 hover:text-white transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

Footer.propTypes = {
  copyright: PropTypes.string.isRequired,
  links: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      href: PropTypes.string.isRequired,
    })
  ).isRequired,
};

Footer.defaultProps = {
  copyright: '© 2026 AutoDev Studio. All rights reserved.',
  links: [
    { label: 'GitHub', href: 'https://github.com/AutoDev-Studio' },
    { label: 'Twitter', href: 'https://twitter.com/autodevstudio' },
    { label: 'Contact', href: 'mailto:hello@autodev.live' },
  ],
};

export default Footer;
