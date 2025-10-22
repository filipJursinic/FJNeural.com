import { useLanguage } from '../contexts/LanguageContext';

export default function About() {
  const { t } = useLanguage();

  return (
    <section id="about" className="relative py-24 px-6">
      <div className="container mx-auto max-w-5xl">
        <div className="fade-in-section opacity-0 transition-all duration-1000 translate-y-10">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-center mb-8">
            {t('about_title')}
          </h2>

          <div className="text-lg md:text-xl text-white/80 leading-relaxed space-y-6 text-center max-w-4xl mx-auto">
            <p>
              {t('about_description')}
            </p>
          </div>
        </div>
      </div>

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-0 w-72 h-72 bg-[#534FA5]/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 right-0 w-72 h-72 bg-[#CE95FB]/10 rounded-full blur-3xl"></div>
      </div>
    </section>
  );
}
