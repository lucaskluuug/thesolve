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
    <section id="sobre" className="py-24 bg-foreground text-background overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest mb-4 text-primary-foreground/60">
              Sobre a Marca
            </p>
            <h2 className="text-4xl sm:text-5xl font-extrabold mb-6 text-background">
              THE SOLVE não é sobre{" "}
              <em className="not-italic text-primary">milagres</em>
            </h2>
            <p className="text-lg text-background/70 mb-6 leading-relaxed">
              Somos uma marca brasileira de nutrição funcional e performance que ocupa
              o espaço entre ciência e lifestyle. Nosso propósito é inspirar pessoas a
              serem protagonistas das próprias histórias.
            </p>
            <p className="text-lg text-background/70 leading-relaxed">
              Vendemos escolhas diárias de bem-estar e performance. Entregamos ciência,
              consistência e um estilo de vida funcional.
            </p>
          </div>

          {/* Right Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {values.map((value, index) => (
              <div
                key={value.title}
                className="p-6 rounded-2xl bg-background/5 border border-background/10 hover:bg-background/10 transition-colors duration-300 animate-fade-up opacity-0"
                style={{ animationDelay: `${0.1 + index * 0.1}s` }}
              >
                <value.icon className="w-7 h-7 text-background/60 mb-4" />
                <h3 className="text-lg font-bold mb-2 text-background">{value.title}</h3>
                <p className="text-sm text-background/60">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};