/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "motion/react";
import { Menu, X, ChevronRight, Globe, User, MessageCircle } from "lucide-react";

export default function App() {
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSpec, setActiveSpec] = useState(0);

  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const motorScale = useTransform(scrollYProgress, [0.3, 0.5, 0.7], [0.95, 1.05, 1]);
  const motorY = useTransform(scrollYProgress, [0.3, 0.7], [40, -40]);
  const textOpacity = useTransform(scrollYProgress, [0.35, 0.5, 0.65, 0.8], [0, 0.25, 0.25, 0]);
  const textScale = useTransform(scrollYProgress, [0.3, 0.8], [0.7, 1.8]);

  const specs = [
    {
      category: "Aerodinámica",
      title: "Resistencia Cero",
      description: "Cada curva del Modelo TT está diseñada para cortar el aire con un coeficiente de arrastre líder en la industria de 0.208 Cd.",
      stats: [
        { label: "Arrastre", value: "0.208 Cd" },
        { label: "Ventilación", value: "Activa" }
      ]
    },
    {
      category: "Propulsión",
      title: "Tri-Motor Plaid",
      description: "Tres motores eléctricos de alto rendimiento con rotores recubiertos de carbono para una potencia continua hasta la velocidad máxima.",
      stats: [
        { label: "Motores", value: "3" },
        { label: "Torque", value: "1,420 Nm" }
      ]
    },
    {
      category: "Arquitectura",
      title: "Plataforma de 800V",
      description: "Sistema de batería de última generación con refrigeración líquida dual, optimizado para cargar 300km en solo 15 minutos.",
      stats: [
        { label: "Carga", value: "350 kW" },
        { label: "Eficiencia", value: "98%" }
      ]
    },
    {
      category: "Control",
      title: "Frenado Regenerativo",
      description: "Capas de cerámica de carbono y un software de gestión térmica que permite paradas precisas y recuperación de energía extrema.",
      stats: [
        { label: "Material", value: "Cerámica" },
        { label: "Recuperación", value: "Hasta 250kW" }
      ]
    }
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = ["Vehículos", "Descubrir"];
  const sideLinks = ["Vehículos", "Modelo TT"];

  return (
    <div className="min-h-screen bg-white font-sans text-[#171a20] overflow-x-hidden">
      {/* Navbar */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-12 py-5 flex items-center justify-between ${
          scrolled ? "backdrop-blur-xl bg-white/40 border-b border-white/20 shadow-sm" : "bg-transparent border-b border-transparent"
        }`}
      >
        <div className="flex-1 flex items-center">
          <span className="text-2xl font-bold tracking-[0.2em] leading-none cursor-pointer">TT</span>
        </div>

        <div className="hidden lg:flex items-center space-x-2">
          {navLinks.map((link) => (
            <button
              key={link}
              className="text-sm font-semibold tracking-wide px-4 py-2 hover:bg-black/5 rounded transition-all"
            >
              {link}
            </button>
          ))}
        </div>

        <div className="flex-1 flex items-center justify-end space-x-2">
          <button
            onClick={() => setIsMenuOpen(true)}
            className="text-sm font-semibold px-4 py-2 bg-black/5 rounded-md hover:bg-black/10 transition-colors"
          >
            Menú
          </button>
        </div>
      </nav>

      {/* Side Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMenuOpen(false)}
              className="fixed inset-0 bg-black/30 backdrop-blur-sm z-[60]"
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 w-80 bg-white z-[70] p-8 shadow-2xl overflow-y-auto"
            >
              <div className="flex justify-end mb-8">
                <button
                  onClick={() => setIsMenuOpen(false)}
                  className="p-2 hover:bg-stone-100 rounded-full transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              <div className="flex flex-col space-y-4">
                {sideLinks.map((link) => (
                  <button
                    key={link}
                    className="text-left py-2 px-4 hover:bg-stone-100 rounded-md transition-colors text-sm font-medium"
                  >
                    {link}
                  </button>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col items-center pt-28 pb-12 text-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="z-10"
        >
          <h1 className="text-5xl md:text-6xl font-semibold tracking-tight mb-2">Modelo TT</h1>
          <p className="text-sm tracking-wide text-[#171a20]/70 cursor-pointer hover:text-[#171a20] transition-colors">
            Siente el futuro del rendimiento
          </p>
        </motion.div>

        <div className="flex-1 w-full flex items-center justify-center relative mt-4">
          <div className="absolute w-[800px] h-[300px] bg-gradient-to-b from-gray-100 to-transparent rounded-[100%] blur-3xl opacity-40 -z-10"></div>
          <motion.img
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            src="https://i.postimg.cc/DfGdCZ13/Disen-o-sin-ti-tulo-(10).png"
            alt="Modelo TT"
            className="w-full max-w-5xl md:max-w-6xl lg:max-w-7xl object-contain drop-shadow-2xl"
          />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="w-full max-w-4xl flex flex-col items-center space-y-10 mt-8"
        >
          {/* Stats Section - Theme Pattern */}
          <div className="flex gap-8 md:gap-20 items-end justify-center w-full">
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-semibold">1,000<span className="text-lg ml-1 font-normal">km</span></div>
              <div className="text-[10px] uppercase tracking-widest text-[#171a20]/50 mt-1">Autonomía</div>
            </div>
            <div className="text-center border-x border-gray-200 px-8 md:px-20">
              <div className="text-2xl md:text-3xl font-semibold">8.1<span className="text-lg ml-1 font-normal">s</span></div>
              <div className="text-[10px] uppercase tracking-widest text-[#171a20]/50 mt-1">0-100 km/h</div>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-semibold">259<span className="text-lg ml-1 font-normal">hp</span></div>
              <div className="text-[10px] uppercase tracking-widest text-[#171a20]/50 mt-1 whitespace-nowrap">Potencia</div>
            </div>
          </div>

          <div className="flex flex-col items-center justify-center gap-6 w-full">
            <button className="px-12 md:px-32 py-3 border-[3px] border-[#171a20] rounded text-sm font-bold uppercase tracking-widest hover:bg-[#171a20] hover:text-white transition-all bg-white shadow-lg active:scale-95 cursor-pointer">
              Contactar
            </button>
          </div>
        </motion.div>
        
        {/* Detail Decoration */}
        <div className="absolute bottom-4 right-6 text-[10px] text-gray-400 tracking-widest font-mono hidden md:block">TT_SPEC_2026_V2.0</div>
      </section>

      {/* Detail Section - Storage (Theme Inspired) */}
      <section className="bg-gray-50 border-t border-gray-100 py-32 px-12">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-16">
          <div className="w-full lg:w-1/3">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl font-semibold mb-6">Guárdalo todo</h2>
              <p className="text-stone-600 leading-relaxed text-sm mb-8 max-w-sm">
                Sube tu bicicleta, equipaje y más. Una puerta trasera levadiza manos libres proporciona almacenamiento flexible, mientras que los asientos de la segunda fila se pliegan totalmente para tener más espacio.
              </p>
              <button className="group flex items-center space-x-2 text-sm font-bold uppercase tracking-widest cursor-pointer">
                <span className="border-b-2 border-transparent group-hover:border-[#171a20] transition-all">Más información</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </motion.div>
          </div>
          
          <div className="flex-1 flex flex-col sm:flex-row gap-6">
            <div className="flex-1 bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm flex flex-col group">
              <div className="h-48 overflow-hidden">
                <img 
                  src="https://i.postimg.cc/h45grYy0/Disen-o-sin-ti-tulo-(6).png"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  alt="Cargo space"
                />
              </div>
              <div className="p-4 text-[11px] font-bold uppercase tracking-tighter text-[#171a20]/40">Espacio de Carga Trasera</div>
            </div>
            <div className="flex-1 bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm flex flex-col group">
              <div className="h-48 overflow-hidden">
                <img 
                  src="https://i.postimg.cc/8Pn57Hr1/Disen-o-sin-ti-tulo-(7).png"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  alt="Seating"
                />
              </div>
              <div className="p-4 text-[11px] font-bold uppercase tracking-tighter text-[#171a20]/40">Configuración de Asientos</div>
            </div>
            <div className="flex-1 bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm flex flex-col group">
              <div className="h-48 overflow-hidden">
                <img 
                  src="https://i.postimg.cc/KjT4Dy28/Disen-o-sin-ti-tulo-(2).png"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  alt="Hands-free liftgate"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="p-4 text-[11px] font-bold uppercase tracking-tighter text-[#171a20]/40">Puerta Manos Libres</div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Spec Explorer Section */}
      <section className="bg-[#f0f0f0] py-32 px-12 overflow-hidden border-t border-gray-200">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16">
          <div className="w-full lg:w-3/5 relative group">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative"
            >
              <img 
                src="https://i.postimg.cc/wTpgtN7J/Disen-o-sin-ti-tulo-(4).png"
                alt="Technical View"
                className="w-full h-auto drop-shadow-[0_20px_50px_rgba(0,0,0,0.15)] grayscale-[0.5]"
              />
              
              {/* Hotspots */}
              <Hotspot x={20} y={45} label="Plataforma" active={activeSpec === 0} onClick={() => setActiveSpec(0)} />
              <Hotspot x={75} y={55} label="Motor" active={activeSpec === 1} onClick={() => setActiveSpec(1)} />
              <Hotspot x={50} y={50} label="Bateria" active={activeSpec === 2} onClick={() => setActiveSpec(2)} />
              <Hotspot x={23} y={70} label="Freno" active={activeSpec === 3} onClick={() => setActiveSpec(3)} />
            </motion.div>
          </div>

          <div className="w-full lg:w-2/5 flex flex-col justify-center min-h-[400px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeSpec}
                initial={{ opacity: 0, x: 30, filter: "blur(10px)" }}
                animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, x: -30, filter: "blur(10px)" }}
                transition={{ 
                  duration: 0.35,
                  ease: [0.22, 1, 0.36, 1]
                }}
                className="bg-white/60 backdrop-blur-xl p-10 rounded-[2.5rem] border border-white shadow-[0_20px_50px_rgba(0,0,0,0.05)]"
              >
                <h2 className="text-xs font-mono uppercase tracking-[0.4em] text-gray-400 mb-4">{specs[activeSpec].category}</h2>
                <h3 className="text-3xl font-semibold mb-6 tracking-tight">{specs[activeSpec].title}</h3>
                <p className="text-gray-500 leading-relaxed mb-8 text-sm">{specs[activeSpec].description}</p>
                
                <div className="grid grid-cols-2 gap-8">
                  {specs[activeSpec].stats.map((stat, idx) => (
                    <div key={idx} className="group/stat">
                      <div className="text-2xl font-bold tracking-tight text-[#171a20] transition-transform group-hover/stat:translate-x-1 duration-300">{stat.value}</div>
                      <div className="text-[10px] uppercase tracking-widest text-gray-400 font-bold mt-1">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>

            <div className="flex justify-center gap-4 mt-8">
              {specs.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveSpec(idx)}
                  className={`w-12 h-1 rounded-full transition-all duration-300 ${activeSpec === idx ? "bg-[#171a20]" : "bg-gray-300 hover:bg-gray-400"}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Grid Features */}
      <section className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <FeatureCard 
                 title="Seguridad"
                 description="El Modelo TT está diseñado para brindar la máxima protección en todas las condiciones."
                 img="https://acnews.blob.core.windows.net/imgnews/extralarge/NAZ_ac718c7522644f5e9768c7758a18d5cf.jpg"
              />
              <FeatureCard 
                 title="Velocidad"
                 description="Aceleración que te dejará sin aliento, redefiniendo lo que un motor eléctrico puede hacer."
                 img="https://i.postimg.cc/vZpCxFmf/Disen-o-sin-ti-tulo-(5).png"
              />
              <FeatureCard 
                 title="Tecnología"
                 description="Software que se actualiza constantemente para ofrecer nuevas funciones y mejoras."
                 img="https://i.postimg.cc/KjT4Dy28/Disen-o-sin-ti-tulo-(2).png"
              />
           </div>
        </div>
      </section>

      {/* Electrico Section - Apple Style Scroll Animation */}
      <section ref={containerRef} className="relative h-[105vh] bg-black overflow-hidden border-t border-white/5">
        <div className="sticky top-0 h-screen flex items-center justify-center">
          {/* Motor Visualization */}
          <div className="relative z-10 w-full max-w-4xl px-6 flex flex-col items-center">
            <motion.div
              style={{ scale: motorScale, y: motorY }}
              className="relative w-full"
            >
              <img 
                src="https://i.postimg.cc/FH6XbC91/Captura-de-pantalla-2026-05-14-a-la(s)-12-23-27-a-m.png" 
                alt="Electric Motor Architecture"
                className="w-full h-auto drop-shadow-[0_0_150px_rgba(255,255,255,0.15)] rounded-[2rem]"
              />
              
              {/* Energy Glow Effect */}
              <div className="absolute inset-x-0 top-1/2 h-1 bg-blue-500/30 blur-2xl -z-10" />
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mt-16 text-center"
            >
              <p className="text-gray-500 text-xs font-mono tracking-[0.5em] uppercase mb-4">Ingeniería Avanzada</p>
              <h4 className="text-white text-3xl font-light tracking-tight">Potencia Pura. <span className="font-bold">Cero Emisiones.</span></h4>
            </motion.div>
          </div>

          {/* Animated Foreground Text - Passes to the front as you scroll */}
          <motion.div 
            style={{ opacity: textOpacity, scale: textScale }}
            className="absolute inset-0 flex items-center justify-center pointer-events-none z-20 overflow-visible"
          >
            <h2 className="text-[22vw] font-black leading-none text-white tracking-tighter uppercase whitespace-nowrap">
              Eléctrico
            </h2>
          </motion.div>
        </div>
      </section>

      {/* Seguridad Section */}
      <section className="bg-white py-32 px-6 border-t border-gray-100">
        <div className="max-w-7xl mx-auto flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="w-full max-w-5xl mb-16 overflow-hidden rounded-[2.5rem] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.15)] bg-slate-100"
          >
            <img 
              src="https://i.postimg.cc/59DK0TSJ/Disen-o-sin-ti-tulo-(11).png" 
              alt="Security Architecture"
              className="w-full h-auto object-cover grayscale-[0.2] hover:grayscale-0 transition-all duration-700"
              referrerPolicy="no-referrer"
            />
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-left w-full max-w-4xl"
          >
            <p className="text-[#171a20]/40 text-xs font-mono tracking-[0.5em] uppercase mb-4">Seguridad Avanzada</p>
            <h2 className="text-4xl md:text-5xl font-semibold tracking-tighter mb-8 italic">La seguridad viene de serie</h2>
            <div className="text-stone-500 leading-relaxed text-lg font-light space-y-6">
              <p>
                La seguridad en TT es primordial. Cada vehículo TT está diseñado con zonas de absorción de impactos, un compartimiento de pasajeros rígido para minimizar la intrusión y múltiples bolsas de aire para ayudar a proteger a los ocupantes.
              </p>
              <p>
                Las funciones de seguridad activa pueden reducir la gravedad del impacto o evitar los accidentes por completo. La alerta de colisión frontal, el frenado de emergencia activo y la prevención de salida de carril vienen de serie.
              </p>
              <p>
                Los sistemas de seguridad pasiva y activa están diseñados para hacer que los vehículos TT sean los más seguros del mundo, con una probabilidad muy baja de lesiones.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-stone-200">
        <div className="max-w-7xl mx-auto px-6 flex flex-wrap justify-center gap-6 text-xs text-stone-500 font-medium">
          {["TT © 2026", "Privacidad y legal", "Contacto", "Carreras", "Noticias", "Ubicaciones"].map((item) => (
            <button key={item} className="hover:text-stone-900 transition-colors uppercase tracking-widest">{item}</button>
          ))}
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({ title, description, img }: { title: string; description: string; img: string }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group cursor-pointer"
    >
      <div className="overflow-hidden rounded-2xl mb-6 aspect-video bg-stone-100">
        <img 
          src={img} 
          alt={title} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          referrerPolicy="no-referrer"
        />
      </div>
      <h4 className="text-xl font-semibold mb-3">{title}</h4>
      <p className="text-stone-500 text-sm leading-relaxed">{description}</p>
    </motion.div>
  );
}

function Hotspot({ x, y, label, active, onClick }: { x: number; y: number; label: string; active: boolean; onClick: () => void }) {
  return (
    <div 
      className="absolute group z-20 cursor-pointer" 
      style={{ left: `${x}%`, top: `${y}%` }}
      onClick={onClick}
    >
      <div className="flex items-center">
        <div className={`relative flex items-center justify-center w-8 h-8 rounded-full transition-all duration-300 ${active ? "bg-[#171a20]" : "bg-white/80 backdrop-blur-sm"} shadow-md`}>
          <div className={`w-2 h-2 rounded-full ${active ? "bg-white" : "bg-[#171a20]"} animate-pulse`} />
          <div className={`absolute inset-0 rounded-full border-2 border-[#171a20]/20 animate-ping opacity-75 ${active ? "block" : "hidden"}`} />
        </div>
        <div className={`ml-3 px-3 py-1 bg-[#171a20] text-white text-[10px] font-bold uppercase tracking-widest rounded transition-all duration-300 opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 ${active ? "opacity-100 translate-x-0" : ""}`}>
          {label}
        </div>
      </div>
    </div>
  );
}
