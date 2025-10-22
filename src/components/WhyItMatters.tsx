import { Clock, Lightbulb, Rocket } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export default function WhyItMatters() {
  const { t } = useLanguage();

  const features = [
    {
      icon: Clock,
      title: t('why_item1_title'),
      description: t('why_item1_desc'),
      color: '#00C2BA'
    },
    {
      icon: Lightbulb,
      title: t('why_item2_title'),
      description: t('why_item2_desc'),
      color: '#9765E0'
    },
    {
      icon: Rocket,
      title: t('why_item3_title'),
      description: t('why_item3_desc'),
      color: '#CE95FB'
    }
  ];

  return (
    <section className="relative py-24 px-6">
      <div className="container mx-auto max-w-6xl">
        <div className="fade-in-section opacity-0 transition-all duration-1000 translate-y-10">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">
            {t('why_title')}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  className="fade-in-section opacity-0 transition-all duration-1000 translate-y-10 bg-[#1a0040]/50 backdrop-blur-sm border border-white/10 rounded-2xl p-8 card-hover"
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <div className="mb-6 relative">
                    <div
                      className="inline-flex p-4 rounded-xl"
                      style={{ backgroundColor: `${feature.color}20` }}
                    >
                      <Icon size={40} style={{ color: feature.color }} strokeWidth={2} />
                    </div>
                    <div
                      className="absolute inset-0 blur-2xl opacity-30"
                      style={{ backgroundColor: feature.color }}
                    ></div>
                  </div>

                  <h3 className="text-2xl font-bold mb-4" style={{ color: feature.color }}>
                    {feature.title}
                  </h3>

                  <p className="text-white/70 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
