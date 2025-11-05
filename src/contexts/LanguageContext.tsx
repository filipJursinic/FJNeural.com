import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'en' | 'sl';

interface LanguageContextType {
  language: Language;
  toggleLanguage: () => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations = {
  en: {
    nav_about: 'About',
    nav_services: 'Services',
    nav_testimonials: 'Testimonials',
    nav_contact: 'Contact',
    hero_title: 'Is *Repetitive* Work *Slowing* Down Your *Growth?*',
    hero_subtitle: 'Every hour your team spends on manual tasks is an hour lost on innovation. While you are stuck in processes, your competitors are winning clients. It is time to break the cycle.',
    hero_cta: 'Automate My Business',
    hero_guarantee: '100% guarantee! If you are not happy with the results, we give you all the money back.',
    hero_phone_placeholder: 'Your phone number',
    hero_phone_submit: 'Submit',
    hero_phone_success: 'Thank you! We\'ll contact you soon.',
    hero_phone_error: 'Please enter a valid phone number',
    about_title: 'The Future of Work is Automated.',
    about_description: 'At FJNeural, we design and implement AI-driven automations that save hours of manual effort every day. From workflow optimization to smart integrations, we help you replace bottlenecks with intelligent systems that never sleep.',
    why_title: 'What This Means For You', // (novo)
    why_item1_title: 'Eliminate Tedious Tasks', // (novo)
    why_item1_desc: 'Automate the work that drains creativity and empower your team to focus on high-impact projects.', // (novo)
    why_item2_title: 'Ensure Perfect Consistency', // (novo)
    why_item2_desc: 'Automation eliminates human error in critical processes, ensuring every task is performed perfectly, every time. Boost quality and build trust.', // (novo)
    why_item3_title: 'Scale Without Limits', // (novo)
    why_item3_desc: 'Grow your operations without increasing your team\'s workload', // (novo)
    services_title: 'AI Automation, Built for You.',
    service1_title: 'Website Creation',
    service1_desc: 'We build high-performance websites that act as your 24/7 sales engine, designed to convert visitors into customers.', // (novo)
    service2_title: 'Social Media Automation',
    service2_desc: 'Stop the manual posting. We automate your entire social media workflow, from scheduling content to analyzing engagement.', // (novo)
    service3_title: 'Customer Support Chatbot',
    service3_desc: 'Don\'t make your customers wait. Our AI chatbots provide instant answers and solve problems 24/7, freeing up your team.', // (novo)
    service4_title: 'Automated Systems',
    service4_desc: 'From outreach and lead generation to social media management and ecommerce workflows — our intelligent systems handle the heavy lifting across your entire business.', // (novo)
    service5_title: 'Scale Your Ad Variations',
    service5_desc: 'Turn one great idea into a hundred different ads. Our AI generates a massive volume of creative variations, ready for any platform or audience.', // (novo)
    service_cta: 'See How It Works',
    testimonials_title: 'Trusted by Businesses That Think Ahead.',
    testimonial1_text: 'FJNeural transformed our workflow completely. We went from spending 20 hours a week on manual data entry to zero. Their automation systems are incredibly intelligent and have paid for themselves ten times over.',
    testimonial1_author: 'Sarah Chen',
    testimonial1_position: 'CEO, TechFlow Solutions',
    testimonial2_text: 'Working with FJNeural was a game-changer. They didn\'t just build us a tool — they gave us back time to focus on strategy. The ROI was visible within the first month.',
    testimonial2_author: 'Marcus Rodriguez',
    testimonial2_position: 'Operations Director, GrowthLabs',
    testimonial3_text: 'I was skeptical about AI automation at first, but FJNeural made it seamless. Their team understood our needs perfectly and delivered a system that feels like it was custom-built for us — because it was.',
    testimonial3_author: 'Emily Watson',
    testimonial3_position: 'Founder, CloudBridge Inc',
    contact_title: 'Let\'s Build Your Future With AI.',
    contact_subtitle: 'Ready to transform your business with intelligent automation? Get in touch.',
    contact_name: 'Name',
    contact_name_placeholder: 'Your name',
    contact_email: 'Email',
    contact_email_placeholder: 'your@email.com',
    contact_message: 'Message',
    contact_phone: 'Phone (optional)',
    contact_phone_placeholder: '+386 XX XXX XXX',
    contact_message_placeholder: 'Tell us about your automation needs...',
    privacy_title: 'Privacy Policy',
    privacy_intro: 'At FJNeural, we take your privacy seriously. This policy outlines how we collect, use, and protect your personal information.',
    privacy_collection_title: 'Information We Collect',
    privacy_collection_desc: 'We collect information you provide directly to us, including your name, email address, phone number, and any messages you send through our contact form. This information is used solely to respond to your inquiries and provide the services you request.',
    privacy_use_title: 'How We Use Your Information',
    privacy_use_desc: 'Your information is used to communicate with you, understand your needs, and deliver our services. We do not sell, trade, or rent your personal information to third parties.',
    privacy_storage_title: 'Data Storage and Security',
    privacy_storage_desc: 'We store your data securely using industry-standard encryption and security practices. Your information is retained only as long as necessary to fulfill the purposes outlined in this policy.',
    privacy_rights_title: 'Your Rights',
    privacy_rights_desc: 'You have the right to access, correct, or delete your personal information at any time. To exercise these rights, please contact us directly.',
    privacy_contact_title: 'Contact Us',
    privacy_contact_desc: 'If you have any questions about this privacy policy, please contact us through our contact form.',
    nav_privacy: 'Privacy',
    contact_send: 'Send Message',
    contact_sending: 'Sending...',
    contact_success: 'Message sent successfully! We\'ll be in touch soon.',
    footer_copyright: '© 2025 FJNeural — Automating the Future.',
  },
  sl: {
    nav_about: 'O nas',
    nav_services: 'Storitve',
    nav_testimonials: 'Mnenja',
    nav_contact: 'Kontakt',
    hero_title: 'Ali *ponavljajoča* se opravila *upočasnjujejo* vašo *rast?*',
    hero_subtitle: 'Vsaka ura, ki jo vaša ekipa porabi za ročna opravila, je ura, izgubljena za inovacije. Medtem ko ste ujeti v procesih, vaša konkurenca pridobiva stranke. Čas je, da prekinete ta krog.',
    hero_cta: 'Avtomatizirajte moje poslovanje',
    hero_guarantee: '100% garancija! Če niste zadovoljni z rezultati, vrnemo vam ves denar.',
    hero_phone_placeholder: 'Vaša telefonska številka',
    hero_phone_submit: 'Pošlji',
    hero_phone_success: 'Hvala! Kmalu vas bomo kontaktirali.',
    hero_phone_error: 'Prosimo vnesite veljavno telefonsko številko',
    about_title: 'Prihodnost dela je avtomatizirana.',
    about_description: 'Pri FJNeural načrtujemo in izvajamo AI-avtomatizacije, ki vsak dan prihranijo ure ročnega dela. Od optimizacije delovnega toka do pametnih integracij vam pomagamo nadomestiti ozka grla z inteligentnimi sistemi, ki nikoli ne spijo.',
    why_title: 'Kaj to pomeni za vas', // (novo)
    why_item1_title: 'Odpravite dolgočasna opravila', // (novo)
    why_item1_desc: 'Avtomatizirajte delo, ki uničuje ustvarjalnost, in omogočite ekipi, da se osredotoči na pomembnejše projekte.', // (novo)
    why_item2_title: 'Zagotovite popolno doslednost', // (novo)
    why_item2_desc: 'Avtomatizacija odpravlja človeške napake v ključnih procesih in zagotavlja, da je vsaka naloga opravljena popolno, vsakič znova. Povečajte kakovost in gradite zaupanje.', // (novo)
    why_item3_title: 'Skalirajte brez omejitev', // (novo)
    why_item3_desc: 'Povečajte obseg poslovanja brez povečanja delovne obremenitve.', // (novo)
    services_title: 'AI avtomatizacija, narejena za vas.',
    service1_title: 'Izdelava spletnih strani',
    service1_desc: 'Gradimo visoko zmogljive spletne strani, ki delujejo kot vaš 24/7 prodajni stroj, zasnovane za pretvorbo obiskovalcev v stranke.', // (novo)
    service2_title: 'Avtomatizacija družbenih medijev',
    service2_desc: 'Ustavite ročno objavljanje. Avtomatiziramo vaš celoten potek dela na družbenih omrežjih, od načrtovanja vsebin do analize odziva.', // (novo)
    service3_title: 'Chatbot za podporo strankam',
    service3_desc: 'Ne pustite strank čakati. Naši AI chatboti nudijo takojšnje odgovore in rešujejo težave 24/7, s čimer razbremenijo vašo ekipo.', // (novo)
    service4_title: 'Avtomatizirani sistemi',
    service4_desc: 'Od iskanja strank in generiranja potencialnih kupcev do upravljanja družbenih medijev in e-trgovinskih procesov — naši inteligentni sistemi opravljajo zahtevno delo v celotnem vašem poslovanju.', // (novo)
    service5_title: 'Skaliranje oglasnih različic',
    service5_desc: 'Spremenite eno dobro idejo v sto različnih oglasov. Naša AI ustvari ogromno število kreativnih različic, pripravljenih za katerokoli platformo ali občinstvo.', // (novo)
    service_cta: 'Oglejte si, kako deluje',
    testimonials_title: 'Zaupajo nam podjetja, ki razmišljajo naprej.',
    testimonial1_text: 'FJNeural je popolnoma spremenil naš delovni tok. Iz 20 ur ročnega vnosa podatkov na teden smo prišli do nič. Njihovi avtomatizacijski sistemi so neverjetno inteligentni in so se povrnili desetkrat.',
    testimonial1_author: 'Sarah Chen',
    testimonial1_position: 'Direktorica, TechFlow Solutions',
    testimonial2_text: 'Delo s FJNeural je bilo prelomnica. Niso nam zgradili samo orodja — vrnili so nam čas za osredotočanje na strategijo. ROI je bil viden že v prvem mesecu.',
    testimonial2_author: 'Marcus Rodriguez',
    testimonial2_position: 'Direktor operacij, GrowthLabs',
    testimonial3_text: 'Sprva sem bil skeptičen glede AI avtomatizacije, vendar je FJNeural to naredil brezhibno. Njihova ekipa je popolnoma razumela naše potrebe in dobavila sistem, ki se zdi, kot da je narejen po meri za nas — ker je bil.',
    testimonial3_author: 'Emily Watson',
    testimonial3_position: 'Ustanoviteljica, CloudBridge Inc',
    contact_title: 'Zgradimo vašo prihodnost z AI.',
    contact_subtitle: 'Pripravljeni za preobrazbo vašega podjetja z inteligentno avtomatizacijo? Stopite v stik.',
    contact_name: 'Ime',
    contact_name_placeholder: 'Vaše ime',
    contact_email: 'Email',
    contact_email_placeholder: 'vas@email.com',
    contact_message: 'Sporočilo',
    contact_phone: 'Telefon',
    contact_phone_placeholder: '+386 XX XXX XXX',
    contact_message_placeholder: 'Povejte nam o vaših potrebah po avtomatizaciji...',
    privacy_title: 'Politika zasebnosti',
    privacy_intro: 'Pri FJNeural jemljemo vašo zasebnost resno. Ta politika opisuje, kako zbiramo, uporabljamo in varujemo vaše osebne podatke.',
    privacy_collection_title: 'Informacije, ki jih zbiramo',
    privacy_collection_desc: 'Zbiramo informacije, ki nam jih posredujete neposredno, vključno z vašim imenom, e-poštnim naslovom, telefonsko številko in sporočili, ki jih pošljete prek našega kontaktnega obrazca. Te informacije uporabljamo izključno za odgovarjanje na vaše poizvedbe in zagotavljanje storitev, ki jih zahtevate.',
    privacy_use_title: 'Kako uporabljamo vaše informacije',
    privacy_use_desc: 'Vaše informacije uporabljamo za komunikacijo z vami, razumevanje vaših potreb in zagotavljanje naših storitev. Vaših osebnih podatkov ne prodajamo, menjamo ali oddajamo tretjim osebam.',
    privacy_storage_title: 'Shranjevanje in varnost podatkov',
    privacy_storage_desc: 'Vaše podatke shranjujemo varno z uporabo industrijskih standardov šifriranja in varnostnih praks. Vaše informacije hranimo samo toliko časa, kolikor je potrebno za izpolnitev namenov, opisanih v tej politiki.',
    privacy_rights_title: 'Vaše pravice',
    privacy_rights_desc: 'Imate pravico do dostopa, popravka ali izbrisa svojih osebnih podatkov kadar koli. Za uveljavljanje teh pravic nas prosimo neposredno kontaktirajte.',
    privacy_contact_title: 'Kontaktirajte nas',
    privacy_contact_desc: 'Če imate kakršna koli vprašanja o tej politiki zasebnosti, nas prosimo kontaktirajte prek našega kontaktnega obrazca.',
    nav_privacy: 'Zasebnost',
    contact_send: 'Pošlji sporočilo',
    contact_sending: 'Pošiljanje...',
    contact_success: 'Sporočilo uspešno poslano! Kmalu vas bomo kontaktirali.',
    footer_copyright: '© 2025 FJNeural — Avtomatiziramo prihodnost.',
  },
};

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === 'en' ? 'sl' : 'en'));
  };

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations.en] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};