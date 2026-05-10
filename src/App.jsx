import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Users, FileText, Download, 
  Database, Info, Calendar, BookOpen,
  Mail, MessageCircle, Send, X, Menu,
  Sparkles, Bell, Lightbulb, Zap, Share2,
  FileSearch, BarChart3, GraduationCap,
  ArrowLeft, FileDown, Clock, Newspaper
} from 'lucide-react';
import { content } from './content';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedMaterial, setSelectedMaterial] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const newsIcons = [<Sparkles size={32} />, <Bell size={32} />, <Lightbulb size={32} />, <Zap size={32} />];
  const materialIcons = {
    methodology: <FileSearch size={32} />,
    datasets: <BarChart3 size={32} />,
    publications: <GraduationCap size={32} />
  };

  const menuItems = [
    { id: 'about', title: content.about.title },
    { id: 'events', title: content.events.title },
    { id: 'team', title: content.team.title },
    { id: 'materials', title: content.materials.title },
    { id: 'contacts', title: 'Контакты' }
  ];

  // Global Hash Change Listener
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      setIsMenuOpen(false);

      if (hash.startsWith('#materials/')) {
        const id = hash.replace('#materials/', '');
        setSelectedMaterial(id);
        setSelectedEvent(null);
        window.scrollTo(0, 0);
      } else if (hash.startsWith('#events/')) {
        const id = hash.replace('#events/', '');
        setSelectedEvent(id);
        setSelectedMaterial(null);
        window.scrollTo(0, 0);
      } else {
        setSelectedMaterial(null);
        setSelectedEvent(null);
        
        if (hash && hash !== '#' && hash !== '#!') {
          setTimeout(() => {
            const id = hash.replace('#', '');
            const element = document.getElementById(id);
            if (element) {
              const headerOffset = 100;
              const elementPosition = element.getBoundingClientRect().top;
              const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
              window.scrollTo({ top: offsetPosition, behavior: "smooth" });
            }
          }, 150);
        }
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    handleHashChange();
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Body Scroll Lock
  useEffect(() => {
    if (isMenuOpen || selectedMaterial || selectedEvent) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isMenuOpen, selectedMaterial, selectedEvent]);

  const handleMenuClick = (id) => {
    setIsMenuOpen(false);
    window.location.hash = `#${id}`;
  };

  return (
    <div className="min-h-screen bg-white">
      {/* 1. MAIN CONTENT WRAPPER */}
      <div className="content-wrapper">
        <AnimatePresence mode="wait">
          {selectedMaterial ? (
            <motion.div 
              key="material-detail"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.02 }}
              className="fixed inset-0 bg-white py-24 px-8 overflow-y-auto"
              style={{ zIndex: 100 }}
            >
              <div className="container max-w-4xl">
                <div className="flex items-center gap-6 mb-8 mt-12 md:mt-0">
                   <div className="w-16 h-16 bg-sage/5 rounded-2xl flex items-center justify-center text-sage">
                      {materialIcons[selectedMaterial] || <FileSearch size={32} />}
                   </div>
                   <div>
                      <h1 className="text-3xl font-playfair font-bold">
                        {content.materials.items.find(m => m.id === selectedMaterial)?.title}
                      </h1>
                      <p className="text-text-light mt-2">
                        {content.materials.items.find(m => m.id === selectedMaterial)?.description}
                      </p>
                   </div>
                </div>
                <div className="w-full h-px bg-gray-100 mb-12" />
                <div className="space-y-4">
                  {content.materials.items.find(m => m.id === selectedMaterial)?.files.map((file, idx) => (
                    <div key={idx} className="flex flex-col md:flex-row md:items-center justify-between p-6 bg-beige/5 rounded-3xl border border-transparent hover:border-sage/20 hover:bg-white hover:shadow-xl transition-all gap-4">
                      <div className="flex items-center gap-5">
                        <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-sage shadow-sm"><FileDown size={20} /></div>
                        <div>
                          <h4 className="font-bold text-text mb-1">{file.name}</h4>
                          <div className="flex gap-4 text-[10px] uppercase tracking-wider text-gray-400 font-bold">
                            <span>{file.size}</span>
                            <span>•</span>
                            <span>{file.date}</span>
                          </div>
                        </div>
                      </div>
                      <button className="btn px-6 py-3 text-xs bg-sage/10 text-sage hover:bg-sage hover:text-white shadow-none">СКАЧАТЬ</button>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ) : selectedEvent ? (
            <motion.div 
              key="event-detail"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.02 }}
              className="fixed inset-0 bg-white py-24 px-8 overflow-y-auto"
              style={{ zIndex: 100 }}
            >
              <div className="container max-w-4xl">
                <div className="flex items-center gap-6 mb-8 mt-12 md:mt-0">
                   <div className="w-16 h-16 bg-powdery/10 rounded-2xl flex items-center justify-center text-powdery"><Newspaper size={32} /></div>
                   <div>
                      <h1 className="text-3xl font-playfair font-bold">
                        {content.events.items.find(e => e.id === selectedEvent)?.title}
                      </h1>
                      <p className="text-powdery font-bold text-xs mt-2 uppercase tracking-widest">{content.events.items.find(e => e.id === selectedEvent)?.date}</p>
                   </div>
                </div>
                <div className="w-full h-px bg-gray-100 mb-12" />
                <div className="prose prose-lg text-text-light">
                   <p className="text-xl mb-6">{content.events.items.find(e => e.id === selectedEvent)?.description}</p>
                   <p>{content.events.items.find(e => e.id === selectedEvent)?.content}</p>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div 
              key="main-landing"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <header className="fixed w-full z-40 py-6 px-8 bg-white/90 backdrop-blur-md border-b border-gray-100">
                <div className="container flex justify-end items-center">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-sage rounded-lg flex items-center justify-center text-white"><Database size={16} /></div>
                    <span className="font-playfair text-xl font-bold text-text">Проект РНФ № 23-18-00480-П</span>
                  </div>
                </div>
              </header>

              <section className="hero-section">
                <div className="hero-content-wrapper">
                  <div className="container relative z-10">
                    <div className="max-w-4xl">
                      <span className="inline-block px-3 py-1 rounded-full bg-sage/10 text-sage font-bold text-[10px] mb-6 uppercase tracking-widest">Исследовательский проект 2026–2027</span>
                      <h1 className="text-4xl md:text-6xl leading-[1.1] font-playfair font-bold text-text">{content.hero.title}</h1>
                      <div className="btn-group-custom">
                        {menuItems.map((item) => (
                          <a key={item.id} href={`#${item.id}`} className="btn">{item.title}</a>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              <section id="about" className="py-24">
                <div className="container">
                  <div className="grid md:grid-cols-[1fr,2fr] gap-16">
                    <div className="sticky top-32">
                      <div className="w-20 h-20 bg-powdery rounded-[30px] flex items-center justify-center text-white mb-6 shadow-xl shadow-powdery/20 rotate-3"><BookOpen size={32} /></div>
                      <h2 className="text-4xl font-playfair font-bold mb-4">{content.about.title}</h2>
                      <div className="w-16 h-1 bg-sage rounded-full" />
                    </div>
                    <div className="space-y-8">
                      {content.about.description.map((p, i) => <p key={i} className="text-xl leading-relaxed text-text-light font-medium">{p}</p>)}
                    </div>
                  </div>
                </div>
              </section>

              <section id="events" className="py-24 bg-beige/5">
                <div className="container">
                  <h2 className="text-4xl font-playfair font-bold mb-16">{content.events.title}</h2>
                  <div className="news-grid-custom">
                    {content.events.items.map((item, i) => (
                      <div key={item.id} className="news-card-custom cursor-pointer" onClick={() => window.location.hash = `#events/${item.id}`}>
                        <span className="card-number">{i + 1}</span>
                        <div className="card-icon">{newsIcons[i % newsIcons.length]}</div>
                        <h3 className="mb-4">{item.title}</h3>
                        <p className="mb-8">{item.description}</p>
                        <div className="card-link">ПОДРОБНОСТИ</div>
                      </div>
                    ))}
                  </div>
                </div>
              </section>

              <section id="team" className="py-24">
                <div className="container text-center">
                  <h2 className="text-4xl font-playfair font-bold mb-4">{content.team.title}</h2>
                  <div className="w-16 h-1 bg-sage rounded-full mx-auto mb-20" />
                  <div className="grid md:grid-cols-3 gap-16">
                    {content.team.members.map((member, i) => (
                      <div key={i}>
                        <div className="w-40 h-40 mx-auto mb-8 bg-sage/5 rounded-[40px] flex items-center justify-center text-sage">
                          <Users size={48} strokeWidth={1} />
                        </div>
                        <h3 className="text-xl font-bold mb-1">{member.name}</h3>
                        <p className="text-sage font-bold text-xs mb-4 uppercase">{member.role}</p>
                        <p className="text-sm text-text-light px-6">{member.bio}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </section>

              <section id="materials" className="py-24 bg-sage/5">
                <div className="container">
                  <h2 className="text-4xl font-playfair font-bold mb-16 text-center">{content.materials.title}</h2>
                  <div className="news-grid-custom max-w-5xl mx-auto">
                    {content.materials.items.map((item, i) => (
                      <div key={item.id} className="news-card-custom cursor-pointer" onClick={() => window.location.hash = `#materials/${item.id}`}>
                        <span className="card-number">{i + 1}</span>
                        <div className="card-icon">{materialIcons[item.id]}</div>
                        <h3>{item.title}</h3>
                        <p>{item.description}</p>
                        <div className="card-link">ПЕРЕЙТИ</div>
                      </div>
                    ))}
                  </div>
                </div>
              </section>

              <section id="contacts" className="py-32 bg-white">
                <div className="container text-center">
                  <h2 className="text-4xl font-playfair font-bold mb-16">Контакты</h2>
                  <div className="flex flex-wrap justify-center gap-12 max-w-4xl mx-auto">
                    <div className="flex items-center gap-4"><Mail className="text-sage" /><a href={`mailto:${content.contacts.email}`} className="font-bold">{content.contacts.email}</a></div>
                    <div className="flex gap-6">
                      <a href="#" className="w-10 h-10 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold">VK</a>
                      <a href="#" className="w-10 h-10 rounded-full bg-blue-400 text-white flex items-center justify-center font-bold">TG</a>
                    </div>
                  </div>
                </div>
              </section>

              <footer className="py-12 border-t border-gray-50 text-center">
                <p className="text-[10px] uppercase tracking-widest text-gray-300">© 2026 Проект «Стратегии самосохранения россиян»</p>
              </footer>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* 2. GLOBAL MENU OVERLAY (Always Last Siblings) */}
      <div className={`menu-overlay ${isMenuOpen ? 'open' : ''}`}>
         <div className="flex flex-col items-center gap-12">
            {menuItems.map((item) => (
              <a 
                key={item.id} 
                href={`#${item.id}`} 
                onClick={(e) => {
                  e.preventDefault();
                  handleMenuClick(item.id);
                }}
                className="menu-link"
              >
                {item.title}
              </a>
            ))}
            <div className="flex gap-8 text-gray-300 mt-8">
               <Share2 size={24} />
               <Mail size={24} />
            </div>
         </div>
      </div>

      {/* 3. ABSOLUTE GLOBAL BURGER BUTTON (The Very Last) */}
      <button 
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className="burger-btn"
        aria-label="Menu"
        style={{ zIndex: 999999 }} // Ultimate priority
      >
        {isMenuOpen ? <X size={24} color="#2d3436" /> : (
          <>
            <span />
            <span />
            <span />
          </>
        )}
      </button>
    </div>
  );
}

export default App;
