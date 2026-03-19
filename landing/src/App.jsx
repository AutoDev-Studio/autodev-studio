import Hero from './components/Hero';
import Features from './components/Features';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Hero />
      <Features />
      <div className="flex-grow" />
      <Footer />
    </div>
  );
}

export default App;
