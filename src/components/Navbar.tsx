import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { X } from "lucide-react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menu on route change
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  const navLinks = [
    { name: "Vehículos", path: "/" },
    { name: "Descubrir", path: "/discover" }
  ];
  
  const sideLinks = [
    { name: "Vehículos", path: "/" },
    { name: "Descubrir", path: "/discover" },
    { name: "Modelo TT", path: "/" }
  ];

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-12 py-3 flex items-center justify-between ${
          scrolled ? "backdrop-blur-xl bg-white/40 border-b border-white/20 shadow-sm" : "bg-transparent border-b border-transparent"
        }`}
      >
        <div className="flex-1 flex items-center">
          <Link to="/" className="text-2xl font-bold tracking-[0.2em] leading-none cursor-pointer">TT</Link>
        </div>

        <div className="hidden lg:flex items-center space-x-2">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className="text-sm font-semibold tracking-wide px-4 py-2 hover:bg-black/5 rounded transition-all"
            >
              {link.name}
            </Link>
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
                  <Link
                    key={link.name}
                    to={link.path}
                    className="text-left py-2 px-4 hover:bg-stone-100 rounded-md transition-colors text-sm font-medium"
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
