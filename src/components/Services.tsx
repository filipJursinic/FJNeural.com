import { Globe, Share2, MessageCircle, Send, Palette } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export default function Services() {
  const { t } = useLanguage();

  const services = [
    {
      icon: Globe,
      title: t('service1_title'),
      description: t('service1_desc'),
      gradient: 'from-[#00C2BA] to-[#0099CC]'
    },
    {
      icon: Share2,
      title: t('service2_title'),
      description: t('service2_desc'),
      gradient: 'from-[#0099CC] to-[#6B8DD6]'
    },
    {
      icon: MessageCircle,
      title: t('service3_title'),
      description: t('service3_desc'),
      gradient: 'from-[#6B8DD6] to-[#9765E0]'
    },
    {
      icon: Send,
      title: t('service4_title'),
      description: t('service4_desc'),
      gradient: 'from-[#9765E0] to-[#CE95FB]'
    },
    {
      icon: Palette,
      title: t('service5_title'),
      description: t('service5_desc'),
      gradient: 'from-[#CE95FB] to-[#00C2BA]'
    }
  ];

  {/* const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }; */}

  return (
    <section id="services" className="relative py-24 px-6">
      <div className="container mx-auto max-w-6xl">
        <div className="fade-in-section opacity-0 transition-all duration-1000 translate-y-10">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">
            {t('services_title')}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <div
                  key={index}
                  className="fade-in-section opacity-0 transition-all duration-1000 translate-y-10 group relative overflow-hidden rounded-2xl"
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-10 group-hover:opacity-20 transition-opacity duration-300`}></div>

                  <div className="relative bg-[#1a0040]/80 backdrop-blur-sm border border-white/10 rounded-2xl p-8 h-full card-hover">
                    <div className="mb-6">
                      <div className={`inline-flex p-4 rounded-xl bg-gradient-to-br ${service.gradient}`}>
                        <Icon size={40} className="text-white" strokeWidth={2} />
                      </div>
                    </div>

                    <h3 className="text-2xl font-bold mb-4 text-white">
                      {service.title}
                    </h3>

                    <p className="text-white/70 leading-relaxed">
                      {service.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* <div className="text-center">
            <a
              href="#contact"
              onClick={(e) => scrollToSection(e, '#contact')}
              className="inline-block px-10 py-4 bg-gradient-to-r from-[#00C2BA] to-[#9765E0] rounded-full text-lg font-semibold hover:shadow-2xl hover:shadow-[#00C2BA]/50 transition-all duration-300 transform hover:scale-105 ripple"
            >
              {t('service_cta')}
            </a>
          </div> */}
        </div>
      </div>

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-[#9765E0]/10 rounded-full blur-3xl animate-float"></div>
      </div>
    </section>
  );
}
