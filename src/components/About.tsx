import { Target, Beaker, Heart, TrendingUp } from "lucide-react";

const values = [
  {
    icon: Beaker,
    title: "Ciência",
    description: "Fórmulas baseadas em evidências científicas. Transparência total nos ingredientes.",
  },
  {
    icon: Target,
    title: "Consistência",
    description: "Resultados reais vêm de escolhas diárias. Apoiamos sua jornada, não prometemos milagres.",
  },
  {
    icon: Heart,
    title: "Bem-estar",
    description: "Saúde como base para uma vida plena. Energia, foco, equilíbrio e realização.",
  },
  {
    icon: TrendingUp,
    title: "Performance",
    description: "Para quem quer evoluir. Produtos que acompanham sua ambição e disciplina.",
  },
];

export const About = () => {
  return (
    <section id="sobre" className="py-24 bg-primary text-primary-foreground overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div>
            <span className="font-body text-sm font-medium text-accent uppercase tracking-widest mb-4 block">
              Sobre a Marca
            </span>
            <h2 className="font-display text-4xl sm:text-5xl font-bold mb-6">
              THE SOLVE não é sobre
              <br />
              <span className="text-accent">milagres</span>
            </h2>
            <p className="font-body text-lg text-primary-foreground/80 mb-8 leading-relaxed">
              Somos uma marca brasileira de nutrição funcional e performance que ocupa 
              o espaço entre ciência e lifestyle. Nosso propósito é inspirar pessoas a 
              serem protagonistas das próprias histórias.
            </p>
            <p className="font-body text-lg text-primary-foreground/80 leading-relaxed">
              Vendemos escolhas diárias de bem-estar e performance. Entregamos ciência, 
              consistência e um estilo de vida funcional para quem valoriza saúde, 
              disciplina e resultado real.
            </p>
          </div>

          {/* Right Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {values.map((value, index) => (
              <div
                key={value.title}
                className="p-6 rounded-2xl bg-primary-foreground/5 border border-primary-foreground/10 hover:bg-primary-foreground/10 transition-colors duration-300 animate-fade-up opacity-0"
                style={{ animationDelay: `${0.1 + index * 0.1}s` }}
              >
                <value.icon className="w-8 h-8 text-accent mb-4" />
                <h3 className="font-display text-xl font-bold mb-2">{value.title}</h3>
                <p className="font-body text-sm text-primary-foreground/70">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};