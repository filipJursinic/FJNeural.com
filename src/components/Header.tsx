import { Menu, X, Globe } from 'lucide-react';
import { useState } from 'react';
// import Logo from './Logo';
import { useLanguage } from '../contexts/LanguageContext';

interface HeaderProps {
  scrolled: boolean;
}

export default function Header({ scrolled }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { language, toggleLanguage, t } = useLanguage();

  const navLinks = [
    { href: '#about', label: t('nav_about') },
    { href: '#services', label: t('nav_services') },
    // { href: '#testimonials', label: t('nav_testimonials') },
    { href: '#contact', label: t('nav_contact') },
    { href: '#privacy', label: t('nav_privacy') }
  ];

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setMobileMenuOpen(false);
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-[#1a0040]/95 backdrop-blur-lg shadow-lg shadow-[#36009C]/20' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-6 pt-4 pb-2">
        <div className="flex justify-center">
          <img
            src="/FJNeuralLogotip.png"
            alt="FJ Neural Logo"
            className="h-16 w-auto transition-all duration-300"
          />
        </div>
      </div>
      <nav className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* <a href="#home" onClick={(e) => scrollToSection(e, '#home')} className="flex items-center">
            <Logo size="sm" />
          </a> */}

          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => scrollToSection(e, link.href)}
                className="text-white/80 hover:text-[#00C2BA] transition-colors duration-300 font-medium"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <button
              onClick={toggleLanguage}
              className="flex items-center space-x-2 px-4 py-2 text-white/80 hover:text-[#00C2BA] transition-colors duration-300 font-medium"
              aria-label="Toggle language"
            >
              <Globe size={20} />
              <span>{language === 'en' ? 'SL' : 'EN'}</span>
            </button>
            <a
              href="#contact"
              onClick={(e) => scrollToSection(e, '#contact')}
              className="px-6 py-2.5 bg-gradient-to-r from-[#00C2BA] to-[#9765E0] rounded-full font-semibold hover:shadow-lg hover:shadow-[#00C2BA]/50 transition-all duration-300 ripple"
            >
              {language === 'en' ? "Let's Talk" : 'Povežimo se'}
            </a>
          </div>

          <button
            className="md:hidden text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden mt-4 py-4 space-y-4 bg-[#36009C]/90 rounded-lg backdrop-blur-lg">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => scrollToSection(e, link.href)}
                className="block px-4 py-2 text-white/80 hover:text-[#00C2BA] transition-colors duration-300"
              >
                {link.label}
              </a>
            ))}
            <button
              onClick={toggleLanguage}
              className="flex items-center justify-center space-x-2 w-full px-4 py-2 text-white/80 hover:text-[#00C2BA] transition-colors duration-300 font-medium"
            >
              <Globe size={20} />
              <span>{language === 'en' ? 'Slovenščina' : 'English'}</span>
            </button>
            <a
              href="#contact"
              onClick={(e) => scrollToSection(e, '#contact')}
              className="block mx-4 px-6 py-2.5 bg-gradient-to-r from-[#00C2BA] to-[#9765E0] rounded-full font-semibold text-center hover:shadow-lg hover:shadow-[#00C2BA]/50 transition-all duration-300"
            >
              {language === 'en' ? "Let's Talk" : 'Povežimo se'}
            </a>
          </div>
        )}
      </nav>
    </header>
  );
}
