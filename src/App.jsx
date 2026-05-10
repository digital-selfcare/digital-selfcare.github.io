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
      <section className="min-h-screen flex items-center pt-20 relative overflow-hidden bg-white">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
          <svg viewBox="0 0 1000 1000" className="w-full h-full">
            <path d="M0,500 C200,400 400,600 600,500 C800,400 1000,500 1000,500" stroke="#7d9d85" fill="transparent" strokeWidth="2" />
            <circle cx="200" cy="400" r="100" fill="#d4a5a5" opacity="0.3" />
            <circle cx="800" cy="600" r="150" fill="#f5f1ed" />
          </svg>
        </div>
        
        <div className="container relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <span className="inline-block px-4 py-1 rounded-full bg-sage/10 text-sage font-bold text-sm mb-6">
              Грант РНФ 2026–2027
            </span>
            <h1 className="text-5xl md:text-6xl mb-8 leading-tight">
              {content.hero.title}
            </h1>
            <p className="text-xl text-text-light mb-10 leading-relaxed">
              {content.hero.subtitle}
            </p>
            <div className="flex gap-4">
              <a href="#about" className="btn">{content.hero.cta}</a>
              <a href="#events" className="btn btn-powdery flex items-center gap-2">
                События <ChevronRight size={18} />
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="bg-beige/30">
        <div className="container">
          <h2 className="section-title">{content.about.title}</h2>
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="space-y-6">
              {content.about.description.map((para, i) => (
                <p key={i} className="text-lg leading-relaxed text-text-light">
                  {para}
                </p>
              ))}
            </div>
            <div className="glass p-10 space-y-6">
              <h3 className="text-2xl mb-4">Ожидаемые результаты</h3>
              <ul className="space-y-4">
                {content.about.results.map((res, i) => (
                  <li key={i} className="flex gap-3 items-start">
                    <div className="mt-1 text-sage"><Award size={20} /></div>
                    <span className="font-medium">{res}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* News & Events */}
      <section id="events">
        <div className="container">
          <h2 className="section-title">{content.events.title}</h2>
          <div className="grid gap-8">
            {content.events.items.map((item, i) => (
              <motion.div 
                key={item.id}
                whileHover={{ x: 10 }}
                className="glass p-8 flex flex-col md:flex-row gap-8 items-center border-l-8 border-sage"
                style={{ borderLeftColor: item.status === 'upcoming' ? '#7d9d85' : '#d4a5a5' }}
              >
                <div className="text-center md:text-left min-w-[150px]">
                  <span className="block text-2xl font-bold text-sage">{item.date}</span>
                  <span className="text-sm uppercase tracking-widest text-text-light">{item.type}</span>
                </div>
                <div className="flex-grow">
                  <h3 className="text-2xl mb-2">{item.title}</h3>
                  <p className="text-text-light">{item.description}</p>
                </div>
                <div>
                  {item.status === 'upcoming' ? (
                    <span className="px-4 py-2 rounded-full bg-sage/10 text-sage text-sm font-bold">Ожидается</span>
                  ) : (
                    <span className="px-4 py-2 rounded-full bg-gray-100 text-gray-500 text-sm font-bold">Прошедшее</span>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section id="team" className="bg-sage/5">
        <div className="container">
          <h2 className="section-title">{content.team.title}</h2>
          <div className="grid md:grid-cols-3 gap-10">
            {content.team.members.map((member, i) => (
              <div key={i} className="text-center">
                <div className="w-48 h-48 mx-auto rounded-full bg-white shadow-xl mb-6 overflow-hidden flex items-center justify-center text-sage">
                  <Users size={64} strokeWidth={1} />
                </div>
                <h3 className="text-xl mb-1">{member.name}</h3>
                <p className="text-sage font-bold text-sm mb-4 uppercase">{member.role}</p>
                <p className="text-sm text-text-light">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Materials */}
      <section id="materials">
        <div className="container text-center">
          <h2 className="section-title">{content.materials.title}</h2>
          <p className="text-xl text-text-light mb-12 max-w-2xl mx-auto">
            {content.materials.description}
          </p>
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {content.materials.items.map((item, i) => (
              <a key={i} href={item.link} className="glass p-6 flex justify-between items-center hover:bg-white transition group">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-lg bg-powdery/10 text-powdery"><FileText size={24} /></div>
                  <div className="text-left">
                    <h4 className="font-bold">{item.title}</h4>
                    <span className="text-xs text-text-light uppercase">{item.type}</span>
                  </div>
                </div>
                <Download className="text-gray-300 group-hover:text-sage transition" />
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
