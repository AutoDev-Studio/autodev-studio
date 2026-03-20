import Hero from './components/Hero';
import Features from './components/Features';
import ContactForm from './components/ContactForm';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Hero />
      <Features />
      <section className="py-12 md:py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-900 mb-8">
            Contact Us
          </h2>
          <p className="text-center text-gray-600 mb-8 max-w-2xl mx-auto">
            Have a project in mind? Get in touch with us and let's discuss how we can help.
          </p>
          <ContactForm />
        </div>
      </section>
      <div className="flex-grow" />
      <Footer />
    </div>
  );
}

export default App;