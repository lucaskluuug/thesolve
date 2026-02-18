import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export const About = () => {
  return (
    <section id="sobre" className="py-24 lg:py-32 bg-foreground text-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Left */}
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.2em] mb-6 text-primary">
              Sobre a The Solve
            </p>
            <h2 className="text-3xl sm:text-4xl font-extrabold mb-8 text-background leading-tight">
              Não vendemos milagres.
              <br />
              Vendemos{" "}
              <span className="text-primary">consistência.</span>
            </h2>
            <p className="text-lg text-background/60 mb-6 leading-relaxed">
              Existimos para transformar saúde e bem-estar com fórmulas inteligentes que unem ciência e estratégia funcional — para que cada pessoa escolha como quer se sentir, todos os dias.
            </p>
            <Button
              size="lg"
              className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-full px-8 font-bold gap-2"
              asChild
            >
              <a href="#produtos">
                Experimente agora
                <ArrowRight className="w-4 h-4" />
              </a>
            </Button>
          </div>

          {/* Right - Stats */}
          <div className="grid grid-cols-2 gap-6">
            {[
              { number: "15+", label: "Ingredientes funcionais" },
              { number: "200g", label: "Por embalagem" },
              { number: "30", label: "Doses por pacote" },
              { number: "100%", label: "Baseado em ciência" },
            ].map((stat, index) => (
              <div
                key={stat.label}
                className="p-8 rounded-2xl bg-background/5 border border-background/10 text-center animate-fade-up opacity-0"
                style={{ animationDelay: `${0.1 + index * 0.1}s` }}
              >
                <div className="text-4xl sm:text-5xl font-extrabold text-primary mb-2">
                  {stat.number}
                </div>
                <p className="text-sm text-background/50 font-medium">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
