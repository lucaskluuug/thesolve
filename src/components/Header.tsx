import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { CartDrawer } from "./CartDrawer";
import logoImg from "@/assets/logo-thesolve.png";

interface HeaderProps {
  forceDark?: boolean;
}

export const Header = ({ forceDark = false }: HeaderProps) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // On product pages (forceDark), always use dark text/logo unless scrolled
  const useLight = !forceDark && !scrolled;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-background/95 backdrop-blur-md shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <a href="/" className="flex items-center">
            <img
              src={logoImg}
              alt="The Solve"
              className={`h-8 lg:h-10 transition-all duration-300 ${
                useLight ? "brightness-0 invert" : ""
              }`}
            />
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <a
              href="#beneficios"
              className={`text-sm font-semibold transition-colors ${
                useLight
                  ? "text-white/90 hover:text-white"
                  : "text-foreground hover:text-primary"
              }`}
            >
              Daily Greens
            </a>
            <a
              href="#ingredientes"
              className={`text-sm font-semibold transition-colors ${
                useLight
                  ? "text-white/90 hover:text-white"
                  : "text-foreground hover:text-primary"
              }`}
            >
              Ingredientes
            </a>
            <a
              href="#sobre"
              className={`text-sm font-semibold transition-colors ${
                useLight
                  ? "text-white/90 hover:text-white"
                  : "text-foreground hover:text-primary"
              }`}
            >
              Sobre
            </a>
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-3">
            <Button
              size="sm"
              className="hidden md:inline-flex bg-primary text-primary-foreground hover:bg-primary/90 rounded-full px-6 font-semibold"
              asChild
            >
              <a href="#produtos">Comprar</a>
            </Button>
            <CartDrawer />
            <Button
              variant="ghost"
              size="icon"
              className={`md:hidden ${useLight ? "text-white" : ""}`}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav className="md:hidden py-4 border-t border-white/10 animate-fade-up">
            <div className="flex flex-col gap-4">
              <a
                href="#beneficios"
                className={`text-sm font-semibold ${useLight ? "text-white" : "text-foreground"}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Daily Greens
              </a>
              <a
                href="#ingredientes"
                className={`text-sm font-semibold ${useLight ? "text-white" : "text-foreground"}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Ingredientes
              </a>
              <a
                href="#sobre"
                className={`text-sm font-semibold ${useLight ? "text-white" : "text-foreground"}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Sobre
              </a>
              <Button
                size="sm"
                className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-full px-6 font-semibold w-fit"
                asChild
              >
                <a href="#produtos" onClick={() => setMobileMenuOpen(false)}>
                  Comprar
                </a>
              </Button>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};
