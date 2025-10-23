import { ChevronDown } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext'; // Preverite, ali je pot pravilna

export default function Hero() {
  const { t } = useLanguage();

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  

  // Logika, ki najde besede med zvezdicami in jih stilsko poudari
  const parsedTitle = t('hero_title').split(/(\*.*?\*)/g).map((part, index) => {
    if (part.startsWith('*') && part.endsWith('*')) {
      // Besedam za poudarek dodamo oba stila: 'animate-glow' in 'text-gradient'
      return (
        <span key={index} className="text-gradient">
          {part.substring(1, part.length - 1)}
        </span>
      );
    }
    // Navadno besedilo
    return part;
  });

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center px-6 pt-20">
      <div className="container mx-auto text-center relative z-10">
        <div className="animate-in">
          <div className="flex justify-center mb-8">
            <img
              src="/FJNeuralLogotip.png"
              alt="FJ Neural Logo"
              className="h-24 md:h-32 lg:h-40 w-auto"
            />
          </div>

          {/* POPRAVLJEN NASLOV, ki uporablja zgornjo logiko */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight">
            {parsedTitle}
          </h1>

          <p className="text-lg md:text-xl lg:text-2xl text-white/80 max-w-3xl mx-auto mb-12 leading-relaxed">
            {t('hero_subtitle')}
          </p>

          <a
            href="#contact"
            onClick={(e) => scrollToSection(e, '#contact')}
            className="inline-block px-10 py-4 bg-gradient-to-r from-[#00C2BA] to-[#9765B0] rounded-full text-lg font-semibold hover:shadow-2xl hover:shadow-[#00C2BA]/60 transition-all duration-300 transform hover:scale-105 ripple"
          >
            {t('hero_cta')}
          </a>
        </div>
      </div>

      {/* Spodnji del, ki je manjkal v prejšnjem odgovoru */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
        <ChevronDown size={48} className="text-[#00C2BA]" />
      </div>

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#00C2BA]/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#9765B0]/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
      </div>
    </section>
  );
}