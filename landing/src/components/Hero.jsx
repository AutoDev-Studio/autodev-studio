import PropTypes from 'prop-types';

function Hero({
  title = 'AutoDev Studio',
  tagline = 'Zero-human software development',
  ctaText = 'Get Started',
}) {
  return (
    <section className="bg-gray-50 py-12 md:py-24 lg:py-32">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4">
          {title}
        </h1>
        <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          {tagline}
        </p>
        <button className="bg-red-600 hover:bg-red-700 text-white font-medium py-3 px-8 rounded-lg transition-colors">
          {ctaText}
        </button>
      </div>
    </section>
  );
}

Hero.propTypes = {
  title: PropTypes.string.isRequired,
  tagline: PropTypes.string.isRequired,
  ctaText: PropTypes.string.isRequired,
};

Hero.defaultProps = {
  title: 'AutoDev Studio',
  tagline: 'Zero-human software development',
  ctaText: 'Get Started',
};

export default Hero;
