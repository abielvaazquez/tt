import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="py-8 border-t border-stone-200 bg-white">
      <div className="max-w-7xl mx-auto px-6 flex flex-wrap justify-center gap-6 text-xs text-stone-500 font-medium">
        {["TT © 2026", "Privacidad y legal", "Contacto", "Carreras", "Noticias", "Ubicaciones"].map((item) => (
          <button key={item} className="hover:text-stone-900 transition-colors uppercase tracking-widest">{item}</button>
        ))}
      </div>
    </footer>
  );
}
