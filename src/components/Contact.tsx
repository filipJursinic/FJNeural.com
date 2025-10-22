import { useState } from 'react';
import { Send } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export default function Contact() {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle'); // Ponastavimo stanje ob vsakem novem pošiljanju

    try {
      // 1. Pošljemo podatke na našo PHP skripto na strežniku
      const response = await fetch('/poslji-v-airtable.php', { // Pot do vaše PHP datoteke na strežniku
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          // Uporabimo imena, ki jih PHP skripta pričakuje
          ime: formData.name,
          email: formData.email,
          telefonska: formData.phone,
          sporocilo: formData.message,
        }),
      });

      // 2. Preverimo, ali je strežnik odgovoril z uspehom (status 2xx)
      if (response.ok) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', phone: '', message: '' }); // Počistimo obrazec

        // Po 5 sekundah skrijemo sporočilo o uspehu
        setTimeout(() => {
          setSubmitStatus('idle');
        }, 5000);
      } else {
        // Če je prišlo do napake na strežniku (npr. napačen API ključ v PHP)
        const errorData = await response.json();
        console.error('Napaka s strežnika:', errorData);
        setSubmitStatus('error');
      }
    } catch (error) {
      // Če je prišlo do napake v omrežju (uporabnik nima interneta, strežnik ne dela)
      console.error('Napaka pri pošiljanju (fetch):', error);
      setSubmitStatus('error');
    } finally {
      // Ta del se izvede vedno, ne glede na uspeh ali napako
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <section id="contact" className="relative py-24 px-6">
      <div className="container mx-auto max-w-4xl">
        <div className="fade-in-section opacity-0 transition-all duration-1000 translate-y-10">
          <div className="bg-gradient-to-br from-[#36009C] to-[#00C2BA] rounded-3xl p-1">
            <div className="bg-[#1a0040]/95 backdrop-blur-sm rounded-3xl p-8 md:p-12">
              <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">
                {t('contact_title')}
              </h2>

              <p className="text-white/70 text-center mb-10 text-lg">
                {t('contact_subtitle')}
              </p>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-white/80 mb-2 font-medium">
                    {t('contact_name')}
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-[#00C2BA] focus:ring-2 focus:ring-[#00C2BA]/30 transition-all duration-300 text-white placeholder-white/40"
                    placeholder={t('contact_name_placeholder')}
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-white/80 mb-2 font-medium">
                    {t('contact_email')}
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-[#00C2BA] focus:ring-2 focus:ring-[#00C2BA]/30 transition-all duration-300 text-white placeholder-white/40"
                    placeholder={t('contact_email_placeholder')}
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-white/80 mb-2 font-medium">
                    {t('contact_phone')}
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    // Odstranil sem `required`, ker telefon pogosto ni obvezen. Če je, ga dodajte nazaj.
                    className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-[#00C2BA] focus:ring-2 focus:ring-[#00C2BA]/30 transition-all duration-300 text-white placeholder-white/40"
                    placeholder={t('contact_phone_placeholder')}
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-white/80 mb-2 font-medium">
                    {t('contact_message')}
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-[#00C2BA] focus:ring-2 focus:ring-[#00C2BA]/30 transition-all duration-300 text-white placeholder-white/40 resize-none"
                    placeholder={t('contact_message_placeholder')}
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full px-10 py-4 bg-gradient-to-r from-[#00C2BA] to-[#9765E0] rounded-xl text-lg font-semibold hover:shadow-2xl hover:shadow-[#00C2BA]/50 transition-all duration-300 transform hover:scale-[1.02] ripple disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                >
                  {isSubmitting ? (
                    t('contact_sending')
                  ) : (
                    <>
                      {t('contact_send')}
                      <Send size={20} />
                    </>
                  )}
                </button>

                {submitStatus === 'success' && (
                  <div className="text-center text-[#00C2BA] font-medium animate-pulse">
                    {t('contact_success')}
                  </div>
                )}
                {submitStatus === 'error' && (
                  <div className="text-center text-red-400 font-medium animate-pulse">
                    {/* Lahko dodate bolj specifično sporočilo o napaki, če želite */}
                    Failed to send message. Please try again.
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-[#00C2BA]/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#9765E0]/10 rounded-full blur-3xl"></div>
      </div>
    </section>
  );
}
