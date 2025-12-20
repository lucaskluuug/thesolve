import { ShoppingCart, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useCartStore } from "@/stores/cartStore";
import { useState } from "react";
import { CartDrawer } from "./CartDrawer";

export const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const totalItems = useCartStore((state) => state.getTotalItems());

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <a href="/" className="flex items-center gap-2">
            <span className="font-display text-2xl font-bold text-primary tracking-tight">
              THE SOLVE
            </span>
            <span className="font-display text-xs font-semibold text-muted-foreground tracking-widest">
              TSLV
            </span>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <a href="#produtos" className="font-body text-sm font-medium text-foreground hover:text-accent transition-colors">
              Produtos
            </a>
            <a href="#categorias" className="font-body text-sm font-medium text-foreground hover:text-accent transition-colors">
              Categorias
            </a>
            <a href="#sobre" className="font-body text-sm font-medium text-foreground hover:text-accent transition-colors">
              Sobre
            </a>
          </nav>

          {/* Cart & Mobile Menu */}
          <div className="flex items-center gap-4">
            <CartDrawer />
            
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav className="md:hidden py-4 border-t border-border animate-fade-up">
            <div className="flex flex-col gap-4">
              <a 
                href="#produtos" 
                className="font-body text-sm font-medium text-foreground hover:text-accent transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Produtos
              </a>
              <a 
                href="#categorias" 
                className="font-body text-sm font-medium text-foreground hover:text-accent transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Categorias
              </a>
              <a 
                href="#sobre" 
                className="font-body text-sm font-medium text-foreground hover:text-accent transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Sobre
              </a>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};