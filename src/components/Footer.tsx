import { Facebook, Instagram, Linkedin } from 'lucide-react';
import Logo from './Logo';
import { useLanguage } from '../contexts/LanguageContext';

export default function Footer() {
  const { t } = useLanguage();

  {/* const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }; */}

  const socialLinks = [
    { icon: Facebook, href: 'https://www.facebook.com/profile.php?id=61582474348562', label: 'Facebook' },
    { icon: Instagram, href: 'https://www.instagram.com/fjneural/', label: 'Instagram' },
    { icon: Linkedin, href: 'https://www.linkedin.com/company/fjneural/?viewAsMember=true', label: 'LinkedIn' }
  ];

  return (
    <footer className="relative border-t border-white/10 py-12 px-6">
      <div className="container mx-auto max-w-6xl">
        <div className="flex flex-col items-center space-y-8">
          <Logo size="md" />

          {/* <div className="flex flex-wrap justify-center gap-4 mb-4">
            <a
              href="#privacy"
              onClick={(e) => scrollToSection(e, '#privacy')}
              className="text-white/60 hover:text-[#00C2BA] transition-colors duration-300"
            >
              {t('nav_privacy')}
            </a>
          </div> */}

          <div className="flex gap-6">
            {socialLinks.map((social, index) => {
              const Icon = social.icon;
              return (
                <a
                  key={index}
                  href={social.href}
                  aria-label={social.label}
                  className="p-3 bg-white/5 border border-white/10 rounded-full hover:bg-[#00C2BA]/20 hover:border-[#00C2BA] glow-cyan-hover transition-all duration-300 transform hover:scale-110"
                >
                  <Icon size={24} className="text-white/80 hover:text-[#00C2BA] transition-colors duration-300" />
                </a>
              );
            })}
          </div>

          <p className="text-white/60 text-center">
            {t('footer_copyright')}
          </p>
        </div>
      </div>

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-[600px] h-32 bg-gradient-to-t from-[#36009C]/20 to-transparent blur-2xl"></div>
      </div>
    </footer>
  );
}
