import { motion } from "motion/react";
import { Globe, Battery, Shield, Zap, Cpu, MapPin } from "lucide-react";

const INNOVATION_HUB_IMAGE = "https://i.postimg.cc/wTpgtN7J/Disen-o-sin-ti-tulo-(4).png";

export default function Discover() {
  return (
    <div className="min-h-screen bg-white text-[#171a20] pt-24">
      {/* Hero Section */}
      <section className="px-12 py-20 flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl"
        >
          <span className="text-[10px] uppercase tracking-[0.4em] text-stone-400 font-bold mb-4 block">Explora el Futuro</span>
          <h1 className="text-5xl md:text-7xl font-semibold tracking-tighter mb-8 italic">Descubre el Ecosistema TT</h1>
          <p className="text-xl text-stone-500 font-light leading-relaxed">
            Más que un coche, una visión de movilidad sostenible integrada en tu estilo de vida urbano.
          </p>
        </motion.div>
      </section>

      {/* Grid Features */}
      <section className="px-12 py-20 bg-stone-50">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
          {[
            {
              icon: <Zap className="w-8 h-8 text-blue-500" />,
              title: "Carga Inteligente",
              description: "Red de carga ultra-rápida distribuida estratégicamente para que nunca dejes de moverte."
            },
            {
              icon: <Cpu className="w-8 h-8 text-purple-500" />,
              title: "IA Conectada",
              description: "Tu vehículo aprende de tus rutas y preferencias para optimizar cada kilómetro."
            },
            {
              icon: <Shield className="w-8 h-8 text-emerald-500" />,
              title: "Seguridad 360",
              description: "Sensores avanzados que previenen accidentes antes de que ocurran."
            }
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="bg-white p-8 rounded-3xl shadow-sm border border-stone-100 hover:shadow-md transition-shadow"
            >
              <div className="mb-6">{item.icon}</div>
              <h3 className="text-xl font-bold mb-4">{item.title}</h3>
              <p className="text-stone-500 text-sm leading-relaxed">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Visual Section */}
      <section className="px-12 py-32 overflow-hidden">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-20">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="flex-1"
          >
            <h2 className="text-4xl font-bold tracking-tight mb-8">Nacidos en el Barrio, <br/>Diseñados para el Mundo</h2>
            <p className="text-stone-500 text-lg leading-relaxed mb-8">
              Nuestra planta en Tlaxcala no es solo una fábrica; es un centro de innovación donde el talento mexicano redefine los estándares globales de ingeniería eléctrica.
            </p>
            <div className="flex items-center space-x-4 text-sm font-bold uppercase tracking-widest text-blue-600">
              <MapPin className="w-4 h-4" />
              <span>Tlaxcala, México</span>
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="flex-1 relative"
          >
            <img 
              src={INNOVATION_HUB_IMAGE} 
              alt="Innovation Hub"
              className="rounded-[3rem] shadow-2xl"
            />
            <div className="absolute -bottom-10 -right-10 bg-white p-8 rounded-3xl shadow-xl border border-stone-100 hidden md:block">
              <div className="text-3xl font-bold text-[#171a20]">100%</div>
              <div className="text-[10px] uppercase tracking-widest text-stone-400 font-bold">Energía Limpia</div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Sustainable Section */}
      <section className="bg-black py-40 px-12 text-center text-white overflow-hidden relative">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,#444,transparent_70%)]" />
        </div>
        <motion.div
           initial={{ opacity: 0, y: 30 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           className="relative z-10 max-w-4xl mx-auto"
        >
          <Globe className="w-16 h-16 mx-auto mb-10 text-emerald-400" />
          <h2 className="text-5xl md:text-7xl font-black tracking-tighter mb-10 italic">MISIÓN: IMPACTO CERO</h2>
          <p className="text-xl text-white/60 font-light leading-relaxed max-w-2xl mx-auto mb-16">
            Estamos comprometidos con la eliminación total de la huella de carbono en la cadena de suministro para 2030. Cada pieza de un TT es un paso hacia un futuro respirable.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-12">
            <div>
              <div className="text-4xl font-bold mb-2 text-emerald-400">98%</div>
              <div className="text-[10px] uppercase tracking-[0.3em] font-bold opacity-50">Reciclable</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2 text-blue-400">0.0</div>
              <div className="text-[10px] uppercase tracking-[0.3em] font-bold opacity-50">Emisiones</div>
            </div>
            <div className="col-span-2 md:col-span-1">
              <div className="text-4xl font-bold mb-2 text-purple-400">2030</div>
              <div className="text-[10px] uppercase tracking-[0.3em] font-bold opacity-50">Meta Neta</div>
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
