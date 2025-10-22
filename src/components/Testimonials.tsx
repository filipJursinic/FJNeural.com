import { Star } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);
  const { t } = useLanguage();

  const testimonials = [
    {
      name: t('testimonial1_author'),
      role: t('testimonial1_position'),
      content: t('testimonial1_text'),
      rating: 5
    },
    {
      name: t('testimonial2_author'),
      role: t('testimonial2_position'),
      content: t('testimonial2_text'),
      rating: 5
    },
    {
      name: t('testimonial3_author'),
      role: t('testimonial3_position'),
      content: t('testimonial3_text'),
      rating: 5
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((current) => (current + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [testimonials.length]);

  return (
    <section id="testimonials" className="relative py-24 px-6">
      <div className="container mx-auto max-w-5xl">
        <div className="fade-in-section opacity-0 transition-all duration-1000 translate-y-10">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">
            {t('testimonials_title')}
          </h2>

          <div className="relative min-h-[300px]">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className={`absolute inset-0 transition-all duration-700 ${
                  index === activeIndex
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-10 pointer-events-none'
                }`}
              >
                <div className="bg-[#1a0040]/50 backdrop-blur-sm border border-[#00C2BA]/30 rounded-2xl p-8 md:p-12 glow-cyan">
                  <div className="flex gap-1 mb-6 justify-center">
                    {Array.from({ length: testimonial.rating }).map((_, i) => (
                      <Star key={i} size={20} className="fill-[#00C2BA] text-[#00C2BA]" />
                    ))}
                  </div>

                  <p className="text-lg md:text-xl text-white/90 leading-relaxed mb-8 text-center italic">
                    "{testimonial.content}"
                  </p>

                  <div className="text-center">
                    <p className="font-semibold text-[#00C2BA] text-lg">
                      {testimonial.name}
                    </p>
                    <p className="text-white/60 text-sm">
                      {testimonial.role}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-center gap-3 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === activeIndex
                    ? 'bg-[#00C2BA] w-8'
                    : 'bg-white/30 hover:bg-white/50'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
