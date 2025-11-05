import { useEffect, useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import WhyItMatters from './components/WhyItMatters';
import Services from './components/Services';
// import Testimonials from './components/Testimonials';
import Contact from './components/Contact';
import Privacy from './components/Privacy';
import Footer from './components/Footer';
import NeuralBackground from './components/NeuralBackground';
import { LanguageProvider } from './contexts/LanguageContext';

function App() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
        }
      });
    }, observerOptions);

    document.querySelectorAll('.fade-in-section').forEach(el => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <LanguageProvider>
      <div className="min-h-screen bg-neural-pattern text-white overflow-x-hidden">
        <NeuralBackground />
        <Header scrolled={scrolled} />
        <main>
          <Hero />
          <About />
          <WhyItMatters />
          <Services />
          {/* <Testimonials /> */}
          <Privacy />
          <Contact />
        </main>
        <Footer />
      </div>
    </LanguageProvider>
  );
}

export default App;
