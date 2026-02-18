import { Button } from "@/components/ui/button";
import { ArrowRight, Shield, FlaskConical, Award } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";

export const Hero = () => {
  return (
    <>
      {/* Full-bleed Hero */}
      <section className="relative min-h-[66vh] flex items-center">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src={heroBg}
            alt="Daily Greens lifestyle"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />
        </div>

        {/* Content */}
        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-32">
          <div className="max-w-2xl">
            <p
              className="text-sm sm:text-base font-semibold text-white/70 uppercase tracking-[0.2em] mb-6 animate-fade-up opacity-0"
              style={{ animationDelay: "0.1s" }}
            >
              The Solve · Daily Greens
            </p>

            <h1
              className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold text-white leading-[0.95] mb-6 animate-fade-up opacity-0"
              style={{ animationDelay: "0.2s" }}
            >
              Sua nutrição
              <br />
              diária.
              <br />
              <span className="text-primary">Resolvida.</span>
            </h1>

            <div
              className="mb-10 animate-fade-up opacity-0"
              style={{ animationDelay: "0.35s" }}
            />


            <div
              className="flex flex-col sm:flex-row items-start gap-4 animate-fade-up opacity-0"
              style={{ animationDelay: "0.5s" }}
            >
              <Button
                size="lg"
                className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-full px-8 text-base gap-2 font-bold"
                asChild
              >
                <a href="#produtos">
                  Comprar agora
                  <ArrowRight className="w-4 h-4" />
                </a>
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="rounded-full px-8 text-base border-white/30 text-white hover:bg-white/10 hover:text-white"
                asChild
              >
                <a href="#beneficios">Saiba mais</a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Bar */}
      <div className="bg-foreground text-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-8 sm:gap-16 py-5">
            <div className="flex items-center gap-3">
              <Shield className="w-5 h-5 text-primary" />
              <span className="text-sm font-medium">
                Fórmula baseada em ciência
              </span>
            </div>
            <div className="flex items-center gap-3">
              <FlaskConical className="w-5 h-5 text-primary" />
              <span className="text-sm font-medium">
                Ingredientes funcionais
              </span>
            </div>
            <div className="flex items-center gap-3">
              <Award className="w-5 h-5 text-primary" />
              <span className="text-sm font-medium">
                Qualidade premium garantida
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
