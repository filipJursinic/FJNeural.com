import { useLanguage } from '../contexts/LanguageContext';

export default function Privacy() {
  const { t } = useLanguage();

  return (
    <section id="privacy" className="relative py-24 px-6 min-h-screen">
      <div className="container mx-auto max-w-4xl">
        <div className="fade-in-section opacity-0 transition-all duration-1000 translate-y-10">
          <div className="bg-gradient-to-br from-[#36009C] to-[#00C2BA] rounded-3xl p-1">
            <div className="bg-[#1a0040]/95 backdrop-blur-sm rounded-3xl p-8 md:p-12">
              <h1 className="text-4xl md:text-5xl font-bold mb-8">
                {t('privacy_title')}
              </h1>

              <div className="space-y-8 text-white/80 leading-relaxed">
                <p className="text-lg">
                  {t('privacy_intro')}
                </p>

                <div>
                  <h2 className="text-2xl font-bold text-white mb-4">
                    {t('privacy_collection_title')}
                  </h2>
                  <p>
                    {t('privacy_collection_desc')}
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-white mb-4">
                    {t('privacy_use_title')}
                  </h2>
                  <p>
                    {t('privacy_use_desc')}
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-white mb-4">
                    {t('privacy_storage_title')}
                  </h2>
                  <p>
                    {t('privacy_storage_desc')}
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-white mb-4">
                    {t('privacy_rights_title')}
                  </h2>
                  <p>
                    {t('privacy_rights_desc')}
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-white mb-4">
                    {t('privacy_contact_title')}
                  </h2>
                  <p>
                    {t('privacy_contact_desc')}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-[#9765E0]/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-[#00C2BA]/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
      </div>
    </section>
  );
}
