import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import CTASection from '../components/CTASection';
import Lightbox from '../components/Lightbox';

interface ServiceDetailProps {
  title: string;
  subtitle: string;
  description: string;
  included: string[];
  forWho: string[];
  whyUs: string;
  gallery?: string[];
}

export default function ServiceDetail({ title, subtitle, description, included, forWho, whyUs, gallery }: ServiceDetailProps) {
  const { t } = useLanguage();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  const nextSlide = () => {
    if (!gallery) return;
    setCurrentIndex((prev) => (prev === gallery.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    if (!gallery) return;
    setCurrentIndex((prev) => (prev === 0 ? gallery.length - 1 : prev - 1));
  };

  return (
    <div>
      <section className="relative min-h-[60vh] flex items-center py-24 text-white overflow-hidden">
        {/* Background Image & Overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?auto=format&fit=crop&q=80&w=2000" 
            className="w-full h-full object-cover"
            alt={title}
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-brand-dark/70 backdrop-blur-[2px]"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-bold mb-6"
          >
            {title}
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl md:text-2xl text-slate-200 max-w-3xl mx-auto leading-relaxed"
          >
            {subtitle}
          </motion.p>
        </div>

        {/* Wave Effect */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0] transform translate-y-[1px]">
          <svg className="relative block w-[calc(100%+1.3px)] h-[80px]" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V95.8C58.47,105.34,121.53,108.55,172,95.83,222.5,83.1,263.4,67.23,321.39,56.44Z" className="fill-white"></path>
          </svg>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
            <div className="lg:col-span-2 space-y-12">
              <div className="space-y-6">
                <p className="text-slate-600 leading-relaxed text-lg">
                  {description}
                </p>
                <Link to="/contact" className="btn-primary inline-block">
                  {t('cta_estimate')}
                </Link>
              </div>

              <div className="space-y-6">
                <h2 className="text-3xl font-bold text-brand-dark">{t('service_included')}</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {included.map((item, idx) => (
                    <div key={idx} className="flex items-center space-x-3 text-slate-600">
                      <CheckCircle2 className="text-brand-light shrink-0" size={20} />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-8">
              <div className="bg-slate-50 p-8 rounded-3xl space-y-6">
                <h3 className="text-xl font-bold text-brand-dark">{t('service_for_who')}</h3>
                <ul className="space-y-3">
                  {forWho.map((item, idx) => (
                    <li key={idx} className="flex items-start space-x-3 text-sm text-slate-600">
                      <div className="w-1.5 h-1.5 rounded-full bg-brand-light mt-1.5 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-brand-dark p-8 rounded-3xl text-white space-y-4">
                <h3 className="text-xl font-bold">{t('service_why_us')}</h3>
                <p className="text-sm text-slate-300 leading-relaxed">
                  {whyUs}
                </p>
              </div>
            </div>
          </div>

          {gallery && gallery.length > 0 && (
            <div className="w-full lg:w-[60%] mr-auto">
              <h2 className="text-3xl font-bold text-brand-dark mb-8">{t('service_gallery')}</h2>
              <div className="relative aspect-[16/9] overflow-hidden rounded-3xl shadow-2xl group bg-slate-100">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={currentIndex}
                    src={gallery[currentIndex]}
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                    className="absolute inset-0 w-full h-full object-cover cursor-pointer"
                    onClick={() => setIsLightboxOpen(true)}
                    referrerPolicy="no-referrer"
                  />
                </AnimatePresence>
                
                {/* Navigation Buttons */}
                <button 
                  onClick={prevSlide}
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white/40 z-10"
                >
                  <ChevronLeft size={24} />
                </button>
                <button 
                  onClick={nextSlide}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white/40 z-10"
                >
                  <ChevronRight size={24} />
                </button>

                {/* Indicators */}
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex space-x-2 z-10">
                  {gallery.slice(0, 10).map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentIndex(idx)}
                      className={`w-2 h-2 rounded-full transition-all ${idx === currentIndex ? 'bg-white w-6' : 'bg-white/50'}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      <CTASection />
      
      {gallery && (
        <Lightbox
          isOpen={isLightboxOpen}
          onClose={() => setIsLightboxOpen(false)}
          images={gallery}
          currentIndex={currentIndex}
          onNext={nextSlide}
          onPrev={prevSlide}
        />
      )}
    </div>
  );
}
