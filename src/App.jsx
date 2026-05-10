import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Users, FileText, Download, 
  Database, Info, Calendar, BookOpen,
  Mail, MessageCircle, Send, X, Menu,
  Sparkles, Bell, Lightbulb, Zap, Share2,
  FileSearch, BarChart3, GraduationCap,
  ArrowLeft, ArrowRight, FileDown, Clock, Newspaper,
  User, Award, Briefcase, Microscope, CheckCircle2
} from 'lucide-react';
import { content } from './content';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedMaterial, setSelectedMaterial] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [selectedMember, setSelectedMember] = useState(null);
  const [pendingScroll, setPendingScroll] = useState(null);
  const [currentMemberIndex, setCurrentMemberIndex] = useState(0);
  
  const returningFromSubpage = useRef(false);

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

  const getMemberColor = (index) => {
    const colors = ['#a8dadc', '#f1faee', '#e9c46a', '#f4a261', '#e76f51', '#2a9d8f', '#264653', '#9b59b6'];
    return colors[index % colors.length];
  };

  const performScroll = (id) => {
    const el = document.getElementById(id);
    if (el) {
      const offset = 100;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = el.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
      return true;
    }
    return false;
  };

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      setIsMenuOpen(false);

      if (hash.startsWith('#materials/')) {
        setSelectedMaterial(hash.replace('#materials/', ''));
        setSelectedEvent(null);
        setSelectedMember(null);
        window.scrollTo(0, 0);
      } else if (hash.startsWith('#events/')) {
        setSelectedEvent(hash.replace('#events/', ''));
        setSelectedMaterial(null);
        setSelectedMember(null);
        window.scrollTo(0, 0);
      } else if (hash.startsWith('#team/')) {
        setSelectedMember(hash.replace('#team/', ''));
        setSelectedMaterial(null);
        setSelectedEvent(null);
        window.scrollTo(0, 0);
      } else if (hash.startsWith('#')) {
        const id = hash.replace('#', '');
        if (id && id !== '!' && id !== '') {
          if (selectedMaterial || selectedEvent || selectedMember) {
            returningFromSubpage.current = true;
            setPendingScroll(id);
            setSelectedMaterial(null);
            setSelectedEvent(null);
            setSelectedMember(null);
          } else {
            performScroll(id);
          }
        } else {
          setSelectedMaterial(null);
          setSelectedEvent(null);
          setSelectedMember(null);
        }
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    handleHashChange();
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [selectedMaterial, selectedEvent, selectedMember]);

  useEffect(() => {
    if (!selectedMaterial && !selectedEvent && !selectedMember && pendingScroll) {
      const target = pendingScroll;
      setPendingScroll(null);
      let attempts = 0;
      const tryScroll = () => {
        if (!performScroll(target) && attempts < 10) {
          attempts++;
          setTimeout(tryScroll, 50);
        }
      };
      setTimeout(tryScroll, 100);
    }
  }, [selectedMaterial, selectedEvent, selectedMember, pendingScroll]);

  useEffect(() => {
    document.body.style.overflow = (isMenuOpen) ? 'hidden' : 'unset';
  }, [isMenuOpen]);

  const handleMenuClick = (id) => {
    setIsMenuOpen(false);
    window.location.hash = `#${id}`;
  };

  const nextMember = () => {
    setCurrentMemberIndex((prev) => (prev + 1) % content.team.members.length);
  };

  const prevMember = () => {
    setCurrentMemberIndex((prev) => (prev - 1 + content.team.members.length) % content.team.members.length);
  };

  const activeMember = content.team.members.find(m => m.id === selectedMember);

  return (
    <div className="min-h-screen bg-white">
      <div className="content-wrapper">
        <AnimatePresence mode="wait">
          {selectedMaterial ? (
             <motion.div key="material-detail" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-white py-24 px-8 overflow-y-auto" style={{ zIndex: 100 }}>
             <div className="container max-w-4xl">
               <div className="flex items-center gap-6 mb-8 mt-12 md:mt-0">
                  <div className="w-16 h-16 bg-sage/5 rounded-2xl flex items-center justify-center text-sage">{materialIcons[selectedMaterial] || <FileSearch size={32} />}</div>
                  <div>
                     <h1 className="text-3xl font-playfair font-bold">{content.materials.items.find(m => m.id === selectedMaterial)?.title}</h1>
                     <p className="text-text-light mt-2">{content.materials.items.find(m => m.id === selectedMaterial)?.description}</p>
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
                         <div className="flex gap-4 text-[10px] uppercase tracking-wider text-gray-400 font-bold"><span>{file.size}</span><span>•</span><span>{file.date}</span></div>
                       </div>
                     </div>
                     <button className="btn px-6 py-3 text-xs bg-sage/10 text-sage hover:bg-sage hover:text-white shadow-none">СКАЧАТЬ</button>
                   </div>
                 ))}
               </div>
             </div>
           </motion.div>
          ) : selectedEvent ? (
            <motion.div key="event-detail" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-white py-24 px-8 overflow-y-auto" style={{ zIndex: 100 }}>
            <div className="container max-w-4xl">
              <div className="flex items-center gap-6 mb-8 mt-12 md:mt-0">
                 <div className="w-16 h-16 bg-powdery/10 rounded-2xl flex items-center justify-center text-powdery"><Newspaper size={32} /></div>
                 <div>
                    <h1 className="text-3xl font-playfair font-bold">{content.events.items.find(e => e.id === selectedEvent)?.title}</h1>
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
          ) : selectedMember ? (
            <motion.div key="member-detail" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="member-detail-overlay">
              <div className="container max-w-5xl">
                <button onClick={() => window.location.hash = '#team'} className="flex items-center gap-2 text-sage font-bold text-xs uppercase tracking-widest mb-12 hover:translate-x-[-4px] transition-transform">
                  <ArrowLeft size={16} /> Назад к команде
                </button>
                
                <div className="team-detail-split">
                  <div className="split-image-main">
                    <div className="placeholder-img" style={{ backgroundColor: getMemberColor(content.team.members.indexOf(activeMember)) }} />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-8 text-white">
                      <h1 className="text-3xl font-playfair font-bold mb-2">{activeMember?.name}</h1>
                      <p className="text-sage font-bold tracking-widest uppercase text-xs">{activeMember?.role}</p>
                    </div>
                  </div>
                  <div className="split-image-detail">
                    <div className="placeholder-img opacity-20" style={{ backgroundColor: getMemberColor(content.team.members.indexOf(activeMember) + 2), transform: 'scale(1.5)' }} />
                    <div className="absolute inset-0 flex items-center justify-center p-8 text-center">
                        <div>
                          <Microscope size={40} className="text-sage/30 mx-auto mb-4" />
                          <p className="text-sm font-playfair italic text-gray-500">{activeMember?.specialization}</p>
                        </div>
                    </div>
                  </div>
                </div>

                <div className="member-info-content">
                  <aside className="info-sidebar">
                    <div className="info-block">
                      <h4>Ученая степень</h4>
                      <p className="font-bold text-sm">{activeMember?.title}</p>
                    </div>
                    <div className="info-block">
                      <h4>Специализация</h4>
                      <p className="text-sm text-text-light">{activeMember?.specialization}</p>
                    </div>
                  </aside>

                  <main className="info-main">
                    <section>
                      <h2>О специалисте</h2>
                      <p className="text-lg leading-relaxed text-text-light">{activeMember?.bio}</p>
                    </section>
                    
                    <section>
                      <h2>Достижения</h2>
                      <div className="p-6 bg-sage/5 rounded-3xl border border-sage/10">
                        <p className="text-text-light leading-relaxed">{activeMember?.achievements}</p>
                      </div>
                    </section>

                    <section>
                      <h2>Публикации</h2>
                      <div className="space-y-3">
                        {activeMember?.publications.map((pub, i) => (
                          <div key={i} className="publication-item">
                             <p>{pub}</p>
                          </div>
                        ))}
                      </div>
                    </section>
                  </main>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div key="main-landing" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
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
                      <div className="btn-group-custom">{menuItems.map((item) => (<a key={item.id} href={`#${item.id}`} className="btn">{item.title}</a>))}</div>
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
                    <div className="space-y-8">{content.about.description.map((p, i) => <p key={i} className="text-xl leading-relaxed text-text-light font-medium">{p}</p>)}</div>
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

              <section id="team" className="py-32 bg-white">
                <div className="container">
                  <h2 className="text-5xl font-playfair font-bold mb-16">{content.team.title}</h2>
                  <div className="team-carousel-container">
                    <div className="carousel-track">
                      {content.team.members.map((member, i) => {
                        let status = 'hidden';
                        if (i === currentMemberIndex) status = 'active';
                        else if (i === (currentMemberIndex + 1) % content.team.members.length) status = 'next';
                        
                        return (
                          <div key={member.id} className={`carousel-item-wrapper carousel-item-${status}`} onClick={() => { if (status === 'next') nextMember(); else if (status === 'active') window.location.hash = `#team/${member.id}`; }}>
                            <div className="placeholder-img" style={{ backgroundColor: getMemberColor(i) }} />
                            {status !== 'hidden' && (
                              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="carousel-member-info">
                                <h3 className={status === 'next' ? 'text-lg opacity-50' : 'text-2xl'}>{member.name}</h3>
                                <p className={status === 'next' ? 'text-[8px] opacity-50' : 'text-xs'}>{member.role}</p>
                              </motion.div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                    <div className="carousel-nav" style={{ position: 'relative', bottom: '-40px' }}>
                       <button onClick={prevMember} className="nav-btn"><ArrowLeft size={24} /></button>
                       <button onClick={nextMember} className="nav-btn"><ArrowRight size={24} /></button>
                    </div>
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

      <div className={`menu-overlay ${isMenuOpen ? 'open' : ''}`}>
         <div className="flex flex-col items-center gap-12">
            {menuItems.map((item) => (
              <a key={item.id} href={`#${item.id}`} onClick={(e) => { e.preventDefault(); handleMenuClick(item.id); }} className="menu-link">{item.title}</a>
            ))}
         </div>
      </div>

      <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="burger-btn" aria-label="Menu" style={{ zIndex: 999999 }}>
        {isMenuOpen ? <X size={24} color="#2d3436" /> : (
          <><span /><span /><span /></>
        )}
      </button>
    </div>
  );
}

export default App;
