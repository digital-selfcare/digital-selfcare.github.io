import React from 'react';
import { motion } from 'framer-motion';
import { 
  Menu, X, ChevronRight, Users, 
  FileText, Award, Download, 
  Database, Info, Calendar, BookOpen,
  Mail, MapPin, ArrowRight, Send
} from 'lucide-react';
import { content } from './content';

function App() {
  return (
    <div className="min-h-screen bg-white">
      {/* Simple Header */}
      <header className="fixed w-full z-50 py-6 px-8 bg-white/80 backdrop-blur-md border-b border-gray-50">
        <div className="container flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-sage rounded-xl flex items-center justify-center text-white shadow-lg shadow-sage/20">
              <Database size={20} />
            </div>
            <span className="font-playfair text-2xl font-bold text-text tracking-tight">Проект РНФ</span>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-48 pb-24 relative overflow-hidden bg-beige/5">
        <div className="geo-circle bg-sage/5 w-[600px] h-[600px] -top-40 -left-40" />
        <div className="geo-circle bg-powdery/10 w-[400px] h-[400px] top-40 -right-20" />
        
        <div className="container relative z-10">
          <div className="max-w-4xl">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <span className="inline-block px-3 py-1 rounded-full bg-sage/10 text-sage font-bold text-[10px] mb-6 uppercase tracking-widest">
                Исследовательский проект 2026–2027
              </span>
              <h1 className="text-4xl md:text-6xl mb-8 leading-[1.1] font-playfair font-bold text-text">
                {content.hero.title}
              </h1>
              <p className="text-xl text-text-light mb-12 leading-relaxed max-w-2xl">
                {content.hero.subtitle}
              </p>
              
              {/* Menu as Green Buttons */}
              <div className="flex flex-wrap gap-3 mb-12">
                {['about', 'events', 'team', 'materials', 'contacts'].map((key) => (
                  <a key={key} href={`#${key}`} className="btn px-6 py-3 rounded-xl text-sm transition-all hover:scale-105">
                    {key === 'contacts' ? 'Контакты' : content[key].title}
                  </a>
                ))}
              </div>

              <div className="flex items-center gap-2 text-text-light font-bold text-xs">
                <Info size={16} className="text-sage" />
                <span className="uppercase tracking-widest">Навигация по разделам проекта</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 relative overflow-hidden">
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

      {/* News & Events - NUMBERED STYLE AS PER SCREENSHOT */}
      <section id="events" className="py-24 bg-beige/5 border-t border-beige/20">
        <div className="container">
          <div className="mb-20">
            <h2 className="text-4xl font-playfair font-bold mb-4">{content.events.title}</h2>
            <div className="w-16 h-1 bg-powdery rounded-full mb-6" />
            <p className="text-text-light text-lg">Оперативная информация о ходе исследования</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-16">
            {content.events.items.map((item, i) => (
              <motion.div 
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="relative flex flex-col h-full group"
              >
                {/* Large Number as per screenshot */}
                <span className="text-5xl font-bold text-powdery/30 font-playfair mb-4 block">
                  {i + 1}
                </span>
                <div className="flex-grow">
                  <h3 className="text-xl font-bold mb-4 text-text leading-tight group-hover:text-sage transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-text-light text-sm leading-relaxed mb-6">
                    {item.description}
                  </p>
                </div>
                <a href="#" className="inline-block font-bold text-xs uppercase tracking-[0.2em] text-text border-b-2 border-text/10 pb-1 w-fit group-hover:border-sage transition-all">
                  БОЛЕЕ
                </a>
              </motion.div>
            ))}
            
            {/* Archive style placeholder */}
            <div className="pt-12">
               <span className="text-5xl font-bold text-gray-100 font-playfair mb-4 block">...</span>
               <h3 className="text-xl font-bold mb-4 text-gray-300">Архив событий</h3>
               <p className="text-gray-200 text-sm italic mb-6">Все прошедшие новости и результаты доступны в архиве.</p>
               <a href="#" className="inline-block font-bold text-xs uppercase tracking-[0.2em] text-gray-300">ПЕРЕЙТИ</a>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section id="team" className="py-24 relative overflow-hidden bg-white">
        <div className="container relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-playfair font-bold mb-4">{content.team.title}</h2>
            <div className="w-16 h-1 bg-sage rounded-full mx-auto" />
          </div>
          
          <div className="grid md:grid-cols-3 gap-16">
            {content.team.members.map((member, i) => (
              <div key={i} className="text-center group">
                <div className="w-40 h-40 mx-auto mb-6 relative">
                  <div className="absolute inset-0 bg-sage/5 rounded-full scale-110 group-hover:scale-125 transition-transform duration-500" />
                  <div className="w-full h-full rounded-full bg-white shadow-xl relative z-10 flex items-center justify-center text-sage border-4 border-white overflow-hidden">
                    <Users size={48} strokeWidth={1} />
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-1 text-text">{member.name}</h3>
                <p className="text-sage font-bold text-xs mb-4 uppercase tracking-wider">{member.role}</p>
                <p className="text-sm text-text-light leading-relaxed px-6">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Materials Section */}
      <section id="materials" className="py-24 bg-sage/5">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-playfair font-bold mb-4">{content.materials.title}</h2>
              <div className="w-16 h-1 bg-powdery rounded-full mx-auto mb-6" />
              <p className="text-xl text-text-light">
                {content.materials.description}
              </p>
            </div>
            
            <div className="grid gap-4">
              {content.materials.items.map((item, i) => (
                <a key={i} href={item.link} className="glass p-6 flex justify-between items-center group hover:bg-white transition-all duration-300 rounded-3xl">
                  <div className="flex items-center gap-6">
                    <div className="w-12 h-12 rounded-2xl bg-powdery/10 text-powdery flex items-center justify-center group-hover:bg-powdery group-hover:text-white transition-all">
                      <FileText size={24} />
                    </div>
                    <div className="text-left">
                      <h4 className="font-bold text-lg text-text">{item.title}</h4>
                      <span className="text-[10px] text-text-light uppercase font-bold tracking-[0.2em]">{item.type}</span>
                    </div>
                  </div>
                  <Download size={20} className="text-gray-200 group-hover:text-sage transition-all" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contacts Section - CLEAN & ALIGNED */}
      <section id="contacts" className="py-32 bg-white relative overflow-hidden">
        <div className="geo-circle bg-powdery/5 w-[500px] h-[500px] -bottom-40 -left-40" />
        <div className="container relative z-10">
          <div className="grid lg:grid-cols-2 gap-24">
            <div>
              <h2 className="text-5xl font-playfair font-bold mb-8">{content.contacts.title}</h2>
              <p className="text-xl text-text-light mb-12 leading-relaxed">
                {content.contacts.description}
              </p>
              
              <div className="space-y-10">
                <div className="flex items-center gap-6 group">
                  <div className="w-14 h-14 rounded-2xl bg-sage/10 text-sage flex items-center justify-center group-hover:bg-sage group-hover:text-white transition-all shadow-sm">
                    <Mail size={24} />
                  </div>
                  <div>
                    <span className="block text-[10px] uppercase font-bold text-text-light tracking-[0.3em] mb-1">Электронная почта</span>
                    <a href={`mailto:${content.contacts.email}`} className="text-xl font-bold text-text hover:text-sage transition-colors">{content.contacts.email}</a>
                  </div>
                </div>
                
                <div className="flex items-center gap-6 group">
                  <div className="w-14 h-14 rounded-2xl bg-powdery/10 text-powdery flex items-center justify-center group-hover:bg-powdery group-hover:text-white transition-all shadow-sm">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <span className="block text-[10px] uppercase font-bold text-text-light tracking-[0.3em] mb-1">Расположение</span>
                    <span className="text-xl font-bold text-text">{content.contacts.address}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative">
              {/* Form inside a clean white card */}
              <div className="bg-white rounded-[40px] p-10 md:p-12 shadow-2xl shadow-sage/5 border border-gray-100 relative z-10">
                <h3 className="text-2xl font-playfair font-bold mb-8">Написать нам</h3>
                <form className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase font-bold text-text-light tracking-widest ml-1">Имя</label>
                      <input type="text" placeholder="Ваше имя" className="w-full px-6 py-4 rounded-2xl border border-gray-100 bg-beige/10 focus:outline-none focus:ring-2 focus:ring-sage/20 transition-all" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase font-bold text-text-light tracking-widest ml-1">Email</label>
                      <input type="email" placeholder="example@mail.com" className="w-full px-6 py-4 rounded-2xl border border-gray-100 bg-beige/10 focus:outline-none focus:ring-2 focus:ring-sage/20 transition-all" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase font-bold text-text-light tracking-widest ml-1">Сообщение</label>
                    <textarea placeholder="Опишите ваш вопрос..." rows="4" className="w-full px-6 py-4 rounded-2xl border border-gray-100 bg-beige/10 focus:outline-none focus:ring-2 focus:ring-sage/20 transition-all resize-none" />
                  </div>
                  <button type="button" className="btn w-full py-5 rounded-2xl flex items-center justify-center gap-3">
                    <Send size={20} />
                    <span>ОТПРАВИТЬ СООБЩЕНИЕ</span>
                  </button>
                </form>
              </div>
              {/* Background decorative element */}
              <div className="absolute -bottom-6 -right-6 w-full h-full bg-sage/5 rounded-[40px] z-0" />
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 border-t border-gray-100 bg-beige/5">
        <div className="container">
          <div className="flex flex-col md:flex-row justify-between items-center gap-10">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-sage rounded-lg flex items-center justify-center text-white">
                <Database size={16} />
              </div>
              <span className="font-playfair font-bold text-lg">Проект РНФ 2026</span>
            </div>
            <p className="text-xs text-text-light uppercase tracking-widest">
              © 2026 Стратегии самосохранения россиян.
            </p>
            <div className="flex gap-6">
              <div className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 hover:text-sage hover:border-sage transition-all">
                <Info size={18} />
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
