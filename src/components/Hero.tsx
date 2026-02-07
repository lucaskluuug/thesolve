import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export const Hero = () => {
  return (
    <section className="relative pt-20 bg-cream">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-16 sm:py-24 lg:py-32">
          <div className="max-w-3xl">
            {/* Headline */}
            <h1
              className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-extrabold text-foreground leading-[0.95] mb-6 animate-fade-up opacity-0"
              style={{ animationDelay: "0.1s" }}
            >
              Nutrição que{" "}
              <em className="not-italic text-primary">resolve</em>
            </h1>

            {/* Subheadline */}
            <p
              className="text-lg sm:text-xl text-muted-foreground max-w-xl mb-10 leading-relaxed animate-fade-up opacity-0"
              style={{ animationDelay: "0.25s" }}
            >
              Daily Greens com fibras, vitaminas, minerais e superfoods.
              Energia limpa, foco e bem-estar em uma dose diária.
            </p>

            {/* CTA */}
            <div
              className="flex flex-col sm:flex-row items-start gap-4 animate-fade-up opacity-0"
              style={{ animationDelay: "0.4s" }}
            >
              <Button size="lg" className="bg-foreground text-background hover:bg-foreground/90 rounded-full px-8 text-base gap-2" asChild>
                <a href="#produtos">
                  Comprar agora
                  <ArrowRight className="w-4 h-4" />
                </a>
              </Button>
              <Button variant="outline" size="lg" className="rounded-full px-8 text-base border-foreground/20" asChild>
                <a href="#sobre">Saiba mais</a>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom banner strip */}
      <div className="bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between py-4 gap-3 text-sm">
            <span>✦ Ciência + Lifestyle</span>
            <span>✦ Fórmulas baseadas em evidências</span>
            <span>✦ Sem milagres, só consistência</span>
          </div>
        </div>
      </div>
    </section>
  );
};