import React from 'react';
import { motion } from 'framer-motion';
import { 
  Menu, X, ChevronRight, Users, 
  FileText, Award, Download, 
  Database, Info, Calendar, BookOpen
} from 'lucide-react';
import { content } from './content';

function App() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed w-full z-50 glass border-b border-gray-100 py-3 mt-4 mx-auto max-w-[95%] rounded-full left-0 right-0">
        <div className="container flex justify-between items-center px-8">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-sage rounded-full flex items-center justify-center text-white">
              <Database size={18} />
            </div>
            <span className="font-playfair text-xl font-bold text-text tracking-tight">РНФ Проект</span>
          </div>
          
          <div className="hidden md:flex gap-8 items-center">
            {['about', 'events', 'team', 'materials'].map((item) => (
              <a 
                key={item} 
                href={`#${item}`} 
                className="text-sm font-medium hover:text-sage transition capitalize"
              >
                {content[item].title}
              </a>
            ))}
          </div>

          <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </nav>

      {/* Hero with Geometric Elements */}
      <section className="pt-48 pb-20 relative overflow-hidden">
        {/* Nicepage-style Background Shapes */}
        <div className="geo-circle bg-sage/5 w-[500px] h-[500px] -top-20 -left-20" />
        <div className="geo-circle bg-powdery/10 w-[300px] h-[300px] top-40 right-[-100px]" />
        
        <div className="container relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <span className="inline-block px-3 py-1 rounded-full bg-sage/10 text-sage font-bold text-xs mb-6 uppercase tracking-wider">
                Исследовательский проект 2026–2027
              </span>
              <h1 className="text-4xl md:text-6xl mb-8 leading-[1.1] font-playfair font-bold">
                {content.hero.title}
              </h1>
              <p className="text-lg text-text-light mb-10 leading-relaxed max-w-lg">
                {content.hero.subtitle}
              </p>
              <div className="flex gap-4">
                <a href="#about" className="btn px-8 py-4 rounded-full">{content.hero.cta}</a>
                <div className="flex items-center gap-2 text-sage font-bold text-sm">
                  <div className="w-10 h-10 rounded-full border-2 border-sage/20 flex items-center justify-center">
                    <Info size={18} />
                  </div>
                  Подробнее
                </div>
              </div>
            </motion.div>
            
            {/* Visual Geometric Composition */}
            <div className="relative hidden lg:block">
              <div className="w-[450px] h-[450px] bg-beige rounded-[80px] rotate-3 relative overflow-hidden shadow-2xl">
                <div className="absolute inset-0 bg-gradient-to-br from-sage/20 to-transparent" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-white/40 rounded-full blur-2xl" />
              </div>
              <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-powdery/20 rounded-full blur-xl" />
            </div>
          </div>
        </div>
      </section>

      {/* About Section - Compact & Geometric */}
      <section id="about" className="py-20 relative bg-beige/10">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-[1fr,2fr] gap-12 items-center">
              <div>
                <div className="w-20 h-20 bg-powdery rounded-3xl flex items-center justify-center text-white mb-6 rotate-6">
                  <BookOpen size={32} />
                </div>
                <h2 className="section-title !mb-4">{content.about.title}</h2>
              </div>
              <div className="space-y-6">
                {content.about.description.map((para, i) => (
                  <p key={i} className="text-lg leading-relaxed text-text-light font-medium">
                    {para}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* News & Team in "Nicepage" Cards */}
      <section id="events" className="py-20">
        <div className="container">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="section-title !mb-2">{content.events.title}</h2>
              <p className="text-text-light">Оперативная информация о ходе исследования</p>
            </div>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {content.events.items.map((item, i) => (
              <motion.div 
                key={item.id}
                whileHover={{ y: -10 }}
                className="glass p-8 group relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-24 h-24 bg-sage/5 rounded-bl-[100px] transition-all group-hover:w-32 group-hover:h-32" />
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-6">
                    <span className="text-sm font-bold text-sage bg-sage/10 px-3 py-1 rounded-full">{item.date}</span>
                    <span className="text-[10px] uppercase font-bold text-text-light tracking-widest">{item.type}</span>
                  </div>
                  <h3 className="text-xl mb-4 font-bold leading-tight">{item.title}</h3>
                  <p className="text-sm text-text-light leading-relaxed mb-6">{item.description}</p>
                  <div className="flex items-center gap-2 text-xs font-bold text-sage">
                    <Calendar size={14} /> Читать далее
                  </div>
                </div>
              </motion.div>
            ))}
            {/* Empty States placeholders */}
            <div className="glass p-8 border-dashed border-2 border-gray-100 flex flex-center items-center justify-center text-gray-300">
               Ожидание новых событий...
            </div>
          </div>
        </div>
      </section>

      {/* Team Section with Circle Images */}
      <section id="team" className="py-20 bg-sage/5 relative overflow-hidden">
        <div className="geo-circle bg-powdery/10 w-[400px] h-[400px] -bottom-20 -right-20" />
        
        <div className="container relative z-10">
          <div className="text-center mb-16">
            <h2 className="section-title">{content.team.title}</h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-12">
            {content.team.members.map((member, i) => (
              <div key={i} className="text-center group">
                <div className="w-40 h-40 mx-auto mb-6 relative">
                  <div className="absolute inset-0 bg-powdery/20 rounded-full scale-110 group-hover:scale-125 transition-transform duration-500" />
                  <div className="w-full h-full rounded-full bg-white shadow-xl relative z-10 flex items-center justify-center text-sage border-4 border-white overflow-hidden">
                    <Users size={48} strokeWidth={1} />
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-1">{member.name}</h3>
                <p className="text-sage font-bold text-xs mb-4 uppercase tracking-wider">{member.role}</p>
                <p className="text-sm text-text-light leading-relaxed px-4">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Materials Section */}
      <section id="materials" className="py-20">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="section-title">{content.materials.title}</h2>
            <p className="text-lg text-text-light mb-12">
              {content.materials.description}
            </p>
            
            <div className="grid gap-4">
              {content.materials.items.map((item, i) => (
                <a key={i} href={item.link} className="glass p-6 flex justify-between items-center group hover:border-sage/30 transition-all duration-300">
                  <div className="flex items-center gap-5">
                    <div className="w-14 h-14 rounded-2xl bg-powdery/10 text-powdery flex items-center justify-center group-hover:bg-powdery group-hover:text-white transition-colors">
                      <FileText size={28} />
                    </div>
                    <div className="text-left">
                      <h4 className="font-bold text-lg">{item.title}</h4>
                      <span className="text-xs text-text-light uppercase font-bold tracking-widest">{item.type}</span>
                    </div>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-300 group-hover:bg-sage group-hover:text-white transition-all">
                    <Download size={18} />
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-gray-100 bg-white">
        <div className="container text-center">
          <div className="flex justify-center items-center gap-2 mb-6">
            <div className="w-6 h-6 bg-sage rounded-full" />
            <span className="font-playfair font-bold">РНФ Исследование 2026</span>
          </div>
          <p className="text-sm text-text-light">
            © 2026 Проект «Стратегии самосохранения». Все права защищены.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
