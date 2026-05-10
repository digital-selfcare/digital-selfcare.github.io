import React from 'react';
import { motion } from 'framer-motion';
import { 
  Users, FileText, Download, 
  Database, Info, Calendar, BookOpen,
  Mail, MapPin, Send, ArrowRight,
  Sparkles, Bell, Lightbulb, Zap
} from 'lucide-react';
import { content } from './content';

function App() {
  const newsIcons = [<Sparkles size={32} />, <Bell size={32} />, <Lightbulb size={32} />, <Zap size={32} />];

  return (
    <div className="min-h-screen bg-white">
      {/* Simple Header */}
      <header className="fixed w-full z-50 py-6 px-8 bg-white/90 backdrop-blur-md border-b border-gray-100">
        <div className="container flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-sage rounded-xl flex items-center justify-center text-white">
              <Database size={20} />
            </div>
            <span className="font-playfair text-2xl font-bold text-text tracking-tight">Проект РНФ</span>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-48 pb-24 relative overflow-hidden bg-beige/5">
        <div className="geo-circle bg-sage/5 w-[600px] h-[600px] -top-40 -left-40" />
        <div className="container relative z-10">
          <div className="max-w-4xl">
            <span className="inline-block px-3 py-1 rounded-full bg-sage/10 text-sage font-bold text-[10px] mb-6 uppercase tracking-widest">
              Исследовательский проект 2026–2027
            </span>
            <h1 className="text-4xl md:text-6xl mb-8 leading-[1.1] font-playfair font-bold text-text">
              {content.hero.title}
            </h1>
            <p className="text-xl text-text-light mb-12 leading-relaxed max-w-2xl">
              {content.hero.subtitle}
            </p>
            <div className="flex flex-wrap gap-3 mb-12">
              {['about', 'events', 'team', 'materials', 'contacts'].map((key) => (
                <a key={key} href={`#${key}`} className="btn px-6 py-3 text-sm">
                  {key === 'contacts' ? 'Контакты' : content[key].title}
                </a>
              ))}
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

      {/* News - USING CUSTOM CSS CLASSES FOR STABILITY */}
      <section id="events" className="py-24 bg-beige/5">
        <div className="container">
          <div className="mb-16">
            <h2 className="text-4xl font-playfair font-bold mb-4">{content.events.title}</h2>
            <div className="w-16 h-1 bg-powdery rounded-full mb-6" />
            <p className="text-text-light text-lg">Оперативная информация о ходе исследования</p>
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
            
            {/* Archive link */}
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

      {/* Materials */}
      <section id="materials" className="py-24 bg-sage/5">
        <div className="container max-w-4xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-playfair font-bold mb-4">{content.materials.title}</h2>
            <div className="w-16 h-1 bg-powdery rounded-full mx-auto" />
          </div>
          <div className="grid gap-4">
            {content.materials.items.map((item, i) => (
              <a key={i} href={item.link} className="bg-white p-6 rounded-3xl shadow-sm flex justify-between items-center hover:scale-[1.01] transition-transform">
                <div className="flex items-center gap-6">
                  <div className="w-12 h-12 rounded-2xl bg-powdery/10 text-powdery flex items-center justify-center">
                    <FileText size={24} />
                  </div>
                  <div className="text-left">
                    <h4 className="font-bold text-lg">{item.title}</h4>
                    <span className="text-[10px] text-text-light uppercase tracking-widest">{item.type}</span>
                  </div>
                </div>
                <Download size={20} className="text-gray-200" />
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Contacts - FIXED LAYOUT */}
      <section id="contacts" className="py-32 bg-white">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-24">
            <div className="space-y-12">
              <div>
                <h2 className="text-5xl font-playfair font-bold mb-8">Контакты</h2>
                <p className="text-xl text-text-light leading-relaxed">
                  {content.contacts.description}
                </p>
              </div>
              <div className="space-y-8">
                <div className="flex items-center gap-6">
                  <div className="w-14 h-14 rounded-2xl bg-sage text-white flex items-center justify-center">
                    <Mail size={24} />
                  </div>
                  <div>
                    <span className="block text-[10px] uppercase font-bold text-text-light tracking-widest mb-1">Email</span>
                    <a href={`mailto:${content.contacts.email}`} className="text-xl font-bold hover:text-sage">{content.contacts.email}</a>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <div className="w-14 h-14 rounded-2xl bg-powdery text-white flex items-center justify-center">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <span className="block text-[10px] uppercase font-bold text-text-light tracking-widest mb-1">Локация</span>
                    <p className="text-xl font-bold">{content.contacts.address}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-beige/10 p-10 rounded-[40px] border border-beige/20">
              <h3 className="text-2xl font-playfair font-bold mb-8">Написать нам</h3>
              <form className="space-y-6">
                <input type="text" placeholder="Имя" className="w-full px-6 py-4 rounded-2xl bg-white border border-gray-100" />
                <input type="email" placeholder="Email" className="w-full px-6 py-4 rounded-2xl bg-white border border-gray-100" />
                <textarea placeholder="Ваше сообщение" rows="4" className="w-full px-6 py-4 rounded-2xl bg-white border border-gray-100 resize-none" />
                <button type="button" className="btn w-full py-5 rounded-2xl flex items-center justify-center gap-3">
                  <Send size={20} />
                  <span>ОТПРАВИТЬ</span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      <footer className="py-12 border-t border-gray-100 text-center">
        <p className="text-[10px] uppercase tracking-widest text-text-light">
          © 2026 Стратегии самосохранения россиян.
        </p>
      </footer>
    </div>
  );
}

export default App;
