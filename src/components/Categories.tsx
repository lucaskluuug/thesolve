import { Leaf, Sun, Brain, Heart, Sparkles } from "lucide-react";

const benefits = [
  {
    icon: Sun,
    title: "Energia Limpa",
    description:
      "Energia sustentada ao longo do dia sem crashes. Matchá, maca e vitaminas do complexo B trabalham juntos para manter você ativo.",
  },
  {
    icon: Brain,
    title: "Foco Mental",
    description:
      "Clareza e concentração para sua rotina. Ingredientes adaptógenos que suportam a função cognitiva naturalmente.",
  },
  {
    icon: Heart,
    title: "Saúde Digestiva",
    description:
      "Fibras prebióticas e probióticos para um intestino saudável. Uma base forte para absorver os nutrientes que seu corpo precisa.",
  },
  {
    icon: Leaf,
    title: "Nutrição Completa",
    description:
      "Vitaminas, minerais e superfoods que preenchem as lacunas da sua alimentação diária. Tudo em uma dose.",
  },
  {
    icon: Sparkles,
    title: "Imunidade",
    description:
      "Antioxidantes e micronutrientes que fortalecem seu sistema imunológico. Cúrcuma, chlorella e vitamina C.",
  },
];

export const Categories = () => {
  return (
    <section id="beneficios" className="py-24 lg:py-32 bg-cream">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top text */}
        <div className="max-w-3xl mx-auto text-center mb-20">
          <p className="text-sm font-bold text-primary uppercase tracking-[0.2em] mb-4">
            Por que Daily Greens?
          </p>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-foreground mb-6">
            Projetado para apoiar seu estilo de vida
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Formulamos o Daily Greens para entregar nutrição avançada em cada
            dose. Ideal para quem busca energia, foco e bem-estar diário.
          </p>
        </div>

        {/* Benefits grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
          {benefits.map((benefit, index) => (
            <div
              key={benefit.title}
              className="text-center animate-fade-up opacity-0"
              style={{ animationDelay: `${0.1 + index * 0.08}s` }}
            >
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mb-6">
                <benefit.icon className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-extrabold text-foreground mb-3">
                {benefit.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed max-w-sm mx-auto">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
