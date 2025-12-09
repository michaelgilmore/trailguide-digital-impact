import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, LogIn } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { name: "Services", href: "/services" },
  { name: "About", href: "/about" },
  { name: "Blog", href: "/blog" },
  { name: "Contact", href: "/contact" },
];

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const isHeroPage = location.pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const headerBg = isScrolled || !isHeroPage
    ? "bg-card/95 backdrop-blur-md shadow-soft border-b border-border"
    : "bg-transparent";

  const textColor = isScrolled || !isHeroPage ? "text-foreground" : "text-primary-foreground";
  const logoColor = isScrolled || !isHeroPage ? "text-foreground" : "text-primary-foreground";

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${headerBg}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center group-hover:shadow-glow transition-shadow duration-300">
              <svg viewBox="0 0 24 24" className="w-6 h-6 text-primary-foreground" fill="currentColor" stroke="none">
                {/* Cairn pyramid - 4, 3, 2, 1 rocks */}
                {/* Bottom row - 4 rocks */}
                <ellipse cx="4.5" cy="20.5" rx="2.5" ry="1.5" />
                <ellipse cx="9.5" cy="20.5" rx="2.5" ry="1.5" />
                <ellipse cx="14.5" cy="20.5" rx="2.5" ry="1.5" />
                <ellipse cx="19.5" cy="20.5" rx="2.5" ry="1.5" />
                {/* Second row - 3 rocks */}
                <ellipse cx="7" cy="16" rx="2.5" ry="1.5" />
                <ellipse cx="12" cy="16" rx="2.5" ry="1.5" />
                <ellipse cx="17" cy="16" rx="2.5" ry="1.5" />
                {/* Third row - 2 rocks */}
                <ellipse cx="9.5" cy="11.5" rx="2.5" ry="1.5" />
                <ellipse cx="14.5" cy="11.5" rx="2.5" ry="1.5" />
                {/* Top - 1 rock */}
                <ellipse cx="12" cy="7" rx="2.5" ry="1.5" />
              </svg>
            </div>
            <div className={`font-display font-bold text-lg lg:text-xl transition-colors ${logoColor}`}>
              <span>TrailGuide</span>
              <span className="text-primary ml-1">DHI</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link key={link.name} to={link.href}>
                <Button 
                  variant={isScrolled || !isHeroPage ? "nav" : "navHero"}
                  className={location.pathname === link.href ? "text-primary" : ""}
                >
                  {link.name}
                </Button>
              </Link>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <Link to="/login">
              <Button variant="ghost" className={`${textColor} gap-2`}>
                <LogIn className="w-4 h-4" />
                Client Login
              </Button>
            </Link>
            <Link to="/contact">
              <Button variant="cta" size="default">
                Start Your Journey
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`lg:hidden p-2 rounded-lg transition-colors ${textColor} hover:bg-primary/10`}
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-card border-t border-border"
          >
            <div className="container mx-auto px-4 py-4">
              <nav className="flex flex-col gap-2">
                {navLinks.map((link) => (
                  <Link 
                    key={link.name} 
                    to={link.href}
                    onClick={() => setIsOpen(false)}
                    className={`py-3 px-4 rounded-lg font-medium transition-colors hover:bg-accent ${
                      location.pathname === link.href ? "text-primary bg-accent" : "text-foreground"
                    }`}
                  >
                    {link.name}
                  </Link>
                ))}
                <div className="border-t border-border mt-2 pt-4 flex flex-col gap-2">
                  <Link to="/login" onClick={() => setIsOpen(false)}>
                    <Button variant="outline" className="w-full gap-2">
                      <LogIn className="w-4 h-4" />
                      Client Login
                    </Button>
                  </Link>
                  <Link to="/contact" onClick={() => setIsOpen(false)}>
                    <Button variant="cta" className="w-full">
                      Start Your Journey
                    </Button>
                  </Link>
                </div>
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
