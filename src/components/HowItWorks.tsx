import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const steps = [
  {
    step: "01",
    title: "Misture",
    description:
      "Adicione uma dose de Daily Greens em água gelada. Misture ou agite até ficar homogêneo. Nutrição pronta em segundos.",
  },
  {
    step: "02",
    title: "Beba",
    description:
      "Tome todos os dias. O sabor leve de limão torna fácil manter a consistência na sua rotina.",
  },
  {
    step: "03",
    title: "Evolua",
    description:
      "Sinta a diferença. Mais energia, digestão melhor e suporte nutricional completo em um ritual diário simples.",
  },
];

export const HowItWorks = () => {
  return (
    <section className="py-24 lg:py-32 bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-6">
            Como funciona
          </h2>
          <p className="text-lg text-primary-foreground/70 max-w-xl mx-auto">
            Três passos simples para transformar sua rotina de nutrição.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16 mb-16">
          {steps.map((item, index) => (
            <div
              key={item.step}
              className="text-center animate-fade-up opacity-0"
              style={{ animationDelay: `${0.1 + index * 0.15}s` }}
            >
              <div className="text-6xl sm:text-7xl font-extrabold text-primary-foreground/20 mb-6">
                {item.step}
              </div>
              <h3 className="text-2xl font-extrabold mb-4">{item.title}</h3>
              <p className="text-primary-foreground/70 leading-relaxed max-w-sm mx-auto">
                {item.description}
              </p>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Button
            size="lg"
            className="bg-background text-foreground hover:bg-background/90 rounded-full px-10 text-base font-bold gap-2"
            asChild
          >
            <a href="#produtos">
              Começar agora
              <ArrowRight className="w-4 h-4" />
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
};
