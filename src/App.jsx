import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Users, FileText, Download, 
  Database, Info, Calendar, BookOpen,
  Mail, MessageCircle, Send, X, Menu,
  Sparkles, Bell, Lightbulb, Zap, Share2,
  FileSearch, BarChart3, GraduationCap,
  ArrowLeft, FileDown, Clock
} from 'lucide-react';
import { content } from './content';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedMaterial, setSelectedMaterial] = useState(null);

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

  // Prevent scroll when detail view is open
  useEffect(() => {
    if (selectedMaterial) {
      window.scrollTo(0, 0);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [selectedMaterial]);

  if (selectedMaterial) {
    const material = content.materials.items.find(m => m.id === selectedMaterial);
    return (
      <div className="min-h-screen bg-white py-24 px-8 relative overflow-y-auto">
        <div className="container max-w-4xl">
          <button 
            onClick={() => setSelectedMaterial(null)}
            className="flex items-center gap-2 text-sage font-bold uppercase tracking-widest text-xs mb-12 hover:gap-4 transition-all"
          >
            <ArrowLeft size={16} /> Назад к проекту
          </button>

          <div className="flex items-center gap-6 mb-8">
             <div className="w-16 h-16 bg-sage/5 rounded-2xl flex items-center justify-center text-sage">
                {materialIcons[material.id]}
             </div>
             <div>
                <h1 className="text-4xl font-playfair font-bold">{material.title}</h1>
                <p className="text-text-light mt-2">{material.description}</p>
             </div>
          </div>

          <div className="w-full h-px bg-gray-100 mb-12" />

          <div className="space-y-4">
            {material.files.map((file, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="group flex items-center justify-between p-6 bg-beige/5 rounded-3xl border border-transparent hover:border-sage/20 hover:bg-white hover:shadow-xl transition-all"
              >
                <div className="flex items-center gap-5">
                  <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-sage shadow-sm group-hover:bg-sage group-hover:text-white transition-colors">
                    <FileDown size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold text-text mb-1">{file.name}</h4>
                    <div className="flex gap-4 text-[10px] uppercase tracking-wider text-gray-400 font-bold">
                      <span className="flex items-center gap-1"><Info size={10} /> {file.size}</span>
                      <span className="flex items-center gap-1"><Clock size={10} /> {file.date}</span>
                    </div>
                  </div>
                </div>
                <button className="btn px-6 py-3 text-xs bg-sage/10 text-sage hover:bg-sage hover:text-white shadow-none">
                  СКАЧАТЬ
                </button>
              </motion.div>
            ))}
          </div>

          <div className="mt-20 p-8 bg-sage/5 rounded-[40px] border border-dashed border-sage/20 text-center">
             <p className="text-sm text-sage/60 italic">Новые файлы будут добавляться автоматически по мере готовности материалов исследования.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Burger Button - FIXED */}
      <button 
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className="burger-btn"
        aria-label="Menu"
      >
        {isMenuOpen ? (
          <X size={24} color="#2d3436" />
        ) : (
          <>
            <span />
            <span />
            <span />
          </>
        )}
      </button>

      {/* Menu Overlay */}
      <div className={`menu-overlay ${isMenuOpen ? 'open' : ''}`}>
        {menuItems.map((item) => (
          <a 
            key={item.id} 
            href={`#${item.id}`} 
            onClick={() => setIsMenuOpen(false)}
            className="menu-link"
          >
            {item.title}
          </a>
        ))}
      </div>

      {/* Simple Header */}
      {!isMenuOpen && (
        <header className="fixed w-full z-40 py-6 px-8 bg-white/90 backdrop-blur-md border-b border-gray-100">
          <div className="container flex justify-end items-center">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-sage rounded-lg flex items-center justify-center text-white">
                <Database size={16} />
              </div>
              <span className="font-playfair text-xl font-bold text-text tracking-tight">Проект РНФ № 23-18-00480-П</span>
            </div>
          </div>
        </header>
      )}

      {/* Hero Section with Background Image */}
      <section className="hero-section">
        <div className="hero-content-wrapper">
          <div className="container relative z-10">
            <div className="max-w-4xl">
              <span className="inline-block px-3 py-1 rounded-full bg-sage/10 text-sage font-bold text-[10px] mb-6 uppercase tracking-widest">
                Исследовательский проект 2026–2027
              </span>
              <h1 className="text-4xl md:text-6xl leading-[1.1] font-playfair font-bold text-text">
                {content.hero.title}
              </h1>
              
              <div className="btn-group-custom">
                {menuItems.map((item) => (
                  <a key={item.id} href={`#${item.id}`} className="btn px-8 py-4 text-sm transition-all hover:scale-105 active:scale-95">
                    {item.title}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="py-24">
        <div className="container">
          <div className="grid md:grid-cols-[1fr,2fr] gap-16 items-start">
            <div className="sticky top-32">
              <div className="w-20 h-20 bg-powdery rounded-[30px] flex items-center justify-center text-white mb-6 shadow-xl shadow-powdery/20 rotate-3">
                <BookOpen size={32} />
              </div>
              <h2 className="text-4xl font-playfair font-bold mb-4">{content.about.title}</h2>
              <div className="w-16 h-1 bg-sage rounded-full" />
            </div>
            <div className="space-y-8">
              {content.about.description.map((para, i) => (
                <p key={i} className="text-xl leading-relaxed text-text-light font-medium">
                  {para}
                </p>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* News Grid */}
      <section id="events" className="py-24 bg-beige/5">
        <div className="container">
          <div className="mb-16">
            <h2 className="text-4xl font-playfair font-bold mb-4">{content.events.title}</h2>
            <div className="w-16 h-1 bg-powdery rounded-full mb-6" />
          </div>
          
          <div className="news-grid-custom">
            {content.events.items.map((item, i) => (
              <div key={item.id} className="news-card-custom">
                <span className="card-number">{i + 1}</span>
                <div className="card-icon">
                  {newsIcons[i % newsIcons.length]}
                </div>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
                <a href="#" className="card-link">БОЛЕЕ</a>
              </div>
            ))}
            
            <div className="news-card-custom" style={{ background: 'rgba(255,255,255,0.4)', borderStyle: 'dashed' }}>
              <div className="card-icon" style={{ color: '#ccc' }}><Calendar size={32} /></div>
              <h3 style={{ color: '#ccc' }}>АРХИВ СОБЫТИЙ</h3>
              <p style={{ color: '#ccc' }}>Ранее опубликованные материалы</p>
              <a href="#" className="card-link" style={{ color: '#ccc' }}>ПЕРЕЙТИ</a>
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
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

      {/* Materials Grid */}
      <section id="materials" className="py-24 bg-sage/5">
        <div className="container">
          <div className="mb-16 text-center">
            <h2 className="text-4xl font-playfair font-bold mb-4">{content.materials.title}</h2>
            <div className="w-16 h-1 bg-powdery rounded-full mx-auto mb-6" />
          </div>
          
          <div className="news-grid-custom max-w-5xl mx-auto" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))' }}>
            {content.materials.items.map((item, i) => (
              <div 
                key={item.id} 
                className="news-card-custom cursor-pointer" 
                style={{ minHeight: '350px' }}
                onClick={() => setSelectedMaterial(item.id)}
              >
                <span className="card-number">{i + 1}</span>
                <div className="card-icon">
                  {materialIcons[item.id]}
                </div>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
                <div className="card-link mt-auto">ПЕРЕЙТИ</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contacts */}
      <section id="contacts" className="py-32 bg-white">
        <div className="container">
          <h2 className="text-4xl font-playfair font-bold mb-16 text-center">Контакты</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12 max-w-5xl mx-auto">
            <div className="flex items-center gap-6">
              <div className="w-16 h-16 rounded-full border border-gray-100 flex items-center justify-center text-sage shadow-sm shrink-0">
                <Mail size={24} />
              </div>
              <div>
                <h4 className="font-bold text-sm text-text mb-1 uppercase tracking-wider">Оставьте заявку</h4>
                <a href={`mailto:${content.contacts.email}`} className="text-sage font-bold text-sm">Связаться с нами</a>
              </div>
            </div>

            <div className="flex items-center gap-6">
              <div className="w-16 h-16 rounded-full border border-gray-100 flex items-center justify-center text-powdery shadow-sm shrink-0">
                <Users size={24} />
              </div>
              <div>
                <h4 className="font-bold text-sm text-text mb-1 uppercase tracking-wider">Сотрудничество</h4>
                <a href="#" className="text-sage font-bold text-sm">Ваши предложения</a>
              </div>
            </div>

            <div className="flex items-center gap-6">
              <div className="w-16 h-16 rounded-full border border-gray-100 flex items-center justify-center text-blue-400 shadow-sm shrink-0">
                <Share2 size={24} />
              </div>
              <div>
                <h4 className="font-bold text-sm text-text mb-2 uppercase tracking-wider">Напишите нам</h4>
                <div className="flex gap-2">
                  <a href="#" className="w-8 h-8 rounded-lg bg-blue-500 text-white flex items-center justify-center text-xs font-bold">VK</a>
                  <a href="#" className="w-8 h-8 rounded-lg bg-blue-400 text-white flex items-center justify-center text-xs font-bold">TG</a>
                  <a href="#" className="w-8 h-8 rounded-lg bg-green-500 text-white flex items-center justify-center text-xs font-bold">WA</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="py-12 border-t border-gray-50 text-center">
        <p className="text-[10px] uppercase tracking-[0.3em] text-gray-300">
          © 2026 Проект «Стратегии самосохранения россиян»
        </p>
      </footer>
    </div>
  );
}

export default App;
