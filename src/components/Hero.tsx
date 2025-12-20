import { Button } from "@/components/ui/button";
import { ArrowDown, Sparkles } from "lucide-react";

export const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 right-10 w-72 h-72 bg-accent-blue/20 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-highlight/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-secondary/30 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div 
            className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full mb-8 animate-fade-up"
            style={{ animationDelay: "0.1s" }}
          >
            <Sparkles className="w-4 h-4" />
            <span className="font-body text-sm font-medium">Nutrição Funcional & Performance</span>
          </div>

          {/* Headline */}
          <h1 
            className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold text-primary leading-tight mb-6 animate-fade-up opacity-0"
            style={{ animationDelay: "0.2s" }}
          >
            Seja protagonista
            <br />
            <span className="text-accent">da sua história</span>
          </h1>

          {/* Subheadline */}
          <p 
            className="font-body text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 animate-fade-up opacity-0"
            style={{ animationDelay: "0.3s" }}
          >
            Escolhas diárias de bem-estar e performance. Ciência, consistência e 
            estilo de vida funcional para quem quer viver com mais energia, foco e realização.
          </p>

          {/* CTAs */}
          <div 
            className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-up opacity-0"
            style={{ animationDelay: "0.4s" }}
          >
            <Button variant="hero" size="lg" asChild>
              <a href="#produtos">Explorar Produtos</a>
            </Button>
            <Button variant="hero-outline" size="lg" asChild>
              <a href="#sobre">Conhecer a Marca</a>
            </Button>
          </div>

          {/* Scroll Indicator */}
          <div 
            className="mt-20 animate-fade-up opacity-0"
            style={{ animationDelay: "0.6s" }}
          >
            <a 
              href="#categorias" 
              className="inline-flex flex-col items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
            >
              <span className="font-body text-xs uppercase tracking-widest">Descubra</span>
              <ArrowDown className="w-5 h-5 animate-bounce" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};