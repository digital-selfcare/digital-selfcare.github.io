import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Users, FileText, Mail, ChevronRight, Newspaper, Download, Award } from 'lucide-react';
import { content } from './content';

const App = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'glass py-3' : 'py-6 bg-transparent'}`}>
        <div className="container flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-sage flex items-center justify-center text-white">
              <Award size={24} />
            </div>
            <span className="font-bold text-lg hidden sm:block">РНФ Проект</span>
          </div>
          <nav>
            <ul className="flex gap-8 font-semibold text-sm uppercase tracking-wider">
              <li><a href="#about" className="hover:text-sage transition">О проекте</a></li>
              <li><a href="#events" className="hover:text-sage transition">Новости</a></li>
              <li><a href="#team" className="hover:text-sage transition">Команда</a></li>
              <li><a href="#materials" className="hover:text-sage transition">Материалы</a></li>
            </ul>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="pt-32 pb-16 relative overflow-hidden bg-white">
        <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
          <svg viewBox="0 0 1000 400" className="w-full h-full" preserveAspectRatio="none">
            <path d="M0,200 C200,100 400,300 600,200 C800,100 1000,200" stroke="#7d9d85" fill="transparent" strokeWidth="2" />
          </svg>
        </div>
        
        <div className="container relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <span className="inline-block px-3 py-1 rounded-full bg-sage/10 text-sage font-bold text-xs mb-4">
              Грант РНФ 2026–2027
            </span>
            <h1 className="text-4xl md:text-5xl mb-6 leading-tight">
              {content.hero.title}
            </h1>
            <p className="text-lg text-text-light mb-8 leading-relaxed">
              {content.hero.subtitle}
            </p>
            <div className="flex gap-3">
              <a href="#about" className="btn">{content.hero.cta}</a>
              <a href="#events" className="btn btn-powdery flex items-center gap-2 text-sm">
                События <ChevronRight size={16} />
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="bg-beige/30 py-12">
        <div className="container">
          <h2 className="section-title">{content.about.title}</h2>
          <div className="grid md:grid-cols-2 gap-10 items-start">
            <div className="space-y-4">
              {content.about.description.map((para, i) => (
                <p key={i} className="text-base leading-relaxed text-text-light">
                  {para}
                </p>
              ))}
            </div>
            <div className="glass p-6 space-y-4 border-l-4 border-powdery">
              <h3 className="text-xl mb-2">Ожидаемые результаты</h3>
              <ul className="space-y-2">
                {content.about.results.map((res, i) => (
                  <li key={i} className="flex gap-2 items-start text-sm">
                    <div className="mt-1 text-sage"><Award size={16} /></div>
                    <span className="font-medium">{res}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* News & Events */}
      <section id="events" className="py-12">
        <div className="container">
          <h2 className="section-title">{content.events.title}</h2>
          <div className="grid gap-4">
            {content.events.items.map((item, i) => (
              <motion.div 
                key={item.id}
                whileHover={{ x: 5 }}
                className="glass p-5 flex flex-col md:flex-row gap-6 items-center border-l-4 border-sage"
                style={{ borderLeftColor: item.status === 'upcoming' ? '#7d9d85' : '#d4a5a5' }}
              >
                <div className="text-center md:text-left min-w-[120px]">
                  <span className="block text-xl font-bold text-sage">{item.date}</span>
                  <span className="text-[10px] uppercase tracking-widest text-text-light">{item.type}</span>
                </div>
                <div className="flex-grow">
                  <h3 className="text-lg mb-1">{item.title}</h3>
                  <p className="text-sm text-text-light">{item.description}</p>
                </div>
                <div>
                  {item.status === 'upcoming' ? (
                    <span className="px-3 py-1 rounded-full bg-sage/10 text-sage text-[10px] font-bold">Ожидается</span>
                  ) : (
                    <span className="px-3 py-1 rounded-full bg-gray-100 text-gray-500 text-[10px] font-bold">Прошедшее</span>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section id="team" className="bg-sage/5 py-12">
        <div className="container">
          <h2 className="section-title">{content.team.title}</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {content.team.members.map((member, i) => (
              <div key={i} className="text-center">
                <div className="w-32 h-32 mx-auto rounded-full bg-white shadow-md mb-4 overflow-hidden flex items-center justify-center text-sage">
                  <Users size={40} strokeWidth={1} />
                </div>
                <h3 className="text-lg mb-1">{member.name}</h3>
                <p className="text-sage font-bold text-[10px] mb-2 uppercase">{member.role}</p>
                <p className="text-xs text-text-light px-4">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Materials */}
      <section id="materials" className="py-12">
        <div className="container text-center">
          <h2 className="section-title">{content.materials.title}</h2>
          <p className="text-base text-text-light mb-8 max-w-2xl mx-auto">
            {content.materials.description}
          </p>
          <div className="grid md:grid-cols-2 gap-4 max-w-3xl mx-auto">
            {content.materials.items.map((item, i) => (
              <a key={i} href={item.link} className="glass p-4 flex justify-between items-center hover:bg-white transition group">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-powdery/10 text-powdery"><FileText size={20} /></div>
                  <div className="text-left">
                    <h4 className="font-bold text-sm">{item.title}</h4>
                    <span className="text-[10px] text-text-light uppercase">{item.type}</span>
                  </div>
                </div>
                <Download size={18} className="text-gray-300 group-hover:text-sage transition" />
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-text-dark text-white py-16">
        <div className="container">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="max-w-md text-center md:text-left">
              <p className="opacity-70 text-sm italic mb-4">
                {content.footer.rnf}
              </p>
              <p className="font-bold">
                {content.footer.copyright}
              </p>
            </div>
            <div className="flex gap-6">
              <a href="mailto:contact@example.com" className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center hover:bg-sage hover:border-sage transition">
                <Mail size={20} />
              </a>
              <a href="#" className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center hover:bg-sage hover:border-sage transition">
                <Users size={20} />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
