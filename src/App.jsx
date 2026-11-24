import React, { useState, useEffect } from 'react';
import { 
  Atom, Cpu, Globe, Users, FileText, Mail, MapPin, 
  ChevronRight, ChevronLeft, Menu, X, Linkedin, Github, 
  ExternalLink, BookOpen, Calendar, ArrowLeft, LayoutGrid, Info, Download, 
  Instagram, Youtube, Maximize2, Target, Eye, Sparkles, GraduationCap,
  HeartPulse, Activity, Brain, Lightbulb, CheckCircle2
} from 'lucide-react';
import ContactModal from './components/ContactModal';
import { LegalPageView, CookieConsentBanner } from './components/LegalCompliance';
import { DataProvider, useData } from './context/DataContext';
import utemLogo from './assets/logo-utem.png';
import heroPattern from './assets/hero-pattern.png';
import heroPatternTransparent from './assets/hero-pattern-transparent.png';
import heroTeamImg from './assets/hero-team.jpg';
import heroTeamImg2 from './assets/hero-team-2.jpg';
import heroTeamImg3 from './assets/hero-team-3.jpg';

// --- COMPONENTES AUXILIARES DE LA WEB PÚBLICA ---

// Mini Carrusel exclusivo para la sección Hero (Nosotros) - Automático y Limpio
const HeroSlider = ({ brainImg, teamImg, teamImg2, teamImg3, customSlides }) => {
  const slides = customSlides || [
    brainImg || '/image.jpg',
    teamImg || heroTeamImg || '/hero-team.jpg',
    teamImg2 || heroTeamImg2 || '/hero-team-2.jpg',
    teamImg3 || heroTeamImg3 || '/hero-team-3.jpg'
  ].filter(Boolean);

  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 3500);
    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <div className="relative z-10 bg-slate-900/40 backdrop-blur-xl border border-cyan-500/20 p-2.5 rounded-2xl shadow-2xl shadow-cyan-950/60 transform rotate-1 hover:rotate-0 transition-all duration-500 overflow-hidden group">
      <div className="relative overflow-hidden rounded-xl w-full aspect-[16/11]">
        {/* Contenedor de diapositivas con deslizamiento suave */}
        <div 
          className="absolute inset-0 flex transition-transform ease-in-out duration-1000 w-full h-full"
          style={{ transform: `translateX(-${current * 100}%)` }}
        >
          {slides.map((url, idx) => (
            <div key={idx} className="relative w-full h-full flex-shrink-0">
              <img 
                src={url} 
                alt={`Diapositiva LaTSIB ${idx + 1}`} 
                className="w-full h-full object-cover select-none"
              />
            </div>
          ))}
        </div>

        {/* Flechas de navegación en hover */}
        {slides.length > 1 && (
          <div className="absolute inset-0 flex items-center justify-between p-2.5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
            <button
              type="button"
              aria-label="Anterior diapositiva"
              onClick={(e) => { e.stopPropagation(); setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1)); }}
              className="p-2 rounded-full bg-slate-900/80 text-white hover:bg-cyan-600 transition-all pointer-events-auto cursor-pointer backdrop-blur-sm shadow-md"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              type="button"
              aria-label="Siguiente diapositiva"
              onClick={(e) => { e.stopPropagation(); setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1)); }}
              className="p-2 rounded-full bg-slate-900/80 text-white hover:bg-cyan-600 transition-all pointer-events-auto cursor-pointer backdrop-blur-sm shadow-md"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        )}

        {/* Indicadores interactivos de progreso en la parte inferior */}
        <div className="absolute bottom-3 inset-x-0 flex items-center justify-center gap-2 z-20">
          {slides.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setCurrent(i)}
              aria-label={`Ir a diapositiva ${i + 1}`}
              className={`h-1.5 rounded-full transition-all duration-500 cursor-pointer ${
                current === i 
                  ? 'w-7 bg-cyan-400 shadow-md shadow-cyan-400/80' 
                  : 'w-2 bg-white/50 hover:bg-white/80 backdrop-blur-xs'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

// Carrusel de imágenes general
const ImageSlider = ({ items, autoSlide = true, autoSlideInterval = 3500 }) => {
  const [curr, setCurr] = useState(0);
  const validItems = (items || []).filter(item => item && item.url && item.url.trim() !== '');

  const next = () => setCurr((c) => (c === validItems.length - 1 ? 0 : c + 1));
  const prev = () => setCurr((c) => (c === 0 ? validItems.length - 1 : c - 1));

  useEffect(() => {
    if (!autoSlide || validItems.length <= 1) return;
    const slideInterval = setInterval(next, autoSlideInterval);
    return () => clearInterval(slideInterval);
  }, [validItems.length, autoSlide, autoSlideInterval]);

  if (validItems.length === 0) return null;

  return (
    <div className="overflow-hidden relative h-full w-full group">
      <div className="flex transition-transform ease-out duration-500 h-full" style={{ transform: `translateX(-${curr * 100}%)` }}>
        {validItems.map((item, i) => (
          <img key={i} src={item.url} alt={item.descripcion || ""} className="w-full h-full object-cover flex-shrink-0" />
        ))}
      </div>
      {validItems.length > 1 && (
        <>
          <div className="absolute inset-0 flex items-center justify-between p-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
            <button
              type="button"
              aria-label="Imagen anterior"
              onClick={(e) => { e.stopPropagation(); prev(); }}
              className="p-1.5 rounded-full shadow-md bg-white/90 text-gray-800 hover:bg-white hover:scale-110 transition-all pointer-events-auto cursor-pointer"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              type="button"
              aria-label="Siguiente imagen"
              onClick={(e) => { e.stopPropagation(); next(); }}
              className="p-1.5 rounded-full shadow-md bg-white/90 text-gray-800 hover:bg-white hover:scale-110 transition-all pointer-events-auto cursor-pointer"
            >
              <ChevronRight size={18} />
            </button>
          </div>
          <div className="absolute bottom-2 right-0 left-0 pointer-events-none">
            <div className="flex items-center justify-center gap-1.5">
              {validItems.map((_, i) => (
                <div key={i} className={`transition-all rounded-full ${curr === i ? "w-4 h-1.5 bg-white shadow-sm" : "w-1.5 h-1.5 bg-white/60"}`} />
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

// Tarjeta de Actividad
const ActivityCard = ({ item, onClick }) => (
  <div
    onClick={() => onClick(item)}
    role="button"
    tabIndex={0}
    onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onClick(item); } }}
    className="group bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col h-full cursor-pointer hover:-translate-y-1.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
  >
    <div className="h-48 overflow-hidden relative bg-slate-200">
      <ImageSlider items={item.galeria} />
      <div className="absolute top-3 right-3 bg-blue-600/90 backdrop-blur-sm text-white text-xs font-bold px-3 py-1 rounded-full border border-blue-400 z-10 pointer-events-none shadow-sm">
        {item.tipo}
      </div>
    </div>
    <div className="p-6 flex flex-col flex-grow relative">
      <div className="flex items-center gap-2 text-slate-400 text-xs font-medium mb-3">
        <Calendar size={14} className="text-blue-500" /> {item.fecha}
        <span className="text-slate-300">•</span>
        <MapPin size={14} className="text-teal-500" /> {item.lugar}
      </div>
      <h3 className="font-bold text-slate-900 text-lg mb-3 leading-snug group-hover:text-blue-600 transition-colors">
        {item.titulo}
      </h3>
      <p className="text-slate-500 text-sm leading-relaxed mb-4 flex-grow line-clamp-3">
        {item.descripcion}
      </p>
      <div className="pt-3 mt-auto border-t border-slate-100 text-blue-600 text-xs font-bold flex items-center justify-between">
        <span>Ver fotos y detalles</span>
        <ChevronRight size={14} className="transform group-hover:translate-x-1 transition-transform" />
      </div>
    </div>
  </div>
);

// Vista Detalle de Actividad
const ActivityDetailView = ({ activity, onBack }) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const validGallery = (activity?.galeria || []).filter(f => f && f.url && f.url.trim() !== '');
  const participantesList = (activity?.participantes || [])
    .flatMap(item => (typeof item === 'string' ? item.split(',') : [item]))
    .map(name => (typeof name === 'string' ? name.trim() : ''))
    .filter(Boolean);

  const nextImage = (e) => {
    if (e) e.stopPropagation();
    setSelectedImageIndex((prev) => (prev === null ? 0 : (prev + 1) % validGallery.length));
  };

  const prevImage = (e) => {
    if (e) e.stopPropagation();
    setSelectedImageIndex((prev) => (prev === null ? 0 : (prev - 1 + validGallery.length) % validGallery.length));
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setSelectedImageIndex(null);
      if (selectedImageIndex !== null) {
        if (e.key === 'ArrowRight') nextImage();
        if (e.key === 'ArrowLeft') prevImage();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedImageIndex, validGallery.length]);

  return (
    <div className="pt-32 pb-20 min-h-screen bg-slate-50 animate-in fade-in zoom-in duration-300">
      <div className="container mx-auto px-6 max-w-6xl">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center gap-2 text-slate-600 hover:text-blue-600 mb-8 font-semibold transition-colors bg-white px-5 py-2.5 rounded-full shadow-sm border border-slate-200 cursor-pointer hover:shadow hover:border-blue-200"
        >
          <ArrowLeft size={18} /> Volver a Actividades
        </button>
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-100">
          <div className="p-8 md:p-12 border-b border-slate-100">
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span className="bg-blue-100 text-blue-700 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                {activity.tipo}
              </span>
              <span className="flex items-center gap-1.5 text-slate-500 text-sm">
                <Calendar size={16} className="text-blue-500" /> {activity.fecha}
              </span>
              <span className="text-slate-300">•</span>
              <span className="flex items-center gap-1.5 text-slate-500 text-sm">
                <MapPin size={16} className="text-teal-500" /> {activity.lugar}
              </span>
            </div>
            <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-6 leading-tight">
              {activity.titulo}
            </h1>
            <p className="text-lg text-slate-600 leading-relaxed max-w-4xl">
              {activity.descripcion}
            </p>
          </div>

          {validGallery.length > 0 && (
            <div className="p-8 md:p-12 bg-slate-50 border-b border-slate-100">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                  <LayoutGrid size={20} className="text-blue-500" /> Galería de Imágenes ({validGallery.length})
                </h3>
                <span className="text-xs text-slate-500 hidden sm:inline-block">Haz clic en cualquier imagen para verla en pantalla completa</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {validGallery.map((foto, idx) => (
                  <div key={idx} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all group flex flex-col h-full border border-slate-200">
                    <div
                      className="relative h-72 sm:h-80 w-full bg-slate-950 flex items-center justify-center overflow-hidden cursor-pointer"
                      onClick={() => setSelectedImageIndex(idx)}
                      title="Haz clic para ver la imagen completa"
                    >
                      <img
                        src={foto.url}
                        alt=""
                        className="absolute inset-0 w-full h-full object-cover blur-md opacity-35 scale-110 pointer-events-none"
                        aria-hidden="true"
                      />
                      <img
                        src={foto.url}
                        alt={`Evidencia ${idx + 1}`}
                        className="relative z-10 max-h-full max-w-full object-contain p-2 transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                      />
                      <div className="absolute top-3 right-3 bg-slate-900/80 backdrop-blur-sm text-white/90 p-2 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity z-20 shadow-sm flex items-center gap-1 text-xs font-semibold">
                        <Maximize2 size={14} /> Ampliar
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {participantesList.length > 0 && (
            <div className="p-8 md:p-12 bg-white">
              <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                <Users size={20} className="text-teal-500" /> Integrantes Participantes
              </h3>
              <div className="flex flex-wrap gap-2.5">
                {participantesList.map((persona, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center gap-2 bg-slate-50 text-slate-700 px-4 py-2 rounded-xl text-sm font-medium border border-slate-200 shadow-2xs hover:border-teal-300 transition-colors"
                  >
                    <span className="w-2 h-2 rounded-full bg-teal-500"></span>
                    {persona}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {selectedImageIndex !== null && validGallery[selectedImageIndex] && (
        <div
          className="fixed inset-0 z-[120] bg-black/90 backdrop-blur-md flex flex-col items-center justify-center p-4 animate-in fade-in duration-200"
          onClick={() => setSelectedImageIndex(null)}
        >
          <button
            type="button"
            onClick={() => setSelectedImageIndex(null)}
            className="absolute top-5 right-5 text-white/80 hover:text-white p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors cursor-pointer z-30"
            aria-label="Cerrar imagen"
          >
            <X size={26} />
          </button>

          {/* Flecha izquierda */}
          {validGallery.length > 1 && (
            <button
              type="button"
              onClick={prevImage}
              className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 text-white/90 hover:text-white p-3 rounded-full bg-white/10 hover:bg-white/25 transition-all cursor-pointer z-30 backdrop-blur-sm shadow-lg hover:scale-110"
              aria-label="Imagen anterior"
            >
              <ChevronLeft size={30} />
            </button>
          )}

          {/* Flecha derecha */}
          {validGallery.length > 1 && (
            <button
              type="button"
              onClick={nextImage}
              className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 text-white/90 hover:text-white p-3 rounded-full bg-white/10 hover:bg-white/25 transition-all cursor-pointer z-30 backdrop-blur-sm shadow-lg hover:scale-110"
              aria-label="Siguiente imagen"
            >
              <ChevronRight size={30} />
            </button>
          )}

          <div
            className="relative max-h-[85vh] max-w-[92vw] flex flex-col items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={validGallery[selectedImageIndex].url}
              alt={`Imagen ${selectedImageIndex + 1} de ${validGallery.length}`}
              className="max-h-[80vh] max-w-full object-contain rounded-xl shadow-2xl"
            />
            {validGallery.length > 1 && (
              <div className="mt-3 px-4 py-1.5 bg-slate-900/80 backdrop-blur-md border border-white/10 text-white/90 text-xs font-semibold rounded-full">
                {selectedImageIndex + 1} / {validGallery.length}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

// Vista Dedicada: Sobre Nosotros (Identidad, Misión, Visión, Ejes y Formación)
const AboutView = ({ onBack, onNavigateWhatWeDo, onContact, institutionalInfo }) => {
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const info = institutionalInfo || {};
  const ejes = info.ejesEstrategicos || [];
  const formacion = info.formacionPregrado || {};
  const etapas = formacion.etapas || [];

  return (
    <div className="pt-32 pb-24 min-h-screen bg-slate-50 animate-in fade-in duration-300">
      <div className="container mx-auto px-6 max-w-6xl">
        {/* Botón Volver */}
        <div className="mb-8">
          <button
            type="button"
            onClick={onBack}
            className="inline-flex items-center gap-2 text-slate-600 hover:text-blue-600 font-semibold transition-colors bg-white px-5 py-2.5 rounded-full shadow-sm border border-slate-200 cursor-pointer hover:shadow"
          >
            <ArrowLeft size={18} /> Volver al inicio
          </button>
        </div>

        {/* Encabezado Principal */}
        <div className="mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-100 text-blue-700 font-bold text-xs uppercase tracking-wider mb-4">
            <Sparkles size={14} className="text-blue-600" /> Laboratorio LaTSIB · UTEM
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
            Sobre Nosotros
          </h1>
          <p className="text-lg text-slate-600 max-w-3xl">
            Identidad institucional, misión, visión y proyección formativa del Laboratorio de Biomédica Traslacional.
          </p>
        </div>

        {/* Banner Presentación Institucional */}
        <div className="bg-gradient-to-br from-[#08182b] via-[#0d2a45] to-[#0a3853] rounded-3xl p-8 sm:p-12 text-white shadow-xl mb-16 relative overflow-hidden">
          <div className="absolute -right-10 -bottom-10 w-80 h-80 bg-teal-500/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -left-10 -top-10 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10">
            <span className="text-xs uppercase font-bold tracking-widest text-teal-300 block mb-3">
              Presentación Institucional
            </span>
            <p className="text-lg sm:text-xl text-slate-100 leading-relaxed font-normal">
              {info.presentacion}
            </p>
          </div>
        </div>

        {/* Misión y Visión */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {/* Misión */}
          <div className="bg-white rounded-3xl p-8 sm:p-10 shadow-sm border border-slate-200/80 hover:shadow-md transition-shadow flex flex-col">
            <div className="w-14 h-14 rounded-2xl bg-teal-50 text-teal-600 flex items-center justify-center mb-6 border border-teal-100 shadow-2xs">
              <Target size={28} />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 mb-4 tracking-tight">
              Misión Institucional
            </h2>
            <div className="text-slate-600 leading-relaxed space-y-4 text-sm sm:text-base flex-grow">
              {(info.mision || '').split('\n\n').map((parrafo, i) => (
                <p key={i}>{parrafo}</p>
              ))}
            </div>
          </div>

          {/* Visión */}
          <div className="bg-white rounded-3xl p-8 sm:p-10 shadow-sm border border-slate-200/80 hover:shadow-md transition-shadow flex flex-col">
            <div className="w-14 h-14 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mb-6 border border-blue-100 shadow-2xs">
              <Eye size={28} />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 mb-4 tracking-tight">
              Visión de Futuro
            </h2>
            <div className="text-slate-600 leading-relaxed space-y-4 text-sm sm:text-base flex-grow">
              {(info.vision || '').split('\n\n').map((parrafo, i) => (
                <p key={i}>{parrafo}</p>
              ))}
            </div>
          </div>
        </div>

        {/* Ejes Estratégicos */}
        <div className="mb-20">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-slate-700 font-bold text-xs uppercase tracking-wider mb-3">
              Lineamientos Directores
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-3">
              Ejes Estratégicos del Laboratorio
            </h2>
            <p className="text-slate-600 text-sm sm:text-base">
              Cuatro pilares fundamentales que articulan la actividad científica, formativa y de transferencia tecnológica de LaTSIB.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {ejes.map((eje, idx) => (
              <div
                key={idx}
                className="bg-white p-7 rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-3xl font-black text-slate-200 group-hover:text-teal-400 transition-colors">
                      {eje.numero}
                    </span>
                    <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-600 border border-slate-100">
                      {idx === 0 ? <Atom size={20} className="text-blue-600" /> :
                       idx === 1 ? <GraduationCap size={20} className="text-teal-600" /> :
                       idx === 2 ? <HeartPulse size={20} className="text-rose-600" /> :
                                   <Globe size={20} className="text-indigo-600" />}
                    </div>
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-3 leading-snug">
                    {eje.titulo}
                  </h3>
                  <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                    {eje.descripcion}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Formación Científica desde el Pregrado */}
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200/80 shadow-sm mb-16">
          <div className="max-w-3xl mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 text-teal-700 font-bold text-xs uppercase tracking-wider mb-3 border border-teal-100">
              <GraduationCap size={14} /> {formacion.subtitulo}
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
              {formacion.titulo}
            </h2>
            <p className="text-slate-700 leading-relaxed text-base sm:text-lg">
              {formacion.introduccion}
            </p>
          </div>

          {/* Infografía Oficial */}
          <div className="my-10 bg-slate-50 rounded-2xl p-4 sm:p-8 border border-slate-200">
            <div className="flex items-center justify-between mb-4 px-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Infografía Oficial · Trayectoria Formativa en Investigación
              </span>
              <button
                type="button"
                onClick={() => setSelectedImage({ url: formacion.infografia, descripcion: "Trayectoria formativa de capital humano en investigación LaTSIB" })}
                className="text-xs text-blue-600 hover:text-blue-700 font-semibold inline-flex items-center gap-1 cursor-pointer"
              >
                <Maximize2 size={13} /> Ampliar
              </button>
            </div>
            <div 
              className="rounded-xl overflow-hidden shadow-sm border border-slate-200 bg-white cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => setSelectedImage({ url: formacion.infografia, descripcion: "Trayectoria formativa de capital humano en investigación LaTSIB" })}
            >
              <img
                src={formacion.infografia || "/trayectoria-formacion.png"}
                alt="Trayectoria de formación científica desde el pregrado LaTSIB"
                className="w-full h-auto object-contain mx-auto"
                loading="lazy"
              />
            </div>
            {formacion.notaPie && (
              <p className="text-xs text-slate-500 mt-3 text-center italic">
                * {formacion.notaPie}
              </p>
            )}
          </div>

          {/* Las 4 Etapas Formativas */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
            {etapas.map((etapa, idx) => (
              <div key={idx} className="bg-slate-50 p-6 rounded-2xl border border-slate-200/70 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-black bg-blue-100 text-blue-700">
                      Paso {etapa.paso}
                    </span>
                  </div>
                  <h4 className="font-bold text-slate-900 text-base mb-1">
                    {etapa.nombre}
                  </h4>
                  <span className="text-xs font-semibold text-teal-600 block mb-3">
                    {etapa.alcance}
                  </span>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {etapa.descripcion}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Bloque de Acompañamiento y Principio Orientador */}
          <div className="grid md:grid-cols-2 gap-6 pt-6 border-t border-slate-100">
            <div className="p-6 rounded-2xl bg-gradient-to-br from-blue-50/80 to-slate-50 border border-blue-100/80">
              <h4 className="text-sm font-bold uppercase tracking-wider text-blue-900 mb-2 flex items-center gap-2">
                <CheckCircle2 size={16} className="text-blue-600" /> Acompañamiento y Tutoría
              </h4>
              <p className="text-slate-700 text-xs sm:text-sm leading-relaxed">
                {formacion.acompanamiento}
              </p>
            </div>
            <div className="p-6 rounded-2xl bg-gradient-to-br from-teal-50/80 to-slate-50 border border-teal-100/80">
              <h4 className="text-sm font-bold uppercase tracking-wider text-teal-900 mb-2 flex items-center gap-2">
                <Lightbulb size={16} className="text-teal-600" /> Principio Orientador
              </h4>
              <p className="text-slate-700 text-xs sm:text-sm leading-relaxed italic">
                "{formacion.principioOrientador}"
              </p>
            </div>
          </div>
        </div>

        {/* Acciones de Navegación Finales */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-center">
          <button
            type="button"
            onClick={onNavigateWhatWeDo}
            className="w-full sm:w-auto px-8 py-3.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold transition-all shadow-md cursor-pointer flex items-center justify-center gap-2"
          >
            <span>Ver ¿Qué Hacemos? y Líneas de Investigación</span>
            <ChevronRight size={18} />
          </button>
          <button
            type="button"
            onClick={onContact}
            className="w-full sm:w-auto px-8 py-3.5 bg-white hover:bg-slate-100 text-slate-700 border border-slate-300 rounded-xl font-bold transition-all shadow-sm cursor-pointer flex items-center justify-center gap-2"
          >
            <Mail size={18} /> Contactar al Laboratorio
          </button>
        </div>
      </div>

      {/* Modal Lightbox de Imagen */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-[130] bg-black/90 backdrop-blur-md flex flex-col items-center justify-center p-4 animate-in fade-in duration-200"
          onClick={() => setSelectedImage(null)}
        >
          <button
            type="button"
            onClick={() => setSelectedImage(null)}
            className="absolute top-5 right-5 text-white/80 hover:text-white p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors cursor-pointer z-30"
            aria-label="Cerrar imagen"
          >
            <X size={26} />
          </button>
          <div
            className="relative max-h-[90vh] max-w-[95vw] flex flex-col items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={selectedImage.url}
              alt={selectedImage.descripcion || "Imagen"}
              className="max-h-[80vh] max-w-full object-contain rounded-xl shadow-2xl bg-white p-2"
            />
            {selectedImage.descripcion && (
              <div className="mt-4 p-4 bg-slate-900/90 backdrop-blur-md border border-white/10 text-white text-sm max-w-2xl text-center rounded-2xl">
                {selectedImage.descripcion}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

// Vista Detalle de Proyecto / Línea de Investigación
const ResearchDetailView = ({ research, onBack }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const headerGradient = research?.color || "from-slate-50 to-white";
  const validImages = (research?.imagenes || []).filter(img => img && img.url && img.url.trim() !== '');
  const integrantesList = (research?.integrantes || [])
    .flatMap(item => (typeof item === 'string' ? item.split(',') : [item]))
    .map(name => (typeof name === 'string' ? name.trim() : ''))
    .filter(Boolean);
  const docsList = (research?.documentos || []).filter(doc => doc && doc.titulo);

  return (
    <div className="pt-32 pb-20 min-h-screen bg-slate-50 animate-in fade-in zoom-in duration-300">
      <div className="container mx-auto px-6 max-w-6xl">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center gap-2 text-slate-600 hover:text-blue-600 mb-8 font-semibold transition-colors bg-white px-5 py-2.5 rounded-full shadow-sm border border-slate-200 cursor-pointer hover:shadow hover:border-blue-200"
        >
          <ArrowLeft size={18} /> Volver a Investigaciones
        </button>
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-100">
          <div className={`p-8 md:p-12 border-b border-slate-100 bg-gradient-to-r ${headerGradient}`}>
            <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
              <div className="p-4 bg-white/90 backdrop-blur-sm rounded-2xl w-fit shadow-md border border-slate-100">
                <Atom className="w-8 h-8 text-[#1f7a8c]" />
              </div>
              {research?.badge && (
                <span className="bg-teal-600/90 text-white text-xs font-bold px-3.5 py-1.5 rounded-full border border-teal-400 shadow-sm">
                  {research.badge}
                </span>
              )}
            </div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-6 leading-tight">
              {research?.titulo}
            </h1>
            <p className="text-lg text-slate-700 leading-relaxed max-w-4xl">
              {research?.desc}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-0">
            <div className="md:col-span-2 p-8 md:p-12 bg-white">
              <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                <LayoutGrid size={20} className="text-blue-500" /> Galería y Evidencia Experimental
              </h3>

              {validImages.length > 0 ? (
                <div className="grid gap-6">
                  {validImages.map((img, idx) => (
                    <div key={idx} className="rounded-2xl overflow-hidden border border-slate-100 shadow-sm bg-slate-50">
                      <img src={img.url} alt={img.desc || `Evidencia ${idx + 1}`} className="w-full h-auto object-cover" loading="lazy" />
                      {img.desc && (
                        <div className="p-4 bg-slate-50 text-sm text-slate-600 italic border-t border-slate-100 flex items-start gap-2">
                          <Info size={16} className="text-blue-400 mt-0.5 shrink-0" />
                          <span>{img.desc}</span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="bg-slate-50 border border-slate-200/70 rounded-2xl p-8 text-center">
                  <BookOpen size={36} className="mx-auto text-slate-400 mb-3" />
                  <h4 className="font-bold text-slate-700 mb-1">Proyecto en Desarrollo Activo</h4>
                  <p className="text-slate-500 text-sm max-w-md mx-auto">
                    Los registros experimentales, diagramas de arquitectura y material asociado se actualizan continuamente.
                  </p>
                </div>
              )}
            </div>

            <div className="p-8 md:p-12 bg-slate-50 border-t md:border-t-0 md:border-l border-slate-100">
              <div className="mb-10">
                <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                  <Users size={18} className="text-teal-500" /> Investigadores ({integrantesList.length})
                </h3>
                <ul className="space-y-2.5">
                  {integrantesList.map((member, i) => (
                    <li
                      key={i}
                      className="flex items-center gap-2.5 text-slate-700 bg-white p-3 rounded-xl border border-slate-200 shadow-2xs text-sm font-medium hover:border-teal-300 transition-colors"
                    >
                      <div className="w-2.5 h-2.5 rounded-full bg-teal-500 shrink-0"></div>
                      <span>{member}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {docsList.length > 0 && (
                <div>
                  <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                    <FileText size={18} className="text-indigo-500" /> Documentos y Papers
                  </h3>
                  <ul className="space-y-3">
                    {docsList.map((doc, i) => (
                      <li key={i}>
                        <a
                          href={doc.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block p-3.5 bg-white rounded-xl border border-slate-200 shadow-2xs hover:border-indigo-300 hover:shadow-md transition-all group"
                        >
                          <div className="font-semibold text-slate-800 text-sm mb-1.5 group-hover:text-indigo-600 leading-snug">
                            {doc.titulo}
                          </div>
                          <div className="flex items-center gap-1.5 text-xs text-slate-400 group-hover:text-indigo-500 font-medium">
                            <Download size={13} /> {doc.tipo || "Enlace"}
                          </div>
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Modal de Detalle de Integrante
const MemberDetailModal = ({ member, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!member) return null;

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      <div
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity duration-300 animate-in fade-in"
        onClick={onClose}
      />

      <div className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden z-10 animate-in zoom-in-95 duration-200 my-auto max-h-[90vh] flex flex-col">
        <div className="bg-gradient-to-r from-blue-700 via-blue-600 to-teal-600 px-6 py-4 text-white flex items-center justify-between shrink-0">
          <span className="text-xs uppercase tracking-widest text-blue-100 font-bold">
            Perfil del Integrante
          </span>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-full text-white/80 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            aria-label="Cerrar"
          >
            <X size={20} />
          </button>
        </div>

        <div className="p-5 sm:p-8 overflow-y-auto flex-grow">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 text-center sm:text-left mb-6 pb-6 border-b border-slate-100">
            <div className="w-28 h-28 rounded-2xl overflow-hidden bg-slate-100 shrink-0 shadow-md border-2 border-white ring-2 ring-slate-100">
              <img src={member.img || '/logo-circle.png'} alt={member.nombre} className="w-full h-full object-cover" />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-2 justify-center sm:justify-start">
                <span className="inline-block px-3 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider bg-blue-50 text-blue-700 border border-blue-100">
                  {member.categoria === 'academicos' ? 'Equipo Científico y Profesional' : member.categoria === 'exintegrantes' ? 'Exintegrante' : 'Asistente de Investigación'}
                </span>
                {member.esTesista && (
                  <span className="inline-block px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider bg-[#7952A0] text-white border border-[#7952A0]">
                    Egresado
                  </span>
                )}
              </div>
              <h3 className="text-2xl font-bold text-slate-900 leading-tight mb-1">{member.nombre}</h3>
              <p className="text-blue-600 text-sm font-semibold mb-2">{member.rol}</p>
              <p className="text-slate-500 text-xs leading-relaxed">{member.bio}</p>
            </div>
          </div>

          <div className="mb-6 bg-slate-50 rounded-2xl p-5 border border-slate-100">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-2.5 flex items-center gap-2">
              <FileText size={16} className="text-blue-600" />
              Actividades y Proyectos en el Laboratorio
            </h4>
            <p className="text-slate-600 text-sm leading-relaxed whitespace-pre-line">
              {member.actividadesLab || "Desarrollo de proyectos de investigación, análisis de datos biomédicos, procesamiento de señales y colaboración en las líneas activas de investigación de LaTSIB."}
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
            <div className="flex flex-wrap items-center gap-2">
              {member.contactos?.linkedin && (
                <a
                  href={member.contactos.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-slate-100 text-slate-700 hover:text-white hover:bg-blue-600 transition-colors shadow-2xs"
                >
                  <Linkedin size={15} /> LinkedIn
                </a>
              )}
              {member.contactos?.github && (
                <a
                  href={member.contactos.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-slate-100 text-slate-700 hover:text-white hover:bg-slate-900 transition-colors shadow-2xs"
                >
                  <Github size={15} /> GitHub
                </a>
              )}
              {member.contactos?.email && (
                <a
                  href={`mailto:${member.contactos.email}`}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-teal-50 text-teal-700 hover:text-white hover:bg-teal-600 transition-colors border border-teal-100 shadow-2xs"
                >
                  <Mail size={15} /> {member.contactos.email}
                </a>
              )}
            </div>
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-slate-500 hover:text-slate-800 transition-colors cursor-pointer ml-auto"
            >
              Cerrar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const TeamMemberCard = ({ miembro, onSelect }) => (
  <div
    onClick={() => onSelect(miembro)}
    role="button"
    tabIndex={0}
    onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onSelect(miembro); } }}
    className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all text-center group border border-slate-100 flex flex-col relative cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500"
  >
    <div className="h-48 overflow-hidden relative bg-slate-200">
      <img src={miembro.img || '/logo-circle.png'} alt={miembro.nombre} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
      {miembro.esTesista && (
        <div className="absolute top-3 right-3 bg-[#7952A0] backdrop-blur-sm text-white text-[11px] font-bold px-2.5 py-0.5 rounded-full border border-[#7952A0] z-10 shadow-sm">
          Egresado
        </div>
      )}
      <div className="absolute inset-0 bg-blue-900/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none flex items-end justify-center pb-3">
        <span className="text-[11px] font-bold text-white bg-slate-900/90 px-3 py-1 rounded-full backdrop-blur-sm shadow-md flex items-center gap-1.5">
          <Info size={13} /> Ver actividades
        </span>
      </div>
    </div>
    <div className="p-6 flex flex-col flex-grow">
      <h3 className="font-bold text-slate-900 text-lg mb-1 leading-snug group-hover:text-blue-600 transition-colors">{miembro.nombre}</h3>
      <p className="text-blue-600 text-sm font-semibold mb-3">{miembro.rol}</p>
      <p className="text-slate-500 text-xs leading-relaxed mb-5 flex-grow">{miembro.bio}</p>
      
      <div className="flex justify-center items-center gap-3 pt-3 border-t border-slate-100 mt-auto" onClick={(e) => e.stopPropagation()}>
        {miembro.contactos?.linkedin && (
          <a
            href={miembro.contactos.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-full text-slate-400 hover:text-blue-600 hover:bg-slate-50 transition-all shadow-2xs"
            aria-label="LinkedIn"
          >
            <Linkedin size={18} />
          </a>
        )}
        {miembro.contactos?.github && (
          <a
            href={miembro.contactos.github}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-full text-slate-400 hover:text-slate-900 hover:bg-slate-50 transition-all shadow-2xs"
            aria-label="GitHub"
          >
            <Github size={18} />
          </a>
        )}
        {miembro.contactos?.email && (
          <a
            href={`mailto:${miembro.contactos.email}`}
            className="p-2 rounded-full text-slate-400 hover:text-teal-600 hover:bg-slate-50 transition-all shadow-2xs"
            aria-label="Email"
          >
            <Mail size={18} />
          </a>
        )}
      </div>
    </div>
  </div>
);

const SectionTitle = ({ children, subtitle }) => (
  <div className="mb-10 sm:mb-12 text-center px-4">
    <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 mb-3 sm:mb-4 tracking-tight">{children}</h2>
    <div className="w-20 sm:w-24 h-1.5 bg-blue-600 mx-auto rounded-full mb-3 sm:mb-4"></div>
    {subtitle && <p className="text-slate-600 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">{subtitle}</p>}
  </div>
);

const NavLink = ({ children, mobile, onClick }) => (
  <button
    type="button"
    onClick={onClick}
    className={`${mobile ? 'block w-full text-left py-3 text-lg border-b border-slate-100' : 'text-sm font-medium'} text-slate-600 hover:text-blue-600 transition-colors uppercase tracking-wide cursor-pointer`}
  >
    {children}
  </button>
);

// --- COMPONENTE INTERNO CONTEXT-AWARE ---
function AppContent() {
  const { 
    config, 
    equipo, 
    publicaciones, 
    actividades, 
    proyectos, 
    institutionalInfo,
    lineasInvestigacion,
    categoriasEquipo, 
    currentUser 
  } = useData();

  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [sideDrawerOpen, setSideDrawerOpen] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);

  // Parser de ruta seguro y flexible (soporta hash, pathname y search query params)
  const parseRoute = () => {
    const rawPath = window.location.pathname.replace(/^\/+/, '').trim();
    const rawHash = window.location.hash.replace(/^#\/?/, '').trim();
    const searchParams = new URLSearchParams(window.location.search);
    
    // Determinar la clave de ruta principal
    let pathKey = (rawHash.split('?')[0] || rawPath || '').toLowerCase();
    
    if (pathKey === 'nosotros' || pathKey === 'about-us' || pathKey === 'sobre-nosotros') {
      return { view: 'about-us', id: null, section: null };
    }
    if (!pathKey || pathKey === 'about' || pathKey === 'research' || pathKey === 'activities' || pathKey === 'team' || pathKey === 'publications' || pathKey === 'contact') {
      return { view: 'landing', id: null, section: pathKey || null };
    }
    if (pathKey === 'que-hacemos' || pathKey === 'quehacemos') {
      return { view: 'what-we-do', id: null, section: null };
    }
    if (pathKey === 'investigaciones') {
      return { view: 'research-list', id: null, section: null };
    }
    if (pathKey.startsWith('investigacion/')) {
      const rawId = pathKey.replace('investigacion/', '');
      const numId = parseInt(rawId, 10);
      return { view: 'research-detail', id: isNaN(numId) ? rawId : numId, section: null };
    }
    if (pathKey === 'actividades') {
      return { view: 'activities-list', id: null, section: null };
    }
    if (pathKey.startsWith('actividad/')) {
      const rawId = pathKey.replace('actividad/', '');
      const numId = parseInt(rawId, 10);
      return { view: 'activity-detail', id: isNaN(numId) ? rawId : numId, section: null };
    }
    if (pathKey === 'publicaciones') {
      return { view: 'publications-list', id: null, section: null };
    }
    if (pathKey === 'equipo') {
      return { view: 'team-list', id: null, section: null };
    }
    if (pathKey === 'privacidad' || pathKey === 'politica-privacidad') {
      return { view: 'legal', id: 'privacidad', section: null };
    }
    if (pathKey === 'terminos' || pathKey === 'terminos-y-condiciones') {
      return { view: 'legal', id: 'terminos', section: null };
    }
    if (pathKey === 'cookies' || pathKey === 'politica-cookies') {
      return { view: 'legal', id: 'cookies', section: null };
    }
    if (pathKey === 'registro-consentimiento' || pathKey === 'derechos-arcop') {
      return { view: 'legal', id: 'registro', section: null };
    }
    return { view: 'landing', id: null, section: null };
  };

  const [route, setRoute] = useState(parseRoute);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleLocationChange = () => {
      const currentRoute = parseRoute();
      setRoute(currentRoute);
      if (currentRoute.section) {
        setTimeout(() => {
          const el = document.getElementById(currentRoute.section);
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }, 60);
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    };

    window.addEventListener('hashchange', handleLocationChange);
    window.addEventListener('popstate', handleLocationChange);

    if (route.section) {
      setTimeout(() => {
        const el = document.getElementById(route.section);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }

    return () => {
      window.removeEventListener('hashchange', handleLocationChange);
      window.removeEventListener('popstate', handleLocationChange);
    };
  }, []);

  const navigateTo = (targetView, id = null) => {
    let newHash = '';
    if (targetView === 'landing') newHash = '';
    else if (targetView === 'about-us') newHash = 'nosotros';
    else if (targetView === 'what-we-do') newHash = 'que-hacemos';
    else if (targetView === 'research-list') newHash = 'investigaciones';
    else if (targetView === 'research-detail') newHash = `investigacion/${id}`;
    else if (targetView === 'activities-list') newHash = 'actividades';
    else if (targetView === 'activity-detail') newHash = `actividad/${id}`;
    else if (targetView === 'publications-list') newHash = 'publicaciones';
    else if (targetView === 'team-list') newHash = 'equipo';
    else if (targetView === 'legal') {
      if (id === 'terminos') newHash = 'terminos';
      else if (id === 'cookies') newHash = 'cookies';
      else if (id === 'registro') newHash = 'registro-consentimiento';
      else newHash = 'privacidad';
    }

    const fullNewHash = newHash ? `#${newHash}` : '#';
    if (window.location.hash === fullNewHash || (!window.location.hash && fullNewHash === '#')) {
      setRoute(parseRoute());
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      window.location.hash = newHash;
    }
  };

  const handleBack = (fallbackView = 'landing') => {
    if (window.history.length > 1) {
      window.history.back();
    } else {
      navigateTo(fallbackView);
    }
  };

  const handleViewResearch = (research) => {
    navigateTo('research-detail', research.id);
  };

  const handleViewActivity = (activity) => {
    navigateTo('activity-detail', activity.id);
  };

  const scrollToSection = (id) => {
    setMobileMenuOpen(false);
    setSideDrawerOpen(false);
    if (id === 'about' || id === 'about-us' || id === 'nosotros') { navigateTo('about-us'); return; }
    if (id === 'what-we-do') { navigateTo('what-we-do'); return; }
    if (id === 'all-activities') { navigateTo('activities-list'); return; }
    if (id === 'all-research') { navigateTo('research-list'); return; }
    if (id === 'all-publications') { navigateTo('publications-list'); return; } 
    if (id === 'all-team') { navigateTo('team-list'); return; }

    if (route.view !== 'landing') {
      window.location.hash = id;
    } else {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  // Filtrado de datasets dinámicos para vistas públicas
  const currentResearch = route.view === 'research-detail'
    ? proyectos.find((r) => r.id === route.id || String(r.id) === String(route.id)) || null
    : null;

  const currentActivity = route.view === 'activity-detail'
    ? actividades.find((a) => a.id === route.id || String(a.id) === String(route.id)) || null
    : null;

  const actividadesNacionales = actividades.filter((a) => a.tipo === 'Nacional');
  const actividadesInternacionales = actividades.filter((a) => a.tipo === 'Internacional');

  // Integrantes visibles (no ocultos)
  const equipoVisible = equipo.filter((m) => m.activo !== false);

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800">
      {/* NAVBAR PÚBLICA */}
      <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled || route.view !== 'landing' ? 'bg-white/95 backdrop-blur-md shadow-md py-3' : 'bg-transparent py-5'}`}>
        <div className="container mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setSideDrawerOpen(true)}
              className={`p-2 rounded-xl transition-all cursor-pointer ${
                isScrolled || route.view !== 'landing'
                  ? 'text-slate-700 hover:bg-slate-100 hover:text-blue-600'
                  : 'text-white hover:bg-white/10'
              }`}
              aria-label="Abrir menú de navegación"
              title="Menú"
            >
              <Menu size={24} />
            </button>
            <div
              className="flex items-center gap-2.5 sm:gap-3.5 cursor-pointer select-none group min-w-0"
              onClick={() => { navigateTo('landing'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            >
              {/* Logo UTEM (sin fondo) */}
              <img src={utemLogo} alt="Logo Universidad Tecnológica Metropolitana" className="h-14 sm:h-16 md:h-[72px] w-auto object-contain drop-shadow-md shrink-0 group-hover:scale-105 transition-transform duration-300" />

              {/* Logo LaTSIB */}
              <img 
                src={config?.imagenes?.logo || '/logo-circle.png'} 
                alt="Logo LaTSIB" 
                className="h-12 w-12 sm:h-14 sm:w-14 md:h-16 md:w-16 object-contain drop-shadow-md group-hover:scale-105 transition-transform duration-300 shrink-0" 
              />
              <span className={`text-xl sm:text-2xl md:text-3xl font-extrabold tracking-tight truncate ${isScrolled || route.view !== 'landing' ? 'text-slate-900' : 'text-slate-900 lg:text-white'} transition-colors`}>
                {config.nombreGrupo}
              </span>
            </div>
          </div>
          <div className={`hidden md:flex items-center gap-7 ${isScrolled || route.view !== 'landing' ? 'text-slate-600' : 'text-white'}`}>
            <button type="button" onClick={() => navigateTo('about-us')} className="hover:text-blue-500 font-medium transition-colors cursor-pointer">Nosotros</button>
            <button type="button" onClick={() => navigateTo('what-we-do')} className="hover:text-blue-500 font-medium transition-colors cursor-pointer">¿Qué Hacemos?</button>
            <button type="button" onClick={() => scrollToSection('research')} className="hover:text-blue-500 font-medium transition-colors cursor-pointer">Investigación</button>
            <button type="button" onClick={() => scrollToSection('activities')} className="hover:text-blue-500 font-medium transition-colors cursor-pointer">Actividades</button>
            <button type="button" onClick={() => scrollToSection('team')} className="hover:text-blue-500 font-medium transition-colors cursor-pointer">Equipo</button>
            <button type="button" onClick={() => scrollToSection('publications')} className="hover:text-blue-500 font-medium transition-colors cursor-pointer">Publicaciones</button>
            <button
              type="button"
              onClick={() => setIsContactModalOpen(true)}
              className={`px-5 py-2 rounded-full font-semibold transition-all shadow-sm cursor-pointer ${isScrolled || route.view !== 'landing' ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-white text-blue-900 hover:bg-blue-50'}`}
            >
              Contacto
            </button>
          </div>
          <button
            type="button"
            className="md:hidden text-slate-800 p-2 cursor-pointer"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Abrir menú"
          >
            {mobileMenuOpen ? <X /> : <Menu className={isScrolled || route.view !== 'landing' ? 'text-slate-900' : 'text-slate-900 lg:text-white'} />}
          </button>
        </div>
        {mobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 w-full bg-white shadow-xl border-t border-slate-100 p-6 flex flex-col gap-2 animate-in fade-in duration-200">
            <NavLink mobile onClick={() => { setMobileMenuOpen(false); navigateTo('about-us'); }}>Nosotros</NavLink>
            <NavLink mobile onClick={() => { setMobileMenuOpen(false); navigateTo('what-we-do'); }}>¿Qué Hacemos?</NavLink>
            <NavLink mobile onClick={() => scrollToSection('research')}>Investigación</NavLink>
            <NavLink mobile onClick={() => scrollToSection('activities')}>Actividades</NavLink>
            <NavLink mobile onClick={() => scrollToSection('team')}>Equipo</NavLink>
            <NavLink mobile onClick={() => scrollToSection('publications')}>Publicaciones</NavLink>
            <NavLink mobile onClick={() => { setMobileMenuOpen(false); setIsContactModalOpen(true); }}>Contacto</NavLink>
          </div>
        )}
      </nav>

      {/* MENÚ LATERAL DESLIZANTE */}
      {sideDrawerOpen && (
        <div className="fixed inset-0 z-[120] flex">
          <div
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity duration-300 animate-in fade-in"
            onClick={() => setSideDrawerOpen(false)}
          />
          <div className="relative w-full max-w-xs sm:max-w-sm bg-white h-full shadow-2xl z-10 flex flex-col p-6 animate-in slide-in-from-left duration-300 border-r border-slate-100">
            <div className="flex items-center justify-between pb-5 border-b border-slate-100 mb-6">
              <div
                className="flex items-center gap-3 cursor-pointer"
                onClick={() => { setSideDrawerOpen(false); navigateTo('landing'); }}
              >
                <img src={utemLogo} alt="Logo UTEM" className="h-12 w-auto object-contain shrink-0" />
                <img src={config?.imagenes?.logo || '/logo-circle.png'} alt="Logo LaTSIB" className="h-10 w-10 object-contain" />
                <div>
                  <span className="font-extrabold text-xl text-slate-900 tracking-tight block leading-tight">{config.nombreGrupo}</span>
                  <span className="text-[10px] text-slate-400 font-medium">Laboratorio LaTSIB · UTEM</span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setSideDrawerOpen(false)}
                className="p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
                aria-label="Cerrar menú lateral"
              >
                <X size={20} />
              </button>
            </div>

            <div className="flex flex-col gap-1.5 flex-grow overflow-y-auto pr-1">
              <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400 px-3 mb-1">Navegación</p>
              
              <button
                type="button"
                onClick={() => { setSideDrawerOpen(false); navigateTo('about-us'); }}
                className="flex items-center gap-3.5 px-3.5 py-3 text-left rounded-xl text-slate-700 hover:text-blue-600 hover:bg-blue-50/70 font-semibold text-sm transition-all cursor-pointer group"
              >
                <div className="p-1.5 rounded-lg bg-slate-100 text-slate-600 group-hover:bg-blue-100 group-hover:text-blue-600 transition-colors">
                  <Info size={16} />
                </div>
                <span>Nosotros</span>
              </button>

              <button
                type="button"
                onClick={() => { setSideDrawerOpen(false); navigateTo('what-we-do'); }}
                className="flex items-center gap-3.5 px-3.5 py-3 text-left rounded-xl text-slate-700 hover:text-blue-600 hover:bg-blue-50/70 font-semibold text-sm transition-all cursor-pointer group"
              >
                <div className="p-1.5 rounded-lg bg-teal-50 text-teal-600 group-hover:bg-teal-100 group-hover:text-teal-700 transition-colors">
                  <Atom size={16} />
                </div>
                <span>¿Qué Hacemos?</span>
              </button>

              <button
                type="button"
                onClick={() => { setSideDrawerOpen(false); scrollToSection('research'); }}
                className="flex items-center gap-3.5 px-3.5 py-3 text-left rounded-xl text-slate-700 hover:text-blue-600 hover:bg-blue-50/70 font-semibold text-sm transition-all cursor-pointer group"
              >
                <div className="p-1.5 rounded-lg bg-indigo-50 text-indigo-600 group-hover:bg-indigo-100 group-hover:text-indigo-700 transition-colors">
                  <Cpu size={16} />
                </div>
                <span>Líneas de Investigación</span>
              </button>

              <button
                type="button"
                onClick={() => { setSideDrawerOpen(false); scrollToSection('activities'); }}
                className="flex items-center gap-3.5 px-3.5 py-3 text-left rounded-xl text-slate-700 hover:text-blue-600 hover:bg-blue-50/70 font-semibold text-sm transition-all cursor-pointer group"
              >
                <div className="p-1.5 rounded-lg bg-amber-50 text-amber-600 group-hover:bg-amber-100 group-hover:text-amber-700 transition-colors">
                  <Calendar size={16} />
                </div>
                <span>Actividades y Congresos</span>
              </button>

              <button
                type="button"
                onClick={() => { setSideDrawerOpen(false); scrollToSection('team'); }}
                className="flex items-center gap-3.5 px-3.5 py-3 text-left rounded-xl text-slate-700 hover:text-blue-600 hover:bg-blue-50/70 font-semibold text-sm transition-all cursor-pointer group"
              >
                <div className="p-1.5 rounded-lg bg-emerald-50 text-emerald-600 group-hover:bg-emerald-100 group-hover:text-emerald-700 transition-colors">
                  <Users size={16} />
                </div>
                <span>Equipo</span>
              </button>

              <button
                type="button"
                onClick={() => { setSideDrawerOpen(false); scrollToSection('publications'); }}
                className="flex items-center gap-3.5 px-3.5 py-3 text-left rounded-xl text-slate-700 hover:text-blue-600 hover:bg-blue-50/70 font-semibold text-sm transition-all cursor-pointer group"
              >
                <div className="p-1.5 rounded-lg bg-purple-50 text-purple-600 group-hover:bg-purple-100 group-hover:text-purple-700 transition-colors">
                  <BookOpen size={16} />
                </div>
                <span>Publicaciones</span>
              </button>
            </div>

            <div className="pt-4 border-t border-slate-100 mt-auto">
              <button
                type="button"
                onClick={() => { setSideDrawerOpen(false); setIsContactModalOpen(true); }}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 text-white rounded-xl font-bold text-sm hover:bg-blue-700 transition-colors shadow-sm cursor-pointer"
              >
                <Mail size={16} /> Contactar al Laboratorio
              </button>
              <p className="text-center text-xs text-slate-400 mt-3">{config.email}</p>
            </div>
          </div>
        </div>
      )}

      {/* --- RENDERIZADO CONDICIONAL DE VISTAS PÚBLICAS --- */}

      {/* VISTA: SOBRE NOSOTROS */}
      {route.view === 'about-us' ? (
        <AboutView
          onBack={() => navigateTo('landing')}
          onNavigateWhatWeDo={() => navigateTo('what-we-do')}
          onContact={() => setIsContactModalOpen(true)}
          institutionalInfo={institutionalInfo}
        />
      ) : route.view === 'what-we-do' ? (
        <div className="pt-32 pb-24 min-h-screen bg-slate-50 animate-in fade-in duration-300">
          <div className="container mx-auto px-6 max-w-6xl">
            <div className="mb-10">
              <button
                type="button"
                onClick={() => navigateTo('landing')}
                className="inline-flex items-center gap-2 text-slate-600 hover:text-blue-600 mb-6 font-semibold transition-colors bg-white px-5 py-2.5 rounded-full shadow-sm border border-slate-200 cursor-pointer hover:shadow"
              >
                <ArrowLeft size={18} /> Volver al inicio
              </button>
              <div className="flex items-center gap-3 mb-3">
                <span className="px-3.5 py-1 rounded-full bg-blue-100 text-blue-700 font-bold text-xs uppercase tracking-wider">
                  Laboratorio LaTSIB · UTEM
                </span>
              </div>
              <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 mb-6 tracking-tight">
                ¿Qué Hacemos?
              </h1>
              
              <div className="bg-gradient-to-br from-blue-900 via-slate-900 to-teal-900 rounded-3xl p-8 sm:p-10 text-white shadow-xl mb-12 relative overflow-hidden">
                <div className="absolute -right-10 -bottom-10 w-72 h-72 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />
                <div className="absolute -left-10 -top-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
                <p className="text-lg sm:text-xl text-slate-100 leading-relaxed font-normal mb-6 relative z-10">
                  En el <span className="font-bold text-teal-300">Laboratorio de Biomédica Traslacional (LaTSIB)</span> de la Universidad Tecnológica Metropolitana (UTEM), unimos la ingeniería, la ciencia de datos y la medicina para transformar datos biológicos complejos en soluciones de salud reales y no invasivas. Desarrollamos investigación aplicada en el área de la ingeniería biomédica, utilizando señales, imágenes y datos para comprender fenómenos biológicos y aportar al desarrollo de nuevas herramientas para la salud.
                </p>
                <p className="text-base sm:text-lg text-slate-200 leading-relaxed font-normal relative z-10">
                  Trabajamos en el procesamiento y análisis de señales e imágenes biomédicas, el estudio de la respuesta neurovascular mediante tecnologías como fNIRS, la modelación y simulación de fenómenos fisiológicos, y el desarrollo de soluciones inteligentes que integran tecnologías como inteligencia artificial y aprendizaje automático. Nuestra investigación busca conectar la ingeniería con las necesidades reales de las personas, generando conocimiento, herramientas y soluciones con potencial de aplicación clínica y tecnológica.
                </p>
              </div>

              {/* Enlace destacado hacia Sobre Nosotros */}
              <div className="mb-14 p-6 sm:p-8 bg-white rounded-3xl border border-slate-200 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6 hover:shadow-md transition-shadow">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-blue-50 text-blue-600 rounded-2xl shrink-0">
                    <Sparkles size={24} />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 mb-1">
                      Conoce más sobre Nuestra Identidad Institucional
                    </h3>
                    <p className="text-slate-600 text-sm">
                      Descubre nuestra misión, visión, los 4 ejes estratégicos y el modelo formativo de capital humano desde el pregrado en LaTSIB.
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => navigateTo('about-us')}
                  className="shrink-0 inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold text-sm shadow-sm transition-all cursor-pointer"
                >
                  <span>Sobre Nosotros</span>
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>

            {/* Líneas de Investigación Institucionales */}
            <div className="mb-16">
              <div className="flex items-center gap-3 mb-4 pb-3 border-b border-slate-200">
                <div className="p-2 rounded-xl bg-teal-100 text-teal-700">
                  <Cpu size={22} />
                </div>
                <div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
                    Líneas de Investigación Institucionales
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-500 font-medium">
                    Cuatro líneas desarrolladas por el Dr. Raúl Caulier Cisterna que articulan el trabajo científico en LaTSIB
                  </p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-8 mb-10">
                {(lineasInvestigacion || []).map((linea) => (
                  <div
                    key={linea.id}
                    className="bg-white rounded-3xl p-8 border border-slate-200/90 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-3 mb-4">
                        <span className="px-3 py-1 rounded-full text-xs font-bold bg-teal-50 text-teal-700 border border-teal-100">
                          {linea.badge}
                        </span>
                        <span className="text-2xl font-black text-slate-300">
                          {linea.numero}
                        </span>
                      </div>
                      <div className="flex items-start gap-3.5 mb-4">
                        <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100 shrink-0">
                          {linea.id === 1 ? <Brain className="w-6 h-6 text-purple-600" /> :
                           linea.id === 2 ? <Activity className="w-6 h-6 text-teal-600" /> :
                           linea.id === 3 ? <HeartPulse className="w-6 h-6 text-rose-600" /> :
                                            <Cpu className="w-6 h-6 text-blue-600" />}
                        </div>
                        <h3 className="text-lg font-bold text-slate-900 leading-snug">
                          {linea.nombreCompleto || linea.titulo}
                        </h3>
                      </div>
                      <p className="text-slate-600 text-sm leading-relaxed mb-4">
                        {linea.descripcion}
                      </p>
                      {linea.enfoque && (
                        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 text-xs text-slate-600 leading-relaxed">
                          <strong className="text-slate-800 block mb-1">Alcance y Enfoque Metodológico:</strong>
                          {linea.enfoque}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Articulación de las líneas */}
              <div className="p-7 sm:p-9 bg-gradient-to-r from-blue-900 via-slate-900 to-teal-900 text-white rounded-3xl shadow-md">
                <span className="text-xs uppercase font-bold tracking-widest text-teal-300 block mb-2">
                  Articulación Científica
                </span>
                <h4 className="text-xl font-bold mb-3">
                  Complementariedad y Sinergia Metodológica
                </h4>
                <p className="text-slate-200 text-sm sm:text-base leading-relaxed">
                  {institutionalInfo?.articulacionLineas}
                </p>
              </div>
            </div>

            {/* Proyectos de Investigación */}
            <div className="mb-12">
              <div className="flex items-center gap-3 mb-8 pb-3 border-b border-slate-200">
                <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
                  Proyectos de Investigación Desarrollados en el Laboratorio
                </h2>
                <span className="px-2.5 py-0.5 text-xs font-bold rounded-full bg-blue-100 text-blue-700">
                  {proyectos.length} proyectos
                </span>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {proyectos.map((item, idx) => (
                  <div
                    key={item.id || idx}
                    onClick={() => handleViewResearch(item)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handleViewResearch(item); } }}
                    className={`group flex flex-col h-full cursor-pointer bg-white p-6 sm:p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 hover:-translate-y-1.5 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gradient-to-br ${item.color || 'from-slate-50 to-white'} relative`}
                  >
                    {item.badge && (
                      <div className="absolute top-4 right-4 bg-teal-600/90 backdrop-blur-xs text-white text-[11px] font-bold px-3 py-1 rounded-full border border-teal-400 z-10 shadow-sm">
                        {item.badge}
                      </div>
                    )}
                    <div className="mb-6 p-4 bg-white/80 backdrop-blur-sm rounded-2xl w-fit group-hover:bg-white group-hover:scale-105 transition-all border border-white/60 shadow-sm">
                      <Atom className="w-8 h-8 text-[#1f7a8c]" />
                    </div>
                    {item.linea && (
                      <span className="text-[11px] font-bold text-blue-600 uppercase tracking-wider mb-2 block">
                        {item.linea}
                      </span>
                    )}
                    <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-blue-700 transition-colors leading-snug">{item.titulo}</h3>
                    <p className="text-slate-600 leading-relaxed flex-grow line-clamp-3 mb-6 text-sm">{item.desc}</p>
                    <div className="mt-auto pt-4 border-t border-slate-200/60 flex items-center justify-between text-blue-700 font-bold text-sm">
                      <span>Ver proyecto completo</span>
                      <ChevronRight size={16} className="transform group-hover:translate-x-1.5 transition-transform" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      ) : route.view === 'research-detail' ? (
        /* VISTA: DETALLE DE INVESTIGACIÓN */
        currentResearch ? (
          <ResearchDetailView
            research={currentResearch}
            onBack={() => handleBack('what-we-do')}
          />
        ) : (
          <div className="pt-36 pb-20 text-center container mx-auto px-6">
            <h2 className="text-2xl font-bold text-slate-800 mb-4">Investigación no encontrada</h2>
            <button
              type="button"
              onClick={() => navigateTo('what-we-do')}
              className="px-6 py-2.5 bg-blue-600 text-white rounded-full font-semibold cursor-pointer"
            >
              Volver a ¿Qué Hacemos?
            </button>
          </div>
        )
      ) : route.view === 'activity-detail' ? (
        /* VISTA: DETALLE DE ACTIVIDAD */
        currentActivity ? (
          <ActivityDetailView
            activity={currentActivity}
            onBack={() => handleBack('activities-list')}
          />
        ) : (
          <div className="pt-36 pb-20 text-center container mx-auto px-6">
            <h2 className="text-2xl font-bold text-slate-800 mb-4">Actividad no encontrada</h2>
            <button
              type="button"
              onClick={() => navigateTo('activities-list')}
              className="px-6 py-2.5 bg-blue-600 text-white rounded-full font-semibold cursor-pointer"
            >
              Volver a actividades
            </button>
          </div>
        )
      ) : route.view === 'activities-list' ? (
        /* VISTA: LISTADO COMPLETO DE ACTIVIDADES */
        <div className="pt-32 pb-20 min-h-screen bg-slate-50 animate-in fade-in duration-300">
          <div className="container mx-auto px-6">
            <div className="mb-12">
              <button
                type="button"
                onClick={() => navigateTo('landing')}
                className="inline-flex items-center gap-2 text-slate-600 hover:text-blue-600 mb-6 font-semibold transition-colors bg-white px-5 py-2.5 rounded-full shadow-sm border border-slate-200 cursor-pointer hover:shadow"
              >
                <ArrowLeft size={18} /> Volver al inicio
              </button>
              <h1 className="text-4xl font-extrabold text-slate-900 mb-4">Bitácora de Actividades y Congresos</h1>
              <p className="text-slate-600 max-w-3xl text-lg">Registro completo de participaciones, pasantías y difusión científica de LaTSIB.</p>
            </div>

            <div className="space-y-16">
              {actividadesNacionales.length > 0 && (
                <div>
                  <div className="flex items-center gap-3 mb-8 pb-3 border-b border-slate-200">
                    <div className="p-2 rounded-xl bg-blue-100 text-blue-700">
                      <MapPin size={20} />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Actividades Nacionales</h2>
                      <p className="text-xs text-slate-500 font-medium">Congresos, simposios y jornadas científicas en Chile</p>
                    </div>
                    <span className="ml-auto px-3 py-1 bg-blue-100 text-blue-700 text-xs font-bold rounded-full">
                      {actividadesNacionales.length} {actividadesNacionales.length === 1 ? 'actividad' : 'actividades'}
                    </span>
                  </div>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {actividadesNacionales.map((act) => (
                      <ActivityCard key={act.id} item={act} onClick={handleViewActivity} />
                    ))}
                  </div>
                </div>
              )}

              {actividadesInternacionales.length > 0 && (
                <div>
                  <div className="flex items-center gap-3 mb-8 pb-3 border-b border-slate-200">
                    <div className="p-2 rounded-xl bg-teal-100 text-teal-700">
                      <Globe size={20} />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Actividades Internacionales</h2>
                      <p className="text-xs text-slate-500 font-medium">Pasantías, defensas doctorales y congresos internacionales</p>
                    </div>
                    <span className="ml-auto px-3 py-1 bg-teal-100 text-teal-700 text-xs font-bold rounded-full">
                      {actividadesInternacionales.length} {actividadesInternacionales.length === 1 ? 'actividad' : 'actividades'}
                    </span>
                  </div>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {actividadesInternacionales.map((act) => (
                      <ActivityCard key={act.id} item={act} onClick={handleViewActivity} />
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      ) : route.view === 'publications-list' ? (
        /* VISTA: LISTADO COMPLETO DE PUBLICACIONES */
        <div className="pt-32 pb-20 min-h-screen bg-slate-50 animate-in fade-in duration-300">
          <div className="container mx-auto px-6">
            <div className="mb-10">
              <button
                type="button"
                onClick={() => navigateTo('landing')}
                className="inline-flex items-center gap-2 text-slate-600 hover:text-blue-600 mb-6 font-semibold transition-colors bg-white px-5 py-2.5 rounded-full shadow-sm border border-slate-200 cursor-pointer hover:shadow"
              >
                <ArrowLeft size={18} /> Volver al inicio
              </button>
              <h1 className="text-4xl font-extrabold text-slate-900 mb-4">Repositorio de Publicaciones</h1>
              <p className="text-slate-600 max-w-3xl text-lg">Lista completa de artículos científicos y contribuciones académicas.</p>
            </div>
            <div className="grid gap-4 max-w-4xl mx-auto">
              {publicaciones.map((pub, idx) => (
                <div
                  key={pub.id || idx}
                  className="group flex flex-col md:flex-row items-start md:items-center justify-between p-6 bg-white hover:bg-slate-50/90 border border-slate-100 hover:border-blue-200 rounded-2xl transition-all hover:shadow-md"
                >
                  <div className="pr-4 flex-grow mb-4 md:mb-0">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="px-2.5 py-0.5 bg-blue-100 text-blue-700 text-xs font-bold rounded-full">{pub.year}</span>
                      <span className="text-slate-500 text-xs font-semibold uppercase tracking-wider">{pub.revista}</span>
                    </div>
                    <h4 className="font-bold text-slate-900 text-lg mb-1 group-hover:text-blue-700 transition-colors leading-snug">
                      <a href={pub.link} target="_blank" rel="noopener noreferrer" className="hover:underline">
                        {pub.titulo}
                      </a>
                    </h4>
                    <p className="text-slate-500 text-sm leading-relaxed">{pub.autor ? pub.autor : pub.autores}</p>
                  </div>
                  <div className="flex items-center gap-2.5 shrink-0 self-end md:self-center">
                    {pub.instagram && (
                      <a
                        href={pub.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3.5 py-2 text-pink-600 hover:text-white bg-pink-50 hover:bg-gradient-to-r hover:from-pink-500 hover:to-rose-500 border border-pink-200 hover:border-transparent rounded-xl text-xs font-bold transition-all shadow-2xs hover:shadow"
                        title="Ver infografía explicativa en Instagram"
                        aria-label="Ver infografía en Instagram"
                      >
                        <Instagram size={16} />
                        <span>Infografía</span>
                      </a>
                    )}
                    {pub.link && (
                      <a
                        href={pub.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3.5 py-2 text-slate-600 hover:text-blue-600 bg-slate-50 hover:bg-blue-50 border border-slate-200 hover:border-blue-300 rounded-xl text-xs font-bold transition-all shadow-2xs hover:shadow"
                        title="Ver artículo científico original"
                        aria-label="Ver artículo científico original"
                      >
                        <ExternalLink size={16} />
                        <span className="hidden sm:inline">Artículo</span>
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : route.view === 'team-list' ? (
        /* VISTA: DIRECTORIO COMPLETO DEL EQUIPO */
        <div className="pt-32 pb-20 min-h-screen bg-slate-50 animate-in fade-in duration-300">
          <div className="container mx-auto px-6">
            <div className="mb-12">
              <button
                type="button"
                onClick={() => navigateTo('landing')}
                className="inline-flex items-center gap-2 text-slate-600 hover:text-blue-600 mb-6 font-semibold transition-colors bg-white px-5 py-2.5 rounded-full shadow-sm border border-slate-200 cursor-pointer hover:shadow"
              >
                <ArrowLeft size={18} /> Volver al inicio
              </button>
              <h1 className="text-4xl font-extrabold text-slate-900 mb-4">Directorio del Equipo</h1>
              <p className="text-slate-600 max-w-3xl text-lg">Investigadores, asistentes, tesistas y colaboradores del Laboratorio de Biomédica Traslacional.</p>
            </div>

            <div className="space-y-16">
              {categoriasEquipo.map((cat) => {
                const miembrosCat = equipoVisible.filter((m) => m.categoria === cat.id);
                if (miembrosCat.length === 0) return null;

                return (
                  <div key={cat.id}>
                    <div className="flex items-center gap-3 mb-8 pb-3 border-b border-slate-200">
                      <h2 className="text-2xl font-bold text-slate-900 tracking-tight">{cat.titulo}</h2>
                      <span className={`px-2.5 py-0.5 text-xs font-bold rounded-full ${cat.id === 'tesistas' ? 'bg-teal-100 text-teal-700' : 'bg-blue-100 text-blue-700'}`}>
                        {miembrosCat.length}
                      </span>
                    </div>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                      {miembrosCat.map((miembro, idx) => (
                        <TeamMemberCard
                          key={miembro.id || idx}
                          miembro={miembro}
                          onSelect={setSelectedMember}
                        />
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      ) : route.view === 'legal' ? (
        <LegalPageView
          initialTab={route.id || 'privacidad'}
          onBack={() => navigateTo('landing')}
        />
      ) : (
        /* VISTA: PORTADA (LANDING) */
        <>
          <header className="relative pt-32 pb-20 lg:min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-[#08182b] via-[#0d2a45] to-[#0a3853]" id="about">
            {/* Luces y brillos ambientales de fondo */}
            <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
              <div className="absolute top-[-15%] right-[-5%] w-[620px] h-[620px] bg-cyan-500/20 rounded-full blur-[130px]" />
              <div className="absolute bottom-[-10%] left-[-10%] w-[550px] h-[550px] bg-blue-600/25 rounded-full blur-[120px]" />
              <div className="absolute top-[40%] left-[30%] w-[350px] h-[350px] bg-teal-400/15 rounded-full blur-[100px]" />
            </div>

            {/* Patrón Biomédico Ilustrado con 60% de opacidad */}
            <div
              className="absolute inset-0 z-0 opacity-60 pointer-events-none bg-repeat bg-center"
              style={{
                backgroundImage: `url(${heroPatternTransparent || heroPattern || '/hero-pattern.png'})`,
                backgroundSize: '460px auto'
              }}
            />

            {/* Máscara suave para garantizar máxima legibilidad y armonía visual */}
            <div className="absolute inset-0 z-0 bg-gradient-to-r from-[#08182b]/80 via-[#08182b]/50 to-transparent pointer-events-none" />

            <div className="container mx-auto px-6 relative z-10 grid lg:grid-cols-2 gap-12 items-center">
              <div className="text-center lg:text-left">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-950/60 border border-cyan-500/40 text-cyan-200 text-xs font-semibold mb-6 shadow-sm backdrop-blur-md">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-400"></span>
                  </span>
                  Investigación Activa {config.year}
                </div>
                <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-6 tracking-tight drop-shadow-sm">
                  Donde la ciencia <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-300 via-cyan-200 to-sky-300">
                    se encuentra con la tecnología
                  </span>
                </h1>
                <p className="text-base sm:text-lg text-slate-200/90 mb-8 max-w-lg mx-auto lg:mx-0 leading-relaxed font-normal drop-shadow-sm">
                  {config.mision}
                </p>
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start w-full sm:w-auto">
                  <button
                    type="button"
                    onClick={() => scrollToSection('research')}
                    className="w-full sm:w-auto px-7 py-3.5 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white rounded-xl font-bold transition-all flex items-center justify-center gap-2 group shadow-lg shadow-cyan-950/50 border border-cyan-400/30 cursor-pointer text-sm sm:text-base hover:scale-[1.02] active:scale-[0.98]"
                  >
                    Nuestras Líneas <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
                  </button>
                  <button
                    type="button"
                    onClick={() => scrollToSection('publications')}
                    className="w-full sm:w-auto px-7 py-3.5 bg-slate-900/60 hover:bg-slate-800/80 text-white border border-slate-600/60 backdrop-blur-md rounded-xl font-bold transition-all shadow-sm cursor-pointer text-sm sm:text-base hover:border-slate-400/70"
                  >
                    Ver Publicaciones
                  </button>
                </div>
              </div>
              <div className="relative mt-8 lg:mt-0 max-w-xl mx-auto lg:max-w-none w-full">
                <HeroSlider 
                  brainImg={config?.imagenes?.hero} 
                  teamImg={heroTeamImg || '/hero-team.jpg'} 
                  teamImg2={heroTeamImg2 || '/hero-team-2.jpg'} 
                  teamImg3={heroTeamImg3 || '/hero-team-3.jpg'} 
                />
              </div>
            </div>
          </header>

          <section id="research" className="py-24 bg-white">
            <div className="container mx-auto px-6">
              <SectionTitle subtitle="Áreas de investigación que integran inteligencia artificial, procesamiento avanzado de señales y tecnologías biomédicas traslacionales.">
                Líneas de Investigación
              </SectionTitle>

              {/* Bento Grid: 1 tarjeta grande + 3 complementarias */}
              {(() => {
                const lineas = lineasInvestigacion || [];
                const featured = lineas[0];
                const rest = lineas.slice(1);
                const iconMap = {
                  1: <Brain className="w-6 h-6 text-blue-600" />,
                  2: <Activity className="w-6 h-6 text-teal-600" />,
                  3: <HeartPulse className="w-6 h-6 text-rose-600" />,
                  4: <Cpu className="w-6 h-6 text-blue-600" />
                };
                const iconBgMap = {
                  1: 'bg-blue-50 border-blue-100',
                  2: 'bg-teal-50 border-teal-100',
                  3: 'bg-rose-50 border-rose-100',
                  4: 'bg-blue-50 border-blue-100'
                };
                const decorGradients = {
                  1: 'from-blue-500/8 via-cyan-500/5 to-transparent',
                  2: 'from-teal-500/8 via-emerald-500/5 to-transparent',
                  3: 'from-rose-500/8 via-pink-500/5 to-transparent',
                  4: 'from-blue-500/8 via-indigo-500/5 to-transparent'
                };

                return (
                  <div className="grid grid-cols-1 lg:grid-cols-3 lg:grid-rows-2 gap-6 mb-12">
                    {/* Tarjeta Principal (Featured) - Ocupa 1 col x 2 rows */}
                    {featured && (
                      <div className="lg:row-span-2 group relative bg-white rounded-3xl border border-slate-200/80 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col">
                        {/* Decorative gradient overlay */}
                        <div className={`absolute inset-0 bg-gradient-to-br ${decorGradients[featured.id]} pointer-events-none`} />
                        {/* Decorative pattern */}
                        <div className="absolute top-0 right-0 w-64 h-64 opacity-[0.03] pointer-events-none">
                          <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="100" cy="100" r="80" stroke="currentColor" strokeWidth="1" className="text-blue-900"/>
                            <circle cx="100" cy="100" r="60" stroke="currentColor" strokeWidth="1" className="text-blue-900"/>
                            <circle cx="100" cy="100" r="40" stroke="currentColor" strokeWidth="1" className="text-blue-900"/>
                            <line x1="20" y1="100" x2="180" y2="100" stroke="currentColor" strokeWidth="0.5" className="text-blue-900"/>
                            <line x1="100" y1="20" x2="100" y2="180" stroke="currentColor" strokeWidth="0.5" className="text-blue-900"/>
                          </svg>
                        </div>
                        <div className="relative z-10 p-8 sm:p-10 flex flex-col h-full">
                          <div className={`w-12 h-12 rounded-2xl ${iconBgMap[featured.id]} border flex items-center justify-center mb-6 shadow-sm`}>
                            {iconMap[featured.id]}
                          </div>
                          <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-4 leading-tight tracking-tight group-hover:text-blue-700 transition-colors">
                            {featured.titulo}
                          </h3>
                          <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-6 flex-grow">
                            {featured.descripcion}
                          </p>
                          <button
                            type="button"
                            onClick={() => navigateTo('what-we-do')}
                            className="inline-flex items-center gap-1.5 text-blue-600 hover:text-blue-800 font-bold text-sm cursor-pointer mt-auto group/btn"
                          >
                            Ver proyectos <ChevronRight size={15} className="transform group-hover/btn:translate-x-1 transition-transform" />
                          </button>
                        </div>
                      </div>
                    )}

                    {/* Tarjetas complementarias - 2 cols a la derecha */}
                    {rest.map((linea, idx) => (
                      <div
                        key={linea.id}
                        className={`group relative bg-white rounded-3xl border border-slate-200/80 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden flex flex-col ${idx === 0 ? 'lg:col-span-2' : ''}`}
                      >
                        <div className={`absolute inset-0 bg-gradient-to-br ${decorGradients[linea.id]} pointer-events-none`} />
                        <div className="relative z-10 p-7 sm:p-8 flex flex-col h-full">
                          <div className="flex items-start gap-4 mb-4">
                            <div className={`w-11 h-11 rounded-xl ${iconBgMap[linea.id]} border flex items-center justify-center shrink-0 shadow-sm`}>
                              {iconMap[linea.id]}
                            </div>
                            <div>
                              <h3 className="text-lg font-bold text-slate-900 leading-snug group-hover:text-blue-700 transition-colors">
                                {linea.titulo}
                              </h3>
                            </div>
                          </div>
                          <p className="text-slate-600 text-sm leading-relaxed mb-5 flex-grow">
                            {linea.descripcion}
                          </p>
                          <button
                            type="button"
                            onClick={() => navigateTo('what-we-do')}
                            className="inline-flex items-center gap-1.5 text-blue-600 hover:text-blue-800 font-bold text-sm cursor-pointer mt-auto group/btn"
                          >
                            Ver proyectos <ChevronRight size={15} className="transform group-hover/btn:translate-x-1 transition-transform" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                );
              })()}

              {/* Botón Ver todos los proyectos */}
              <div className="text-center">
                <button
                  type="button"
                  onClick={() => navigateTo('what-we-do')}
                  className="inline-flex items-center gap-2 px-8 py-3.5 bg-white text-blue-600 border border-blue-200 rounded-full font-bold shadow-sm hover:shadow-md hover:bg-blue-50 transition-all group cursor-pointer"
                >
                  Ver todos los proyectos <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          </section>

          <section id="activities" className="py-24 bg-slate-50 border-y border-slate-200">
            <div className="container mx-auto px-6">
              <SectionTitle subtitle="Registro completo de actividades académicas, presentaciones y participación institucional del Laboratorio.">
                Actividades y Congresos
              </SectionTitle>

              <div className="space-y-16 mb-12">
                {actividadesNacionales.length > 0 && (
                  <div>
                    <div className="flex items-center gap-3 mb-8 pb-3 border-b border-slate-200">
                      <div className="p-2 rounded-xl bg-blue-100 text-blue-700">
                        <MapPin size={20} />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-slate-900 tracking-tight">Actividades Nacionales</h3>
                        <p className="text-xs text-slate-500 font-medium">Congresos, simposios y jornadas científicas en Chile</p>
                      </div>
                      <span className="ml-auto px-3 py-1 bg-blue-100 text-blue-700 text-xs font-bold rounded-full">
                        {actividadesNacionales.length} {actividadesNacionales.length === 1 ? 'actividad' : 'actividades'}
                      </span>
                    </div>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                      {actividadesNacionales.slice(0, 3).map((act) => (
                        <ActivityCard key={act.id} item={act} onClick={handleViewActivity} />
                      ))}
                    </div>
                  </div>
                )}

                {actividadesInternacionales.length > 0 && (
                  <div>
                    <div className="flex items-center gap-3 mb-8 pb-3 border-b border-slate-200">
                      <div className="p-2 rounded-xl bg-teal-100 text-teal-700">
                        <Globe size={20} />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-slate-900 tracking-tight">Actividades Internacionales</h3>
                        <p className="text-xs text-slate-500 font-medium">Pasantías, defensas doctorales y congresos internacionales</p>
                      </div>
                      <span className="ml-auto px-3 py-1 bg-teal-100 text-teal-700 text-xs font-bold rounded-full">
                        {actividadesInternacionales.length} {actividadesInternacionales.length === 1 ? 'actividad' : 'actividades'}
                      </span>
                    </div>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                      {actividadesInternacionales.slice(0, 3).map((act) => (
                        <ActivityCard key={act.id} item={act} onClick={handleViewActivity} />
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="text-center">
                <button
                  type="button"
                  onClick={() => scrollToSection('all-activities')}
                  className="inline-flex items-center gap-2 px-8 py-3.5 bg-white text-blue-600 border border-blue-200 rounded-full font-bold shadow-sm hover:shadow-md hover:bg-blue-50 transition-all group cursor-pointer"
                >
                  <LayoutGrid size={20} className="group-hover:scale-110 transition-transform" /> Ver bitácora completa de actividades
                </button>
              </div>
            </div>
          </section>

          <section id="team" className="py-24 bg-white">
            <div className="container mx-auto px-6">
              <SectionTitle subtitle="Investigadores, estudiantes y profesionales trabajando juntos para construir ciencia con propósito.">
                Integrantes del Laboratorio
              </SectionTitle>
              <div className="space-y-16 mb-12">
                {categoriasEquipo.map((cat) => {
                  const miembrosCat = equipoVisible.filter((m) => m.categoria === cat.id);
                  if (miembrosCat.length === 0) return null;
                  
                  const miembrosMostrar = cat.id === 'asistentes' ? miembrosCat.slice(0, 4) : miembrosCat;

                  return (
                    <div key={cat.id}>
                      <div className="flex items-center gap-3 mb-8 pb-3 border-b border-slate-200">
                        <h3 className="text-2xl font-bold text-slate-900 tracking-tight">{cat.titulo}</h3>
                        <span className={`px-2.5 py-0.5 text-xs font-bold rounded-full ${cat.id === 'tesistas' ? 'bg-teal-100 text-teal-700' : 'bg-blue-100 text-blue-700'}`}>
                          {miembrosCat.length}
                        </span>
                      </div>
                      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {miembrosMostrar.map((miembro, idx) => (
                          <TeamMemberCard
                            key={miembro.id || idx}
                            miembro={miembro}
                            onSelect={setSelectedMember}
                          />
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="text-center">
                <button
                  type="button"
                  onClick={() => scrollToSection('all-team')}
                  className="inline-flex items-center gap-2 px-8 py-3.5 bg-white text-blue-600 border border-blue-200 rounded-full font-bold shadow-sm hover:shadow-md hover:bg-blue-50 transition-all group cursor-pointer"
                >
                  <Users size={20} className="group-hover:scale-110 transition-transform" /> Ver directorio completo del equipo
                </button>
              </div>
            </div>
          </section>

          <section id="publications" className="py-24 bg-slate-50 relative overflow-hidden border-t border-slate-200">
            <div className="container mx-auto px-6">
              <SectionTitle>Publicaciones Recientes</SectionTitle>
              <div className="grid gap-4 max-w-4xl mx-auto">
                {publicaciones.slice(0, 3).map((pub, idx) => (
                  <div
                    key={pub.id || idx}
                    className="group flex flex-col md:flex-row items-start md:items-center justify-between p-6 bg-white hover:bg-slate-50/90 border border-slate-100 hover:border-blue-200 rounded-2xl transition-all hover:shadow-md"
                  >
                    <div className="pr-4 flex-grow mb-4 md:mb-0">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="px-2.5 py-0.5 bg-blue-100 text-blue-700 text-xs font-bold rounded-full">{pub.year}</span>
                        <span className="text-slate-500 text-xs font-semibold uppercase tracking-wider">{pub.revista}</span>
                      </div>
                      <h4 className="font-bold text-slate-900 text-lg mb-1 group-hover:text-blue-700 transition-colors leading-snug">
                        <a href={pub.link} target="_blank" rel="noopener noreferrer" className="hover:underline">
                          {pub.titulo}
                        </a>
                      </h4>
                      <p className="text-slate-500 text-sm leading-relaxed">{pub.autor ? pub.autor : pub.autores}</p>
                    </div>
                    <div className="flex items-center gap-2.5 shrink-0 self-end md:self-center">
                      {pub.instagram && (
                        <a
                          href={pub.instagram}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-3.5 py-2 text-pink-600 hover:text-white bg-pink-50 hover:bg-gradient-to-r hover:from-pink-500 hover:to-rose-500 border border-pink-200 hover:border-transparent rounded-xl text-xs font-bold transition-all shadow-2xs hover:shadow"
                          title="Ver infografía explicativa en Instagram"
                          aria-label="Ver infografía en Instagram"
                        >
                          <Instagram size={16} />
                          <span>Infografía</span>
                        </a>
                      )}
                      {pub.link && (
                        <a
                          href={pub.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-3.5 py-2 text-slate-600 hover:text-blue-600 bg-slate-50 hover:bg-blue-50 border border-slate-200 hover:border-blue-300 rounded-xl text-xs font-bold transition-all shadow-2xs hover:shadow"
                          title="Ver artículo científico original"
                          aria-label="Ver artículo científico original"
                        >
                          <ExternalLink size={16} />
                          <span className="hidden sm:inline">Artículo</span>
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              <div className="text-center mt-10">
                <button
                  type="button"
                  onClick={() => scrollToSection('all-publications')}
                  className="inline-flex items-center gap-2 text-blue-600 font-bold hover:underline cursor-pointer"
                >
                  Ver todas las publicaciones <ChevronRight size={16} />
                </button>
              </div>
            </div>
          </section>

          {/* FOOTER CON INFORMACIÓN INSTITUCIONAL Y MARCO LEGAL */}
          <footer id="contact" className="bg-slate-900 text-slate-300 py-16">
            <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
              {/* COLUMNA 1: GRUPO LATSIB */}
              <div>
                <div className="flex items-center gap-2 text-white font-bold text-2xl mb-4">
                  <img src={config.imagenes.logo} alt="Logo" className="h-8 w-8 object-cover rounded-full" />
                  {config.nombreGrupo}
                </div>
                <p className="text-slate-400 text-sm leading-relaxed mb-6">
                  Ciencia, datos y tecnología al servicio de la salud. Desarrollamos investigación biomédica con impacto real en la práctica clínica.
                </p>
                <div className="flex flex-wrap gap-3">
                  <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-blue-600 transition-colors text-white" aria-label="GitHub">
                    <Github size={20} />
                  </a>
                  <a href="https://www.linkedin.com/in/latsib-utem-b87337396/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-blue-600 transition-colors text-white" aria-label="LinkedIn">
                    <Linkedin size={20} />
                  </a>
                  <a href="https://www.instagram.com/latsib.utem/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-blue-600 transition-colors text-white" aria-label="Instagram">
                    <Instagram size={20} />
                  </a>
                  <a href="https://www.youtube.com/@LaTSIBUTEM" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-blue-600 transition-colors text-white" aria-label="YouTube">
                    <Youtube size={20} />
                  </a>
                  <a href="https://www.tiktok.com/@latsibutem" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-blue-600 transition-colors text-white" aria-label="TikTok">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.76a4.85 4.85 0 0 1-1.01-.07z"/>
                    </svg>
                  </a>
                </div>
              </div>

              {/* COLUMNA 2: CONTACTO */}
              <div>
                <h4 className="text-white font-bold text-lg mb-6">Contacto</h4>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <MapPin className="text-blue-500 mt-1 shrink-0" size={20} />
                    <span className="text-sm">{config.direccion}</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Mail className="text-blue-500 shrink-0" size={20} />
                    <a href={`mailto:${config.email}`} className="text-sm hover:text-white transition-colors">{config.email}</a>
                  </li>
                </ul>
                <div className="mt-6">
                  <button
                    type="button"
                    onClick={() => setIsContactModalOpen(true)}
                    className="inline-flex items-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-semibold transition-colors cursor-pointer shadow-sm"
                  >
                    <Mail size={14} /> Formulario de Contacto
                  </button>
                </div>
              </div>

              {/* COLUMNA 3: ENLACES DE INTERÉS */}
              <div>
                <h4 className="text-white font-bold text-lg mb-6">Enlaces de Interés</h4>
                <ul className="space-y-2.5 text-sm">
                  <li><a href="https://www.utem.cl" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition-colors">Universidad Tecnológica Metropolitana</a></li>
                  <li><a href="https://www.anid.cl" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition-colors">ANID Chile</a></li>
                  <li><a href="https://postgrado.utem.cl" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition-colors">Postulaciones a Magíster</a></li>
                  <li><a href="https://noticias.utem.cl/2026/07/21/seminarios-de-ingenieria-civil-biomedica-utem-impulsan-uso-de-ia/" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition-colors">Noticias de Biomedicina UTEM</a></li>
                </ul>
              </div>

              {/* COLUMNA 4: TÉRMINOS Y CONDICIONES (LEY N° 21.719 CHILE) */}
              <div>
                <h4 className="text-white font-bold text-lg mb-6">
                  Términos y Condiciones
                </h4>
                <ul className="space-y-2.5 text-sm">
                  <li>
                    <button
                      type="button"
                      onClick={() => navigateTo('legal', 'privacidad')}
                      className="text-slate-400 hover:text-teal-300 transition-colors text-left cursor-pointer flex items-center gap-2"
                    >
                      <span className="text-teal-500">•</span> Política de Privacidad
                    </button>
                  </li>
                  <li>
                    <button
                      type="button"
                      onClick={() => navigateTo('legal', 'terminos')}
                      className="text-slate-400 hover:text-teal-300 transition-colors text-left cursor-pointer flex items-center gap-2"
                    >
                      <span className="text-teal-500">•</span> Términos y Condiciones
                    </button>
                  </li>
                  <li>
                    <button
                      type="button"
                      onClick={() => navigateTo('legal', 'cookies')}
                      className="text-slate-400 hover:text-teal-300 transition-colors text-left cursor-pointer flex items-center gap-2"
                    >
                      <span className="text-teal-500">•</span> Política de Cookies
                    </button>
                  </li>
                  <li>
                    <button
                      type="button"
                      onClick={() => navigateTo('legal', 'registro')}
                      className="text-slate-400 hover:text-teal-300 transition-colors text-left cursor-pointer flex items-center gap-2"
                    >
                      <span className="text-teal-500">•</span> Derechos ARCOP y Registro
                    </button>
                  </li>
                </ul>
                <p className="text-[11px] text-slate-500 mt-5 leading-relaxed">
                  Cumplimiento de la Ley N° 21.719 sobre Protección de Datos Personales en Chile.
                </p>
              </div>
            </div>

            {/* BARRA INFERIOR DEL FOOTER */}
            <div className="container mx-auto px-6 mt-12 pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
              <div className="text-center sm:text-left">
                © {config.year} {config.nombreCompleto}. Todos los derechos reservados.
              </div>
              <div className="text-center sm:text-right text-slate-400">
                Universidad Tecnológica Metropolitana (UTEM) · Santiago, Chile
              </div>
            </div>
          </footer>
        </>
      )}

      {/* BANNER DE CONSENTIMIENTO DE COOKIES (LEY 21.719 CHILE) */}
      <CookieConsentBanner onOpenLegal={(tab) => navigateTo('legal', tab)} />

      {/* FORMULARIO MODAL DE CONTACTO */}
      <ContactModal
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
      />

      {/* MODAL DE PERFIL Y ACTIVIDADES DEL INTEGRANTE */}
      <MemberDetailModal
        member={selectedMember}
        onClose={() => setSelectedMember(null)}
      />
    </div>
  );
}

// --- APP ROOT CON DATA PROVIDER ---
export default function App() {
  return (
    <DataProvider>
      <AppContent />
    </DataProvider>
  );
}
