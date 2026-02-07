import { Zap, Dumbbell, Moon } from "lucide-react";

const categories = [
  {
    id: "energy",
    title: "ENERGY",
    subtitle: "Ativação & Foco",
    description: "Energia limpa e sustentada para sua rotina. Sem crashes, sem ansiedade.",
    icon: Zap,
  },
  {
    id: "performance",
    title: "PERFORMANCE",
    subtitle: "Força & Evolução",
    description: "Potencialize seus treinos e recupere-se melhor. Resultados reais.",
    icon: Dumbbell,
  },
  {
    id: "recovery",
    title: "RECOVERY",
    subtitle: "Sono & Recuperação",
    description: "Durma profundamente e acorde renovado. O descanso que você merece.",
    icon: Moon,
  },
];

export const Categories = () => {
  return (
    <section id="categorias" className="py-24 bg-cream">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-sm font-semibold text-primary uppercase tracking-widest mb-3">
            Portfólio
          </p>
          <h2 className="text-4xl sm:text-5xl font-extrabold text-foreground mb-4">
            Organize sua jornada
          </h2>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto">
            Produtos organizados por estados. Encontre o que você precisa para cada momento.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {categories.map((category, index) => (
            <div
              key={category.id}
              className="group relative p-8 rounded-2xl border border-border bg-background hover:shadow-brand-lg transition-all duration-500 cursor-pointer animate-fade-up opacity-0"
              style={{ animationDelay: `${0.1 + index * 0.1}s` }}
            >
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-primary/10 text-primary mb-6 group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                <category.icon className="w-7 h-7" />
              </div>

              <h3 className="text-2xl font-extrabold text-foreground mb-1">
                {category.title}
              </h3>
              <p className="text-sm font-semibold text-primary mb-3">
                {category.subtitle}
              </p>
              <p className="text-muted-foreground">
                {category.description}
              </p>

              <div className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="text-xs text-primary uppercase tracking-wider font-semibold">Em breve →</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};