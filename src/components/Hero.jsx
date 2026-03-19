import PropTypes from 'prop-types';

function Hero({
  title = 'Build Your Digital Vision',
  description = 'We craft custom web applications, automate workflows, and build digital solutions that scale.',
  primaryCTA = 'Start Your Project',
  secondaryCTA = 'Our Services',
}) {
  return (
    <section
      id="home"
      className="pt-24 pb-16 md:pt-32 md:pb-24 bg-gradient-to-br from-primary-50 to-white"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-2 lg:gap-8 items-center">
          <div className="mb-12 lg:mb-0">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
              {title.split(' ').map((word, index) => (
                <span key={index}>
                  {word === 'Digital' || word === 'Vision' ? (
                    <span className="text-primary-600">{word} </span>
                  ) : (
                    word + ' '
                  )}
                </span>
              ))}
            </h1>
            <p className="text-lg md:text-xl text-gray-600 mb-8 leading-relaxed">
              {description}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="#contact"
                className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 transition duration-150"
              >
                {primaryCTA}
              </a>
              <a
                href="#services"
                className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 transition duration-150"
              >
                {secondaryCTA}
              </a>
            </div>
          </div>
          <div className="relative">
            <div className="bg-white rounded-xl shadow-xl p-8 transform rotate-3 hover:rotate-0 transition duration-500">
              <div className="space-y-4">
                <div className="h-4 bg-primary-100 rounded w-3/4"></div>
                <div className="h-4 bg-gray-100 rounded w-full"></div>
                <div className="h-4 bg-gray-100 rounded w-5/6"></div>
                <div className="h-32 bg-gradient-to-r from-primary-500 to-purple-600 rounded-lg mt-6 flex items-center justify-center">
                  <span className="text-white font-bold text-xl">AutoDev Studio</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

Hero.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  primaryCTA: PropTypes.string,
  secondaryCTA: PropTypes.string,
};

export default Hero;