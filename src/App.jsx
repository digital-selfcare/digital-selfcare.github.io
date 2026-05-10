import React from 'react';
import { motion } from 'framer-motion';
import { 
  Menu, X, ChevronRight, Users, 
  FileText, Award, Download, 
  Database, Info, Calendar, BookOpen,
  Mail, MapPin, ArrowRight
} from 'lucide-react';
import { content } from './content';

function App() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  return (
    <div className="min-h-screen bg-white">
      {/* Simple Header */}
      <nav className="fixed w-full z-50 py-6 px-8">
        <div className="container flex justify-start items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-sage rounded-xl flex items-center justify-center text-white shadow-lg shadow-sage/20">
              <Database size={20} />
            </div>
            <span className="font-playfair text-2xl font-bold text-text tracking-tight">Проект РНФ</span>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-48 pb-24 relative overflow-hidden bg-beige/10">
        <div className="geo-circle bg-sage/5 w-[600px] h-[600px] -top-40 -left-40" />
        <div className="geo-circle bg-powdery/10 w-[400px] h-[400px] top-40 -right-20" />
        
        <div className="container relative z-10">
          <div className="max-w-4xl">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <span className="inline-block px-3 py-1 rounded-full bg-sage/10 text-sage font-bold text-xs mb-6 uppercase tracking-wider">
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
                <a href="#about" className="btn px-6 py-3 rounded-xl">{content.about.title}</a>
                <a href="#events" className="btn px-6 py-3 rounded-xl bg-sage/80 hover:bg-sage transition-all">{content.events.title}</a>
                <a href="#team" className="btn px-6 py-3 rounded-xl bg-sage/80 hover:bg-sage transition-all">{content.team.title}</a>
                <a href="#materials" className="btn px-6 py-3 rounded-xl bg-sage/80 hover:bg-sage transition-all">{content.materials.title}</a>
                <a href="#contacts" className="btn px-6 py-3 rounded-xl bg-powdery/80 hover:bg-powdery transition-all">Контакты</a>
              </div>

              <div className="flex items-center gap-2 text-text-light font-bold text-sm">
                <Info size={18} className="text-sage" />
                <span>Навигация по разделам проекта</span>
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
              <div className="w-24 h-24 bg-powdery rounded-[40px] flex items-center justify-center text-white mb-8 shadow-xl shadow-powdery/20">
                <BookOpen size={40} />
              </div>
              <h2 className="text-4xl font-playfair font-bold mb-4">{content.about.title}</h2>
              <div className="w-20 h-1.5 bg-sage rounded-full" />
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

      {/* News & Events - 4 IN A ROW + ARCHIVE */}
      <section id="events" className="py-24 bg-beige/5">
        <div className="container">
          <div className="mb-16">
            <h2 className="text-4xl font-playfair font-bold mb-4">{content.events.title}</h2>
            <div className="w-20 h-1.5 bg-powdery rounded-full mb-6" />
            <p className="text-text-light text-lg">Оперативная информация о ходе исследования</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {content.events.items.map((item, i) => (
              <motion.div 
                key={item.id}
                whileHover={{ y: -5 }}
                className="glass p-6 flex flex-col h-full border-t-4 border-sage overflow-hidden"
              >
                <div className="mb-4">
                  <span className="block text-2xl font-bold text-sage">{item.date}</span>
                  <span className="text-[10px] uppercase font-bold text-text-light tracking-widest">{item.type}</span>
                </div>
                <div className="flex-grow">
                  <h3 className="text-lg mb-3 font-bold leading-tight text-text break-words">
                    {item.title}
                  </h3>
                  <p className="text-sm text-text-light leading-relaxed mb-6 line-clamp-3">
                    {item.description}
                  </p>
                </div>
                <div className="flex items-center gap-2 text-xs font-bold text-sage group cursor-pointer mt-auto">
                  <span>Читать далее</span>
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </motion.div>
            ))}
            
            {/* Placeholders to fill the 4-in-a-row look if needed */}
            {[1, 2, 3].slice(0, 4 - content.events.items.length).map(n => (
              <div key={n} className="glass p-6 border-dashed border-2 border-gray-200 bg-white/20 flex items-center justify-center">
                <p className="text-gray-300 text-xs text-center italic">Ожидание события...</p>
              </div>
            ))}
          </div>
          
          <div className="text-center">
            <a href="#" className="inline-flex items-center gap-2 text-text-light hover:text-sage font-bold transition-colors py-2 border-b-2 border-transparent hover:border-sage">
              Архив событий <ChevronRight size={18} />
            </a>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section id="team" className="py-24 relative overflow-hidden">
        <div className="geo-circle bg-sage/5 w-[500px] h-[500px] -bottom-20 -right-20" />
        <div className="container relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-playfair font-bold mb-4">{content.team.title}</h2>
            <div className="w-20 h-1.5 bg-sage rounded-full mx-auto" />
          </div>
          
          <div className="grid md:grid-cols-3 gap-16">
            {content.team.members.map((member, i) => (
              <div key={i} className="text-center group">
                <div className="w-48 h-48 mx-auto mb-8 relative">
                  <div className="absolute inset-0 bg-sage/5 rounded-[60px] rotate-6 group-hover:rotate-12 transition-transform duration-500" />
                  <div className="w-full h-full rounded-[60px] bg-white shadow-xl relative z-10 flex items-center justify-center text-sage border-4 border-white overflow-hidden">
                    <Users size={64} strokeWidth={1} />
                  </div>
                </div>
                <h3 className="text-2xl font-bold mb-2 text-text">{member.name}</h3>
                <p className="text-sage font-bold text-sm mb-4 uppercase tracking-widest">{member.role}</p>
                <p className="text-base text-text-light leading-relaxed px-6">{member.bio}</p>
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
              <div className="w-20 h-1.5 bg-powdery rounded-full mx-auto mb-6" />
              <p className="text-xl text-text-light">
                {content.materials.description}
              </p>
            </div>
            
            <div className="grid gap-6">
              {content.materials.items.map((item, i) => (
                <a key={i} href={item.link} className="glass p-8 flex justify-between items-center group hover:scale-[1.02] transition-all duration-300">
                  <div className="flex items-center gap-8">
                    <div className="w-16 h-16 rounded-[24px] bg-powdery/10 text-powdery flex items-center justify-center group-hover:bg-powdery group-hover:text-white transition-all">
                      <FileText size={32} />
                    </div>
                    <div className="text-left">
                      <h4 className="font-bold text-xl text-text">{item.title}</h4>
                      <span className="text-sm text-text-light uppercase font-bold tracking-widest">{item.type}</span>
                    </div>
                  </div>
                  <div className="w-12 h-12 rounded-full bg-white shadow-md flex items-center justify-center text-gray-300 group-hover:bg-sage group-hover:text-white transition-all">
                    <Download size={24} />
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contacts Section */}
      <section id="contacts" className="py-24 bg-white">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-20 items-center">
            <div>
              <h2 className="text-4xl font-playfair font-bold mb-6">{content.contacts.title}</h2>
              <p className="text-lg text-text-light mb-10 leading-relaxed">
                {content.contacts.description}
              </p>
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-sage/10 text-sage flex items-center justify-center">
                    <Mail size={20} />
                  </div>
                  <div>
                    <span className="block text-xs uppercase font-bold text-text-light">Email</span>
                    <a href={`mailto:${content.contacts.email}`} className="text-lg font-bold hover:text-sage transition">{content.contacts.email}</a>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-powdery/10 text-powdery flex items-center justify-center">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <span className="block text-xs uppercase font-bold text-text-light">Локация</span>
                    <span className="text-lg font-bold">{content.contacts.address}</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="glass p-10 bg-sage/5 border-none">
              <h3 className="text-2xl font-playfair font-bold mb-6">Обратная связь</h3>
              <form className="space-y-4">
                <input type="text" placeholder="Ваше имя" className="w-full p-4 rounded-xl border border-gray-100 bg-white focus:outline-sage" />
                <input type="email" placeholder="Email" className="w-full p-4 rounded-xl border border-gray-100 bg-white focus:outline-sage" />
                <textarea placeholder="Ваш вопрос" rows="4" className="w-full p-4 rounded-xl border border-gray-100 bg-white focus:outline-sage" />
                <button type="button" className="btn w-full py-4 rounded-xl">Отправить</button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 border-t border-gray-100 bg-beige/10">
        <div className="container">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-sage rounded-lg flex items-center justify-center text-white">
                <Database size={16} />
              </div>
              <span className="font-playfair font-bold text-lg">Проект РНФ 2026</span>
            </div>
            <p className="text-sm text-text-light">
              © 2026 Стратегии самосохранения россиян. Все права защищены.
            </p>
            <div className="flex gap-6">
              <a href="#" className="text-gray-400 hover:text-sage transition"><Info size={20} /></a>
              <a href="#" className="text-gray-400 hover:text-sage transition"><Users size={20} /></a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
