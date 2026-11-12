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
  Archive, History, Layout, ChevronLeft, ChevronRight
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
  const [zoomedImageSrc, setZoomedImageSrc] = useState(null);
  const [zoomedImageList, setZoomedImageList] = useState([]);
  const [zoomedImageIndex, setZoomedImageIndex] = useState(0);
  const [zoomScale, setZoomScale] = useState(1);
  const [panPosition, setPanPosition] = useState({ x: 0, y: 0 });
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  
  // Touch Pinch and Wheel Zoom Refs
  const [touchStartDist, setTouchStartDist] = useState(0);
  const [touchStartScale, setTouchStartScale] = useState(1);
  const lightboxRef = useRef(null);
  const teamScrollRef = useRef(null);

  const scrollTeamLeft = () => {
    if (teamScrollRef.current) {
      teamScrollRef.current.scrollBy({ left: -340, behavior: 'smooth' });
    }
  };

  const scrollTeamRight = () => {
    if (teamScrollRef.current) {
      teamScrollRef.current.scrollBy({ left: 340, behavior: 'smooth' });
    }
  };

  // Progressive preview logic for fast mobile loading
  const getNewsImagePreview = (imgSrc) => {
    if (!imgSrc) return '';
    if (imgSrc.includes('Shlyapina_Stipend1.png')) {
      return imgSrc.replace('.png', '_preview.jpg');
    }
    return imgSrc;
  };

  const openLightbox = (imageList, index) => {
    const list = Array.isArray(imageList) ? imageList : [imageList];
    const fullList = list.map(img => img.startsWith('http') ? img : '/' + img);
    setZoomedImageList(fullList);
    setZoomedImageIndex(index);
    setZoomedImageSrc(fullList[index]);
    setZoomScale(1);
    setPanPosition({ x: 0, y: 0 });
  };

  const showPrevImage = () => {
    if (zoomedImageList.length <= 1) return;
    const newIdx = (zoomedImageIndex - 1 + zoomedImageList.length) % zoomedImageList.length;
    setZoomedImageIndex(newIdx);
    setZoomedImageSrc(zoomedImageList[newIdx]);
    setZoomScale(1);
    setPanPosition({ x: 0, y: 0 });
  };

  const showNextImage = () => {
    if (zoomedImageList.length <= 1) return;
    const newIdx = (zoomedImageIndex + 1) % zoomedImageList.length;
    setZoomedImageIndex(newIdx);
    setZoomedImageSrc(zoomedImageList[newIdx]);
    setZoomScale(1);
    setPanPosition({ x: 0, y: 0 });
  };

  const handleMouseDown = (e) => {
    if (zoomScale <= 1) return;
    e.preventDefault();
    setIsDragging(true);
    setDragStart({ x: e.clientX - panPosition.x, y: e.clientY - panPosition.y });
  };

  const handleMouseMove = (e) => {
    if (!isDragging || zoomScale <= 1) return;
    e.preventDefault();
    setPanPosition({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleTouchStart = (e) => {
    if (e.touches.length === 2) {
      // Pinch to zoom started
      const touch1 = e.touches[0];
      const touch2 = e.touches[1];
      const dist = Math.hypot(touch1.clientX - touch2.clientX, touch1.clientY - touch2.clientY);
      setTouchStartDist(dist);
      setTouchStartScale(zoomScale);
      setIsDragging(false);
    } else if (e.touches.length === 1 && zoomScale > 1) {
      // Normal panning started
      const touch = e.touches[0];
      setIsDragging(true);
      setDragStart({ x: touch.clientX - panPosition.x, y: touch.clientY - panPosition.y });
    }
  };

  const handleTouchMove = (e) => {
    if (e.touches.length === 2 && touchStartDist > 0) {
      // Pinching
      e.preventDefault();
      const touch1 = e.touches[0];
      const touch2 = e.touches[1];
      const dist = Math.hypot(touch1.clientX - touch2.clientX, touch1.clientY - touch2.clientY);
      const factor = dist / touchStartDist;
      const nextScale = Math.min(Math.max(touchStartScale * factor, 1), 4);
      setZoomScale(nextScale);
      if (nextScale === 1) {
        setPanPosition({ x: 0, y: 0 });
      }
    } else if (e.touches.length === 1 && isDragging && zoomScale > 1) {
      // Panning
      e.preventDefault();
      const touch = e.touches[0];
      setPanPosition({
        x: touch.clientX - dragStart.x,
        y: touch.clientY - dragStart.y
      });
    }
  };

  const handleTouchEnd = (e) => {
    setIsDragging(false);
    if (e.touches.length < 2) {
      setTouchStartDist(0);
    }
  };

  const handleDoubleClick = (e) => {
    e.stopPropagation();
    if (zoomScale > 1) {
      setZoomScale(1);
      setPanPosition({ x: 0, y: 0 });
    } else {
      setZoomScale(2.5);
      setPanPosition({ x: 0, y: 0 });
    }
  };

  const closeLightbox = () => {
    setZoomedImageSrc(null);
    setZoomedImageList([]);
    setZoomedImageIndex(0);
    setZoomScale(1);
    setPanPosition({ x: 0, y: 0 });
    setTouchStartDist(0);
  };

  // Keyboard navigation for lightbox
  useEffect(() => {
    if (!zoomedImageSrc) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        closeLightbox();
      } else if (e.key === 'ArrowLeft') {
        showPrevImage();
      } else if (e.key === 'ArrowRight') {
        showNextImage();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [zoomedImageSrc, zoomedImageList, zoomedImageIndex]);

  // Wheel Zoom Listener (Non-passive to allow preventing browser native page zoom)
  useEffect(() => {
    const current = lightboxRef.current;
    if (!current) return;
    
    const onWheel = (e) => {
      if (e.ctrlKey) {
        e.preventDefault();
        const zoomFactor = 0.15;
        const direction = e.deltaY < 0 ? 1 : -1;
        setZoomScale(prev => {
          const next = Math.min(Math.max(prev + direction * zoomFactor, 1), 4);
          if (next === 1) setPanPosition({ x: 0, y: 0 });
          return next;
        });
      }
    };
    
    current.addEventListener('wheel', onWheel, { passive: false });
    return () => {
      current.removeEventListener('wheel', onWheel);
    };
  }, [zoomedImageSrc]);
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
         <div className="menu-list">
            {menuItems.map((item) => (
              <a key={item.id} href={`#${item.id}`} onClick={(e) => { e.preventDefault(); handleMenuClick(item.id); }} className="menu-link">{item.title}</a>
            ))}
         </div>
      </div>

      <div className="content-wrapper">
        <AnimatePresence mode="wait">
          {selectedMaterial ? (
             <motion.div key="material-detail" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="detail-view-overlay fixed inset-0 bg-white py-24 px-8 overflow-y-auto" style={{ zIndex: 100 }}>
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
                       <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-sage shadow-sm">
                         {file.isLink ? <FileText size={20} /> : <FileDown size={20} />}
                       </div>
                       <div>
                         <h4 className="font-bold text-text mb-1">{file.name}</h4>
                         <div className="flex gap-4 text-[10px] uppercase tracking-wider text-gray-400 font-bold"><span>{file.size}</span><span>•</span><span>{file.date}</span></div>
                       </div>
                     </div>
                     <a 
                        href={file.url || `/${file.name}`} 
                        download={file.isLink ? undefined : file.name}
                        target={file.isLink ? "_blank" : undefined}
                        rel="noopener noreferrer"
                        className="btn px-6 py-3 text-xs bg-sage/10 text-sage hover:bg-sage hover:text-white shadow-none text-center inline-block"
                      >
                        {file.btnText || "СКАЧАТЬ"}
                      </a>
                   </div>
                 ))}
               </div>
             </div>
           </motion.div>           ) : selectedEvent ? (
            <motion.div key="event-detail" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="detail-view-overlay fixed inset-0 bg-white py-24 px-8 overflow-y-auto" style={{ zIndex: 100 }}>
              <div className="container max-w-4xl">
                <div className="flex items-center gap-6 mb-8 mt-12 md:mt-0">
                  {content.events.items.find(e => e.id === selectedEvent)?.pdfUrl ? (
                    <a 
                      href={content.events.items.find(e => e.id === selectedEvent)?.pdfUrl} 
                      download={content.events.items.find(e => e.id === selectedEvent)?.pdfName || "article.pdf"}
                      target="_blank" 
                      rel="noopener noreferrer"
                      title="Скачать PDF статьи"
                      className="w-16 h-16 bg-powdery/10 hover:bg-powdery hover:text-white rounded-2xl flex items-center justify-center text-powdery transition-all shadow-sm hover:shadow-md cursor-pointer group flex-shrink-0"
                    >
                      <Newspaper size={32} className="group-hover:scale-110 transition-transform" />
                    </a>
                  ) : (
                    <div className="w-16 h-16 bg-powdery/10 rounded-2xl flex items-center justify-center text-powdery flex-shrink-0">
                      <Newspaper size={32} />
                    </div>
                  )}
                  <div>
                    <h1 className="text-3xl font-playfair font-bold">{content.events.items.find(e => e.id === selectedEvent)?.title}</h1>
                    <p className="text-powdery font-bold text-xs mt-2 uppercase tracking-widest">{content.events.items.find(e => e.id === selectedEvent)?.date}</p>
                  </div>
                </div>
                <div className="w-full h-px bg-gray-100 mb-12" />
                <div className="prose prose-lg text-text-light">
                  <div className="mb-8 content-html" dangerouslySetInnerHTML={{ __html: content.events.items.find(e => e.id === selectedEvent)?.content }} />
                </div>
                {content.events.items.find(e => e.id === selectedEvent)?.image && (
                 <div style={{
                   marginTop: '2rem',
                   marginBottom: '3rem',
                   display: 'grid',
                   gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                   gap: '16px',
                   width: '100%',
                   alignItems: 'stretch'
                 }}>
                   {(Array.isArray(content.events.items.find(e => e.id === selectedEvent).image) 
                     ? content.events.items.find(e => e.id === selectedEvent).image 
                     : [content.events.items.find(e => e.id === selectedEvent).image]
                   ).map((imgSrc, idx) => (
                     <div key={idx} style={{
                       overflow: 'hidden',
                       borderRadius: '16px',
                       boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
                       width: '100%',
                       display: 'flex',
                       alignItems: 'center',
                       justifyContent: 'center',
                       backgroundColor: '#fdfbf7',
                       border: '1px solid #e8e2db',
                       padding: '8px'
                     }}>
                       <img 
                         src={imgSrc.startsWith('http') ? imgSrc : '/' + getNewsImagePreview(imgSrc)} 
                         alt={content.events.items.find(e => e.id === selectedEvent).title} 
                         title="Нажмите для увеличения"
                         style={{
                           width: '100%',
                           height: '100%',
                           maxHeight: '35vh',
                           objectFit: 'cover',
                           borderRadius: '8px',
                           boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)',
                           cursor: 'zoom-in',
                           touchAction: 'none'
                         }}
                         onClick={() => {
                            const allImages = Array.isArray(content.events.items.find(e => e.id === selectedEvent).image)
                              ? content.events.items.find(e => e.id === selectedEvent).image
                              : [content.events.items.find(e => e.id === selectedEvent).image];
                            openLightbox(allImages, idx);
                          }}
                       />
                     </div>
                   ))}
                 </div>
                )}
              </div>
            </motion.div>
          ) : isArchiveOpen ? (
            <motion.div key="archive-page" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="detail-view-overlay fixed inset-0 bg-white py-24 px-8 overflow-y-auto" style={{ zIndex: 100 }}>
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
          ) : (
            <motion.div key="main-landing" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              
              {/* HERO SECTION (MUSEMIND CLINICAL RESEARCH STYLE) */}
              <section className="hero-section">
                <div className="container relative z-10">
                  {/* Institutional Top Bar */}
                  <div className="hero-institution-bar">
                    <div className="hero-grant-pill">
                      <span className="pulse-dot"></span>
                      <span>Проект РНФ № 23-18-00480-П</span>
                    </div>
                    <div className="hero-logos-inline">
                      <div className="hero-logo-box" title="Российский научный фонд">
                        <img src="/logos/rnf-logo-perfect.png" alt="РНФ" />
                      </div>
                      <div className="hero-logo-box" title="Пермский государственный национальный исследовательский университет">
                        <img src="/logos/psu-logo.png" alt="ПГНИУ" />
                      </div>
                    </div>
                  </div>

                  {/* Split Hero Layout */}
                  <div className="hero-inner-split">
                    <div className="hero-content-col">
                      <span className="hero-tag">Исследовательский проект 2026–2027</span>
                      <h1 className="hero-title">{content.hero.title}</h1>
                      <p className="hero-subtitle">
                        Фундаментальное междисциплинарное исследование трансформации моделей заботы о здоровье, рисков и восприятия цифровых технологий в российском обществе.
                      </p>
                      
                      {/* Nav Chips */}
                      <div className="hero-nav-chips">
                        <a href="#about" className="chip-btn primary">
                          <span>О проекте</span>
                          <ArrowRight size={14} />
                        </a>
                        <a href="#events" className="chip-btn">Новости & События</a>
                        <a href="#team" className="chip-btn">Исследователи</a>
                        <a href="#materials" className="chip-btn">Материалы</a>
                        <a href="#contacts" className="chip-btn">Контакты</a>
                      </div>
                    </div>

                    {/* Right Hero Visual Card (As in Musemind Reference) */}
                    <div className="hero-visual-col">
                      <div className="hero-visual-card">
                        <div className="hero-visual-image-box">
                          <img src="/hero-bg.png" alt="Цифровые стратегии здоровья" />
                          <div className="hero-visual-floating-badge">
                            <h4>Здоровье в цифровой среде</h4>
                            <p>Исследование практик селф-трекинга, ИИ-консультаций и преодоления стресса в мегаполисах России</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* SECTION: METRICS ROW (MUSEMIND PISTACHIO / SAGE METRICS SECTION) */}
              <section className="metrics-section">
                <div className="container">
                  <div className="metrics-grid">
                    <div className="metric-item">
                      <div className="metric-num">2026–27</div>
                      <div className="metric-title">Период гранта РНФ</div>
                      <div className="metric-subtitle">Двухлетний исследовательский цикл</div>
                    </div>
                    <div className="metric-item">
                      <div className="metric-num">Scopus Q1</div>
                      <div className="metric-title">Научные публикации</div>
                      <div className="metric-subtitle">Индексируемые статьи и монографии</div>
                    </div>
                    <div className="metric-item">
                      <div className="metric-num">3 города</div>
                      <div className="metric-title">География проекта</div>
                      <div className="metric-subtitle">Пермь, Н.Новгород, Новосибирск</div>
                    </div>
                    <div className="metric-item">
                      <div className="metric-num">2 000+</div>
                      <div className="metric-title">Эмпирическая база</div>
                      <div className="metric-subtitle">Респондентов в репрезентативной выборке</div>
                    </div>
                  </div>
                </div>
              </section>

              {/* SECTION: ABOUT (SPLIT REFERENCE FORMAT) */}
              <section id="about" className="py-24">
                <div className="container">
                  <div className="section-head">
                    <span className="section-tag">Концепция исследования</span>
                    <h2 className="section-title">{content.about.title}</h2>
                  </div>

                  <div className="about-split-row">
                    <div className="about-card-left">
                      <div>
                        <div className="focus-bullet-icon mb-6">
                          <Microscope size={24} />
                        </div>
                        <h3>{content.about.description[0]}</h3>
                        <p className="mt-4">{content.about.description[1]}</p>
                      </div>
                      <div className="mt-8 pt-6 border-t border-gray-100 flex items-center gap-3 text-xs font-bold text-sage uppercase tracking-wider">
                        <CheckCircle2 size={16} />
                        <span>Методология смешанных методов (Mix-Methods Research)</span>
                      </div>
                    </div>

                    <div className="about-card-right">
                      <div className="focus-bullet-card">
                        <div className="focus-bullet-icon"><Users size={22} /></div>
                        <div>
                          <h4>Поколенческая специфика</h4>
                          <p>Дифференциация практик: молодежь активно использует мобильные приложения и трекеры, старшее поколение опирается на традиционные каналы и избирательное доверие.</p>
                        </div>
                      </div>

                      <div className="focus-bullet-card">
                        <div className="focus-bullet-icon"><Lightbulb size={22} /></div>
                        <div>
                          <h4>Искусственный интеллект как фильтр</h4>
                          <p>Изучение сценариев первичной самодиагностики через ИИ-ассистенты и влияния медицинского инфополя на уровень тревожности горожан.</p>
                        </div>
                      </div>

                      <div className="focus-bullet-card">
                        <div className="focus-bullet-icon"><Award size={22} /></div>
                        <div>
                          <h4>Практическая отдача</h4>
                          <p>{content.about.description[2]}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* SECTION: DARK BEYOND MEDICINE STATEMENT (FROM REFERENCE) */}
              <section className="statement-section">
                <div className="container">
                  <div className="statement-content">
                    <span className="statement-tag">Миссия исследовательского проекта</span>
                    <h2 className="statement-headline">
                      Самосохранение в эпоху цифровизации: от рисков к устойчивости
                    </h2>
                    <p className="statement-desc">
                      Мы формируем доказательную базу того, как российские граждане сохраняют физическое и психоэмоциональное здоровье в условиях непрерывных информационных перегрузок, цифровой тревожности и новых технологических вызовов.
                    </p>
                    <div className="statement-badge-row">
                      <div className="statement-badge">
                        <CheckCircle2 size={16} className="text-sage-light" />
                        <span>Российский научный фонд</span>
                      </div>
                      <div className="statement-badge">
                        <CheckCircle2 size={16} className="text-sage-light" />
                        <span>ПГНИУ • ННГУ • СПбГУ</span>
                      </div>
                      <div className="statement-badge">
                        <CheckCircle2 size={16} className="text-sage-light" />
                        <span>Социология здоровья и риска</span>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* SECTION: EVENTS & NEWS (RESEARCH ARTICLES) */}
              <section id="events" className="py-24 bg-white">
                <div className="container">
                  <div className="section-head flex flex-col md:flex-row md:items-end justify-between gap-4">
                    <div>
                      <span className="section-tag">Хроника исследований</span>
                      <h2 className="section-title">{content.events.title}</h2>
                    </div>
                    <a href="#events/archive" className="chip-btn" onClick={(e) => { e.preventDefault(); window.location.hash = '#events/archive'; }}>
                      <History size={16} />
                      <span>Архив всех событий</span>
                    </a>
                  </div>

                  <div className="news-cards-row">
                    {latestEvents.map((item, i) => (
                      <div 
                        key={item.id} 
                        className="article-card" 
                        onClick={() => window.location.hash = `#events/${item.id}`}
                      >
                        <div className="article-card-meta">
                          <span className="article-badge">{item.type || 'Новости'}</span>
                          <span className="article-date">{item.date}</span>
                        </div>
                        <h3 className="article-title">{item.title}</h3>
                        <p className="article-desc">{item.description}</p>
                        <div className="article-footer">
                          <span className="article-link">
                            Подробнее <ArrowRight size={14} />
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </section>

              {/* SECTION: TEAM (HORIZONTAL SCROLL CAROUSEL WITH BUTTONS) */}
              <section id="team" className="py-24 team-section">
                <div className="container">
                  <div className="section-head flex items-end justify-between">
                    <div>
                      <span className="section-tag">Научный коллектив</span>
                      <h2 className="section-title">{content.team.title}</h2>
                    </div>
                    <div className="team-carousel-controls">
                      <button 
                        onClick={scrollTeamLeft} 
                        className="carousel-arrow-btn" 
                        aria-label="Листать влево"
                        title="Назад"
                      >
                        <ChevronLeft size={22} />
                      </button>
                      <button 
                        onClick={scrollTeamRight} 
                        className="carousel-arrow-btn" 
                        aria-label="Листать вправо"
                        title="Вперед"
                      >
                        <ChevronRight size={22} />
                      </button>
                    </div>
                  </div>

                  <div className="team-horizontal-track" ref={teamScrollRef}>
                    {content.team.members.map((member) => (
                      <div 
                        key={member.id} 
                        className={`member-card-slide ${selectedMember === member.id ? 'expanded' : ''}`}
                        onClick={() => setSelectedMember(selectedMember === member.id ? null : member.id)}
                      >
                        <div className="member-photo-frame">
                          {member.image ? (
                            <img src={member.image} alt={member.name} loading="lazy" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-gray-400">
                              <User size={48} />
                            </div>
                          )}

                          {/* Hover / Expand Overlay with Bio right on the card */}
                          <div className="member-hover-popover">
                            <span className="popover-specialization-badge">Специализация</span>
                            <p className="popover-specialization-text">{member.specialization}</p>
                            
                            {member.bio && (
                              <p className="popover-bio-snippet">{member.bio}</p>
                            )}
                            
                            {member.publications && member.publications.length > 0 && (
                              <div className="popover-pubs-count">
                                <BookOpen size={13} />
                                <span>{member.publications.length} публ. в Scopus / РИНЦ</span>
                              </div>
                            )}
                          </div>
                        </div>

                        <div className="member-info-box">
                          <span className="member-role">{member.role}</span>
                          <h3 className="member-name">{member.name}</h3>
                          <p className="member-degree">{member.title}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </section>

              {/* SECTION: MATERIALS */}
              <section id="materials" className="py-24 bg-beige/40">
                <div className="container">
                  <div className="section-head text-center max-w-2xl mx-auto">
                    <span className="section-tag">Открытые данные и методология</span>
                    <h2 className="section-title">{content.materials.title}</h2>
                  </div>

                  <div className="materials-grid">
                    {content.materials.items.map((item) => (
                      <div 
                        key={item.id} 
                        className="material-card" 
                        onClick={() => window.location.hash = `#materials/${item.id}`}
                      >
                        <div className="material-icon-box">
                          {materialIcons[item.id] || <FileSearch size={28} />}
                        </div>
                        <h3>{item.title}</h3>
                        <p>{item.description}</p>
                        <div className="material-btn-row">
                          <span className="material-btn-label">Изучить материалы</span>
                          <ArrowRight size={18} className="text-sage" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </section>

              {/* SECTION: CONTACTS (REFINED LIGHT CARDS) */}
              <section id="contacts" className="py-24 contacts-section">
                <div className="container text-center">
                  <div className="max-w-2xl mx-auto mb-12">
                    <span className="section-tag">Связь с исследователями</span>
                    <h2 className="section-title mb-4">Остались вопросы?</h2>
                    <p className="text-text-light text-base">
                      Свяжитесь с нашей исследовательской группой — мы открыты к академическому партнерству, обмену данными и экспертному диалогу.
                    </p>
                  </div>
                  
                  <div className="contacts-grid">
                    <div className="contact-card-v2">
                      <div className="contact-icon-pill"><Mail size={26} /></div>
                      <h3>Электронная почта</h3>
                      <p>{content.contacts.email}</p>
                      <button className="contact-action-btn" onClick={() => setIsFeedbackOpen(true)}>Написать нам</button>
                    </div>
                    
                    <div className="contact-card-v2">
                      <div className="contact-icon-pill"><VKIcon size={26} /></div>
                      <h3>ВКонтакте</h3>
                      <p>Официальное сообщество проекта</p>
                      <span className="contact-badge-disabled">Скоро запуск</span>
                    </div>
                    
                    <div className="contact-card-v2">
                      <div className="contact-icon-pill"><DzenIcon size={26} /></div>
                      <h3>Дзен</h3>
                      <p>Научно-популярный блог проекта</p>
                      <span className="contact-badge-disabled">Скоро запуск</span>
                    </div>
                    
                    <div className="contact-card-v2">
                      <div className="contact-icon-pill"><Send size={26} /></div>
                      <h3>Telegram</h3>
                      <p>Канал с оперативными результатами</p>
                      <button className="contact-action-btn" onClick={() => window.open(content.contacts.telegram, '_blank')}>Подписаться</button>
                    </div>
                  </div>
                </div>
              </section>

              <footer className="py-8 border-t border-gray-100 text-center bg-white">
                <p className="text-xs uppercase tracking-widest text-gray-400">© 2026 Проект «Самосохранительные стратегии россиян в условиях новой нормальности» • Грант РНФ № 23-18-00480-П</p>
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
        {zoomedImageSrc && (
          <motion.div 
            ref={lightboxRef}
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }}
            style={{
              position: 'fixed',
              inset: 0,
              backgroundColor: 'rgba(0, 0, 0, 0.9)',
              backdropFilter: 'blur(10px)',
              zIndex: 2000000,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: zoomScale > 1 ? 'grab' : 'zoom-out',
              overflow: 'hidden',
              touchAction: 'none'
            }}
            onClick={closeLightbox}
          >
            {/* Панель управления увеличением и навигацией */}
            <div style={{
              position: 'absolute',
              top: '20px',
              left: '50%',
              transform: 'translateX(-50%)',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              backgroundColor: 'rgba(20, 20, 20, 0.75)',
              backdropFilter: 'blur(12px)',
              padding: '8px 18px',
              borderRadius: '50px',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.35)',
              zIndex: 2000010,
              maxWidth: '95vw',
              overflowX: 'auto'
            }} onClick={(e) => e.stopPropagation()}>
              {zoomedImageList.length > 1 && (
                <>
                  <span style={{
                    color: 'rgba(255, 255, 255, 0.9)',
                    fontSize: '0.85rem',
                    fontWeight: 600,
                    padding: '0 6px',
                    letterSpacing: '0.5px'
                  }}>
                    {zoomedImageIndex + 1} / {zoomedImageList.length}
                  </span>
                  <div style={{ width: '1px', height: '20px', backgroundColor: 'rgba(255, 255, 255, 0.2)', margin: '0 2px' }} />
                </>
              )}
              <button 
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'white',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  padding: '6px 12px',
                  borderRadius: '20px',
                  fontSize: '0.9rem',
                  fontWeight: 600,
                  backgroundColor: 'rgba(255, 255, 255, 0.08)'
                }}
                onClick={() => setZoomScale(prev => Math.min(prev + 0.5, 4))}
              >
                ➕ Приблизить
              </button>
              <button 
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'white',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  padding: '6px 12px',
                  borderRadius: '20px',
                  fontSize: '0.9rem',
                  fontWeight: 600,
                  backgroundColor: 'rgba(255, 255, 255, 0.08)'
                }}
                onClick={() => setZoomScale(prev => {
                  const next = Math.max(prev - 0.5, 1);
                  if (next === 1) setPanPosition({ x: 0, y: 0 });
                  return next;
                })}
              >
                ➖ Отдалить
              </button>
              {zoomScale > 1 && (
                <button 
                  style={{
                    background: 'none',
                    border: 'none',
                    color: 'white',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    padding: '6px 12px',
                    borderRadius: '20px',
                    fontSize: '0.9rem',
                    fontWeight: 600,
                    backgroundColor: 'rgba(255, 255, 255, 0.15)'
                  }}
                  onClick={() => {
                    setZoomScale(1);
                    setPanPosition({ x: 0, y: 0 });
                  }}
                >
                  🔄 Сброс
                </button>
              )}
              <div style={{ width: '1px', height: '20px', backgroundColor: 'rgba(255, 255, 255, 0.2)', margin: '0 4px' }} />
              <button 
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#ff8a8a',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  padding: '6px 12px',
                  borderRadius: '20px',
                  fontSize: '0.9rem',
                  fontWeight: 600
                }}
                onClick={closeLightbox}
              >
                <X size={18} /> ЗАКРЫТЬ
              </button>
            </div>

            {/* Боковые кнопки перелистывания фото */}
            {zoomedImageList.length > 1 && (
              <>
                <button
                  style={{
                    position: 'absolute',
                    left: '20px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    width: '54px',
                    height: '54px',
                    borderRadius: '50%',
                    backgroundColor: 'rgba(255, 255, 255, 0.15)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255, 255, 255, 0.3)',
                    color: '#ffffff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    zIndex: 2000010,
                    boxShadow: '0 6px 20px rgba(0, 0, 0, 0.4)',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.3)'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.15)'}
                  onClick={(e) => { e.stopPropagation(); showPrevImage(); }}
                  aria-label="Предыдущее фото"
                  title="Предыдущее фото"
                >
                  <ChevronLeft size={32} strokeWidth={2.5} />
                </button>
                <button
                  style={{
                    position: 'absolute',
                    right: '20px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    width: '54px',
                    height: '54px',
                    borderRadius: '50%',
                    backgroundColor: 'rgba(255, 255, 255, 0.15)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255, 255, 255, 0.3)',
                    color: '#ffffff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    zIndex: 2000010,
                    boxShadow: '0 6px 20px rgba(0, 0, 0, 0.4)',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.3)'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.15)'}
                  onClick={(e) => { e.stopPropagation(); showNextImage(); }}
                  aria-label="Следующее фото"
                  title="Следующее фото"
                >
                  <ChevronRight size={32} strokeWidth={2.5} />
                </button>
              </>
            )}

            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              style={{
                position: 'relative',
                maxWidth: '90vw',
                maxHeight: '90vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'visible'
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <img 
                src={zoomedImageSrc} 
                alt="Zoomed News" 
                style={{
                  maxWidth: '100%',
                  maxHeight: '85vh',
                  objectFit: 'contain',
                  borderRadius: '16px',
                  boxShadow: '0 20px 50px rgba(0, 0, 0, 0.5)',
                  transform: `translate(${panPosition.x}px, ${panPosition.y}px) scale(${zoomScale})`,
                  transition: isDragging ? 'none' : 'transform 0.15s ease-out',
                  cursor: zoomScale > 1 ? (isDragging ? 'grabbing' : 'grab') : 'zoom-in',
                  userSelect: 'none',
                  touchAction: 'none'
                }}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
                onDoubleClick={handleDoubleClick}
                onClick={(e) => e.stopPropagation()}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}

export default App;
