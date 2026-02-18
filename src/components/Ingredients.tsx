const ingredients = [
  {
    name: "Matchá",
    category: "Energia & Foco",
    description:
      "Antioxidantes e L-teanina para energia limpa e foco mental sustentado, sem a ansiedade do café.",
  },
  {
    name: "Chlorella",
    category: "Detox & Imunidade",
    description:
      "Microalga rica em clorofila, proteínas e vitaminas. Auxilia na desintoxicação natural e fortalece a imunidade.",
  },
  {
    name: "Cúrcuma",
    category: "Anti-inflamatório",
    description:
      "Poderoso anti-inflamatório natural com curcumina. Suporta a recuperação e a saúde das articulações.",
  },
  {
    name: "Maca Peruana",
    category: "Adaptógeno",
    description:
      "Raiz adaptógena que equilibra hormônios, aumenta a resistência física e melhora a disposição.",
  },
  {
    name: "Spirulina",
    category: "Superfoods",
    description:
      "Uma das fontes mais densas de nutrientes da natureza. Rica em proteínas, ferro e vitamina B12.",
  },
  {
    name: "Fibras Prebióticas",
    category: "Saúde Digestiva",
    description:
      "Inulina e FOS que alimentam as bactérias boas do intestino, promovendo digestão saudável.",
  },
];

export const Ingredients = () => {
  return (
    <section id="ingredientes" className="py-24 lg:py-32 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-4">
          <p className="text-sm font-bold text-primary uppercase tracking-[0.2em] mb-4">
            Ingredientes
          </p>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-foreground mb-6">
            Ingredientes de qualidade otimizados para impacto
          </h2>
        </div>

        <div className="text-center mb-16">
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Cada ingrediente é selecionado com base em evidências científicas
            para entregar resultados reais.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ingredients.map((item, index) => (
            <div
              key={item.name}
              className="group p-8 rounded-2xl border border-border bg-background hover:bg-cream hover:border-primary/20 transition-all duration-300 animate-fade-up opacity-0"
              style={{ animationDelay: `${0.1 + index * 0.08}s` }}
            >
              <span className="inline-block text-xs font-bold text-primary uppercase tracking-wider mb-3 bg-primary/10 px-3 py-1 rounded-full">
                {item.category}
              </span>
              <h3 className="text-xl font-extrabold text-foreground mb-3">
                {item.name}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
