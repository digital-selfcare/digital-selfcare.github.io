import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Users, FileText, Download, 
  Database, Info, Calendar, BookOpen,
  Mail, MessageCircle, Send, X, Menu, Home,
  Sparkles, Bell, Lightbulb, Zap, Share2,
  FileSearch, BarChart3, GraduationCap,
  ArrowLeft, ArrowRight, FileDown, Clock, Newspaper,
  User, Award, Briefcase, Microscope, CheckCircle2,
  Archive, History, Layout
} from 'lucide-react';
import { content } from './content';

const VKIcon = ({ size = 24, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M25.54 34.5801C14.6 34.5801 8.3601 27.0801 8.1001 14.6001H13.5801C13.7601 23.7601 17.8 27.6401 21 28.4401V14.6001H26.1602V22.5001C29.3202 22.1601 32.6398 18.5601 33.7598 14.6001H38.9199C38.0599 19.4801 34.4599 23.0801 31.8999 24.5601C34.4599 25.7601 38.5601 28.9001 40.1201 34.5801H34.4399C33.2199 30.7801 30.1802 27.8401 26.1602 27.4401V34.5801H25.54Z" fill="currentColor"/>
  </svg>
);

const DzenIcon = ({ size = 24, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M48,24c0,.24,0,.48-.01.72-9.72.12-15.19.79-18.83,4.44-3.65,3.65-4.31,9.11-4.44,18.83-.24,0-.48.01-.72.01s-.48,0-.72-.01c-.12-9.72-.79-15.19-4.44-18.83C15.2,25.51,9.73,24.84.01,24.72c0-.24-.01-.48-.01-.72s0-.48.01-.72c9.72-.12,15.19-.79,18.83-4.44C22.49,15.2,23.16,9.73,23.28.01c.24,0,.48-.01.72-.01s.48,0,.72.01c.12,9.72.79,15.19,4.44,18.83,3.65,3.65,9.11,4.31,18.83,4.44,0,.24.01.48.01.72Z" fill="currentColor"/>
  </svg>
);

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedMaterial, setSelectedMaterial] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [selectedMember, setSelectedMember] = useState(null);
  const [isArchiveOpen, setIsArchiveOpen] = useState(false);
  const [pendingScroll, setPendingScroll] = useState(null);
  const [currentMemberIndex, setCurrentMemberIndex] = useState(0);
  const [isFeedbackOpen, setIsFeedbackOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success' | 'error' | null

  
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

      if (!hash || hash === '#' || hash === '#!') {
        setSelectedMaterial(null);
        setSelectedEvent(null);
        setSelectedMember(null);
        setIsArchiveOpen(false);
        return;
      }

      if (hash === '#events/archive') {
        setIsArchiveOpen(true);
        setSelectedEvent(null);
        setSelectedMaterial(null);
        setSelectedMember(null);
        window.scrollTo(0, 0);
      } else if (hash.startsWith('#materials/')) {
        setSelectedMaterial(hash.replace('#materials/', ''));
        setIsArchiveOpen(false);
        setSelectedEvent(null);
        setSelectedMember(null);
        window.scrollTo(0, 0);
      } else if (hash.startsWith('#events/')) {
        const path = hash.replace('#events/', '');
        if (path === 'archive') {
          setIsArchiveOpen(true);
          setSelectedEvent(null);
          setSelectedMaterial(null);
          setSelectedMember(null);
        } else if (path.startsWith('archive/')) {
          setSelectedEvent(path.replace('archive/', ''));
          setIsArchiveOpen(true); // Keep archive state so we return to it
          setSelectedMaterial(null);
          setSelectedMember(null);
        } else {
          setSelectedEvent(path);
          setIsArchiveOpen(false);
          setSelectedMaterial(null);
          setSelectedMember(null);
        }
        window.scrollTo(0, 0);
      } else if (hash.startsWith('#team/')) {
        setSelectedMember(hash.replace('#team/', ''));
        setIsArchiveOpen(false);
        setSelectedMaterial(null);
        setSelectedEvent(null);
        window.scrollTo(0, 0);
      } else if (hash.startsWith('#')) {
        const id = hash.replace('#', '');
        if (id && id !== '!' && id !== '') {
          if (selectedMaterial || selectedEvent || selectedMember || isArchiveOpen) {
            returningFromSubpage.current = true;
            setPendingScroll(id);
            setSelectedMaterial(null);
            setSelectedEvent(null);
            setSelectedMember(null);
            setIsArchiveOpen(false);
          } else {
            performScroll(id);
          }
        } else {
          setSelectedMaterial(null);
          setSelectedEvent(null);
          setSelectedMember(null);
          setIsArchiveOpen(false);
        }
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    handleHashChange();
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [selectedMaterial, selectedEvent, selectedMember, isArchiveOpen]);

  useEffect(() => {
    if (!selectedMaterial && !selectedEvent && !selectedMember && !isArchiveOpen && pendingScroll) {
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
  }, [selectedMaterial, selectedEvent, selectedMember, isArchiveOpen, pendingScroll]);

  useEffect(() => {
    document.body.style.overflow = (isMenuOpen) ? 'hidden' : 'unset';
  }, [isMenuOpen]);

  const handleBack = () => {
    const hash = window.location.hash;
    if (!hash || hash === '#' || hash === '#!') {
      window.location.hash = '#';
      return;
    }

    const parts = hash.split('/');
    if (parts.length > 1) {
      // Remove last segment to go up one level
      parts.pop();
      window.location.hash = parts.join('/');
    } else {
      // Top level subpage (e.g. #team), go to home section
      const sectionId = hash.replace('#', '');
      window.location.hash = `#${sectionId}`;
      // Logic in handleHashChange handles the "returningFromSubpage" scroll
    }
  };

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
  const latestEvents = content.events.items.slice(0, 3);
  const archiveEvents = content.events.items.slice(3);

  return (
    <div className="min-h-screen bg-white">
      {/* Mobile Top Navigation Bar */}
      <div className="mobile-top-nav">
        <div className="mobile-nav-container">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="nav-icon-btn burger-icon" aria-label="Меню">
            {isMenuOpen ? <X size={24} color="#2d3436" /> : (
              <div className="burger-lines"><span /><span /><span /></div>
            )}
          </button>
          
          <div className="mobile-nav-right">
            {(selectedMember || isArchiveOpen || selectedEvent || selectedMaterial) && (
              <button className="nav-icon-btn back-icon" onClick={handleBack} aria-label="Назад">
                <ArrowLeft size={24} />
              </button>
            )}
            
            <button 
              className="nav-icon-btn home-icon" 
              onClick={() => { window.location.hash = '#'; window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              aria-label="На главную"
            >
              <Home size={24} />
            </button>
          </div>
        </div>
      </div>

      {/* Desktop Navigation Elements (Hidden on mobile) */}
      <div className="desktop-nav-controls">
        <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="burger-btn" aria-label="Menu">
          {isMenuOpen ? <X size={24} color="#2d3436" /> : (
            <div className="burger-lines"><span /><span /><span /></div>
          )}
        </button>

        {(selectedMember || isArchiveOpen || selectedEvent || selectedMaterial) && (
          <button className="back-btn" onClick={handleBack} aria-label="Назад">
            <ArrowLeft size={28} strokeWidth={3} />
          </button>
        )}

        <button 
          className={`home-btn ${(selectedMember || isArchiveOpen || selectedEvent || selectedMaterial) ? 'shifted' : ''}`} 
          onClick={() => { window.location.hash = '#'; window.scrollTo({ top: 0, behavior: 'smooth' }); }} 
          aria-label="На главную"
        >
          <Home size={28} strokeWidth={2.5} />
        </button>
      </div>

      <div className={`menu-overlay ${isMenuOpen ? 'open' : ''}`}>
         <div className="flex flex-col items-center gap-12">
            {menuItems.map((item) => (
              <a key={item.id} href={`#${item.id}`} onClick={(e) => { e.preventDefault(); handleMenuClick(item.id); }} className="menu-link">{item.title}</a>
            ))}
         </div>
      </div>

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
          ) : isArchiveOpen ? (
            <motion.div key="archive-page" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-white py-24 px-8 overflow-y-auto" style={{ zIndex: 100 }}>
              <div className="container max-w-4xl">
                <h1 className="text-4xl font-playfair font-bold mb-12 mt-12 md:mt-0">Архив новостей</h1>
                <div className="space-y-6">
                  {archiveEvents.map((event) => (
                    <div key={event.id} onClick={() => window.location.hash = `#events/archive/${event.id}`} className="flex items-center justify-between p-6 bg-beige/5 rounded-3xl cursor-pointer hover:bg-white hover:shadow-lg transition-all group">
                      <div className="flex items-center gap-6">
                        <span className="text-sm font-bold text-sage opacity-60 w-24">{event.date}</span>
                        <h3 className="text-lg font-bold group-hover:text-sage transition-colors">{event.title}</h3>
                      </div>
                      <ArrowRight size={20} className="text-gray-300 group-hover:text-sage" />
                    </div>
                  ))}
                  {archiveEvents.length === 0 && <p className="text-gray-400 italic">В архиве пока нет записей.</p>}
                </div>
              </div>
            </motion.div>
          ) : selectedMember ? (
            <motion.div key="member-detail" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="member-detail-overlay">
              <div className="container max-w-5xl">
                
                <div className="team-detail-split">
                  <div className="split-image-main">
                    <div className="placeholder-img" style={{ backgroundColor: getMemberColor(content.team.members.indexOf(activeMember)) }}>
                      {activeMember?.image && (
                        <img 
                          src={activeMember.image} 
                          alt={activeMember.name} 
                          loading="eager"
                          decoding="async"
                        />
                      )}
                    </div>
                  </div>
                  <div className="split-image-detail">
                    <div className="placeholder-img" style={{ backgroundColor: getMemberColor(content.team.members.indexOf(activeMember)), opacity: 0.1 }}>
                      <Microscope size={120} className="text-sage" />
                    </div>
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
                    <div className="mb-12 pb-8 border-b border-gray-100">
                      <h1 className="text-4xl font-playfair font-bold text-text mb-3">{activeMember?.name}</h1>
                      <p className="text-sage font-bold tracking-widest uppercase text-sm">{activeMember?.role}</p>
                    </div>
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
              {/* Header removed as grant number moved to Hero section */}


              <section className="hero-section">
                <div className="hero-content-wrapper">
                  <div className="container relative z-10">
                    <div className="max-w-4xl mx-auto">
                      <div className="hero-header-logos">
                        <div className="hero-logo-group">
                          <span className="hero-grant-number">Проект РНФ № 23-18-00480-П</span>
                          <div className="hero-logo-box">
                            <img src="/logos/rnf-logo-perfect.png" alt="РНФ" className="hero-logo-img rnf" />
                          </div>
                        </div>
                        <div className="hero-logo-box">
                          <img src="/logos/psu-logo.png" alt="ПГНИУ" className="hero-logo-img psu" />
                        </div>
                      </div>
                      
                      <div className="hero-text-content">
                        <span className="inline-block px-3 py-1 rounded-full bg-sage/10 text-sage font-bold text-[10px] mb-6 uppercase tracking-widest">Исследовательский проект 2026–2027</span>
                        <h1 className="text-4xl md:text-6xl leading-[1.1] font-playfair font-bold text-text">{content.hero.title}</h1>
                        <div className="btn-group-custom mt-10">{menuItems.map((item) => (<a key={item.id} href={`#${item.id}`} className="btn">{item.title}</a>))}</div>
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
                    <div className="space-y-8">{content.about.description.map((p, i) => <p key={i} className="text-xl leading-relaxed text-text-light font-medium">{p}</p>)}</div>
                  </div>
                </div>
              </section>

              <section id="events" className="py-24 bg-beige/5">
                <div className="container">
                  <h2 className="text-4xl font-playfair font-bold mb-16">{content.events.title}</h2>
                  <div className="news-grid-custom">
                    {latestEvents.map((item, i) => (
                      <div key={item.id} className="news-card-custom cursor-pointer" onClick={() => window.location.hash = `#events/${item.id}`}>
                        <span className="card-number">{i + 1}</span>
                        <div className="card-icon">{newsIcons[i % newsIcons.length]}</div>
                        <h3 className="mb-4">{item.title}</h3>
                        <p className="mb-8">{item.description}</p>
                        <div className="card-link">ПОДРОБНОСТИ</div>
                      </div>
                    ))}
                    <div className="news-card-custom cursor-pointer archive-card-custom" onClick={() => window.location.hash = '#events/archive'}>
                        <span className="card-number">...</span>
                        <div className="card-icon"><History size={32} /></div>
                        <h3 className="mb-4">Архив новостей</h3>
                        <p className="mb-8">Просмотреть все прошедшие события и публикации проекта.</p>
                        <div className="card-link">ОТКРЫТЬ АРХИВ</div>
                    </div>
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
                            <div className="placeholder-img" style={{ backgroundColor: getMemberColor(i) }}>
                            {member.image && <img src={member.image} alt={member.name} loading="eager" decoding="async" />}
                          </div>
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
                    <div className="carousel-nav">
                       <button onClick={prevMember} className="nav-btn" aria-label="Предыдущий"><ArrowLeft size={24} /></button>
                       <button onClick={nextMember} className="nav-btn" aria-label="Следующий"><ArrowRight size={24} /></button>
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

              <section id="contacts" className="py-32 border-t border-gray-100">
                <div className="container text-center">
                  <div className="inline-flex items-center justify-center w-20 h-20 bg-sage/10 rounded-[30px] text-sage mb-8">
                    <MessageCircle size={40} />
                  </div>
                  <h2 className="text-5xl font-playfair font-bold mb-4">Остались вопросы?</h2>
                  <p className="text-xl text-text-light max-w-2xl mx-auto mb-16">Свяжитесь с нашей командой любым удобным способом — мы всегда открыты к научному диалогу и сотрудничеству.</p>
                  
                  <div className="contacts-grid">
                    <div className="contact-card">
                      <div className="contact-card-icon"><Mail size={32} /></div>
                      <h3>Почта</h3>
                      <p>{content.contacts.email}</p>
                      <button className="contact-card-btn" onClick={() => setIsFeedbackOpen(true)}>НАПИСАТЬ</button>
                    </div>
                    
                    <div className="contact-card">
                      <div className="contact-card-icon"><VKIcon size={32} /></div>
                      <h3>ВКонтакте</h3>
                      <p>Официальное сообщество проекта (в процессе создания).</p>
                      <button className="contact-card-btn opacity-50 cursor-default">СКОРО</button>
                    </div>
                    
                    <div className="contact-card">
                      <div className="contact-card-icon"><DzenIcon size={32} /></div>
                      <h3>Дзен</h3>
                      <p>Наш блог на платформе Дзен (в процессе создания).</p>
                      <button className="contact-card-btn opacity-50 cursor-default">СКОРО</button>
                    </div>
                    
                    <div className="contact-card">
                      <div className="contact-card-icon"><Send size={32} /></div>
                      <h3>Telegram</h3>
                      <p>Следите за оперативными новостями проекта в нашем канале.</p>
                      <button className="contact-card-btn" onClick={() => window.open(content.contacts.telegram, '_blank')}>ПОДПИСАТЬСЯ</button>
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

      <AnimatePresence>
        {isFeedbackOpen && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }}
            className="feedback-modal-overlay"
            onClick={() => setIsFeedbackOpen(false)}
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="feedback-modal-content"
              onClick={(e) => e.stopPropagation()}
            >
              <button className="modal-close-btn" onClick={() => setIsFeedbackOpen(false)}>
                <X size={24} />
              </button>
              
              <div className="modal-header">
                <div className="modal-icon-container">
                  <Mail size={40} />
                </div>
                <h2 className="modal-title">Напишите нам</h2>
                <p className="modal-email">{content.contacts.email}</p>
              </div>

              <form 
                className="feedback-form" 
                action={`https://formsubmit.co/${content.contacts.email}`}
                method="POST"
              >
                {/* Скрытые настройки для FormSubmit */}
                <input type="hidden" name="_captcha" value="false" />
                <input type="hidden" name="_subject" value="Новое сообщение с сайта гранта" />
                <input type="hidden" name="_template" value="table" />
                <input type="hidden" name="_next" value={window.location.href} />
                
                <div className="feedback-form-group">
                  <label className="feedback-form-label">Ваше имя</label>
                  <input name="name" type="text" className="feedback-form-input" placeholder="Иван Иванов" required disabled={isSubmitting} />
                </div>
                <div className="feedback-form-group">
                  <label className="feedback-form-label">Ваш Email</label>
                  <input name="email" type="email" className="feedback-form-input" placeholder="example@mail.ru" required disabled={isSubmitting} />
                </div>
                <div className="feedback-form-group">
                  <label className="feedback-form-label">Сообщение</label>
                  <textarea name="message" className="feedback-form-textarea" placeholder="Напишите здесь ваше сообщение, вопрос или предложение по сотрудничеству..." required disabled={isSubmitting}></textarea>
                </div>
                
                <button 
                  type="submit" 
                  className="feedback-form-submit"
                >
                  ОТПРАВИТЬ ПИСЬМО
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}

export default App;
