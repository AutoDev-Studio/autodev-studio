import PropTypes from 'prop-types';

function FeatureCard({ title, description }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
      <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}

FeatureCard.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

function Features({
  features = [
    {
      title: 'UI Design',
      description: 'Create beautiful, responsive interfaces with React and Tailwind CSS.',
    },
    {
      title: 'Full-Stack Development',
      description: 'Build complete applications with frontend, backend, and database.',
    },
    {
      title: 'Deployment',
      description: 'Deploy to Netlify, Vercel, or any cloud platform automatically.',
    },
    {
      title: 'Testing',
      description: 'Automated testing with Jest and React Testing Library.',
    },
    {
      title: 'Performance',
      description: 'Optimize for speed, accessibility, and SEO.',
    },
    {
      title: 'Maintenance',
      description: 'Continuous updates and bug fixes without human intervention.',
    },
  ],
}) {
  return (
    <section className="py-12 md:py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-900 mb-12">
          What We Build
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

Features.propTypes = {
  features: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
    })
  ).isRequired,
};

Features.defaultProps = {
  features: [
    {
      title: 'UI Design',
      description: 'Create beautiful, responsive interfaces with React and Tailwind CSS.',
    },
    {
      title: 'Full-Stack Development',
      description: 'Build complete applications with frontend, backend, and database.',
    },
    {
      title: 'Deployment',
      description: 'Deploy to Netlify, Vercel, or any cloud platform automatically.',
    },
    {
      title: 'Testing',
      description: 'Automated testing with Jest and React Testing Library.',
    },
    {
      title: 'Performance',
      description: 'Optimize for speed, accessibility, and SEO.',
    },
    {
      title: 'Maintenance',
      description: 'Continuous updates and bug fixes without human intervention.',
    },
  ],
};

export default Features;
