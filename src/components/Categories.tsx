import { Zap, Dumbbell, Moon } from "lucide-react";

const categories = [
  {
    id: "energy",
    title: "ENERGY",
    subtitle: "Ativação & Foco",
    description: "Energia limpa e sustentada para sua rotina. Sem crashes, sem ansiedade.",
    icon: Zap,
    color: "bg-highlight text-highlight-foreground",
    borderColor: "border-highlight/30",
  },
  {
    id: "performance",
    title: "PERFORMANCE",
    subtitle: "Força & Evolução",
    description: "Potencialize seus treinos e recupere-se melhor. Resultados reais.",
    icon: Dumbbell,
    color: "bg-accent text-accent-foreground",
    borderColor: "border-accent/30",
  },
  {
    id: "recovery",
    title: "RECOVERY",
    subtitle: "Sono & Recuperação",
    description: "Durma profundamente e acorde renovado. O descanso que você merece.",
    icon: Moon,
    color: "bg-accent-blue text-accent-blue-foreground",
    borderColor: "border-accent-blue/30",
  },
];

export const Categories = () => {
  return (
    <section id="categorias" className="py-24 bg-card">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="font-body text-sm font-medium text-accent uppercase tracking-widest mb-4 block">
            Portfólio
          </span>
          <h2 className="font-display text-4xl sm:text-5xl font-bold text-primary mb-4">
            Organize sua jornada
          </h2>
          <p className="font-body text-lg text-muted-foreground max-w-xl mx-auto">
            Produtos organizados por estados. Encontre o que você precisa para cada momento do seu dia.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {categories.map((category, index) => (
            <div
              key={category.id}
              className={`group relative p-8 rounded-2xl border-2 ${category.borderColor} bg-background hover:shadow-brand-lg transition-all duration-500 cursor-pointer animate-fade-up opacity-0`}
              style={{ animationDelay: `${0.1 + index * 0.1}s` }}
            >
              {/* Icon */}
              <div className={`inline-flex items-center justify-center w-14 h-14 rounded-xl ${category.color} mb-6 group-hover:scale-110 transition-transform duration-300`}>
                <category.icon className="w-7 h-7" />
              </div>

              {/* Content */}
              <h3 className="font-display text-2xl font-bold text-primary mb-1">
                {category.title}
              </h3>
              <p className="font-body text-sm font-medium text-accent mb-3">
                {category.subtitle}
              </p>
              <p className="font-body text-muted-foreground">
                {category.description}
              </p>

              {/* Hover Indicator */}
              <div className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="font-body text-xs text-accent uppercase tracking-wider">Em breve →</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};