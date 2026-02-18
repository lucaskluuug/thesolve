import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { fetchProductByHandle, ShopifyProduct, CartItem, createStorefrontCheckout } from "@/lib/shopify";
import { useCartStore } from "@/stores/cartStore";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Loader2, Minus, Plus, ShoppingCart, ChevronDown, Leaf, Zap, Brain, Shield, X, ArrowRight, Sparkles, Heart, Droplets, Sun, Star, Quote } from "lucide-react";
import { toast } from "sonner";

const ProductDetail = () => {
  const { handle } = useParams<{ handle: string }>();
  const [product, setProduct] = useState<ShopifyProduct["node"] | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [selectedVariantIndex, setSelectedVariantIndex] = useState(0);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [openAccordion, setOpenAccordion] = useState<string | null>("what-is");
  const [showNutritionModal, setShowNutritionModal] = useState(false);
  const addItem = useCartStore((state) => state.addItem);

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [handle]);

  useEffect(() => {
    const loadProduct = async () => {
      if (!handle) return;
      try {
        const data = await fetchProductByHandle(handle);
        setProduct(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    loadProduct();
  }, [handle]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header forceDark />
        <div className="flex items-center justify-center py-40">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
        <Footer />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-background">
        <Header forceDark />
        <div className="container mx-auto px-4 py-40 text-center">
          <h1 className="text-2xl font-semibold text-foreground mb-4">Produto não encontrado</h1>
          <Button variant="outline" asChild>
            <Link to="/">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Voltar para a loja
            </Link>
          </Button>
        </div>
        <Footer />
      </div>
    );
  }

  const selectedVariant = product.variants.edges[selectedVariantIndex]?.node;
  const price = selectedVariant ? parseFloat(selectedVariant.price.amount) : 0;
  const images = product.images.edges;

  const handleBuyNow = async () => {
    if (!selectedVariant) return;
    try {
      const cartItem: CartItem = {
        product: { node: product } as ShopifyProduct,
        variantId: selectedVariant.id,
        variantTitle: selectedVariant.title,
        price: selectedVariant.price,
        quantity,
        selectedOptions: selectedVariant.selectedOptions || [],
      };
      const checkoutUrl = await createStorefrontCheckout([cartItem]);
      window.open(checkoutUrl, '_blank');
    } catch (err) {
      console.error(err);
      toast.error("Erro ao criar checkout");
    }
  };

  const handleAddToCart = () => {
    if (!selectedVariant) return;
    const cartItem: CartItem = {
      product: { node: product } as ShopifyProduct,
      variantId: selectedVariant.id,
      variantTitle: selectedVariant.title,
      price: selectedVariant.price,
      quantity,
      selectedOptions: selectedVariant.selectedOptions || [],
    };
    addItem(cartItem);
    toast.success("Adicionado ao carrinho", { description: `${quantity}x ${product.title}` });
  };

  const toggleAccordion = (id: string) => {
    setOpenAccordion(openAccordion === id ? null : id);
  };

  const accordionItems = [
    {
      id: "what-is",
      title: "O que é Daily Greens?",
      content: "Daily Greens é um blend premium de superfoods que combina fibras, vitaminas, minerais, adaptógenos e antioxidantes em uma dose diária. Com ingredientes como chlorella, matchá, cúrcuma e maca peruana, oferece nutrição completa em 2 scoops (10g)."
    },
    {
      id: "for-who",
      title: "Para quem é indicado",
      content: "Homens e mulheres maiores de 18 anos que buscam complementar a alimentação com nutrientes essenciais. Compatível com dietas veganas, low-carb, paleo e jejum intermitente."
    },
    {
      id: "how-to",
      title: "Como usar",
      content: "1. Misture 2 scoops (10g) de Daily Greens em 200-300ml de água gelada.\n2. Agite até dissolver completamente.\n3. Aproveite! Melhor consumido pela manhã em jejum."
    },
    {
      id: "quality",
      title: "Qualidade & Ingredientes",
      content: "Formulado com ingredientes de alta absorção e densidade nutricional. Inclui chlorella, spirulina, matchá, cúrcuma, maca peruana, gengibre, fibras prebióticas e probióticos. Sem glúten, sem açúcar adicionado, sem corantes artificiais."
    },
  ];

  const benefitsData = [
    { icon: Shield, title: "Suporte Imunológico", description: "Vitaminas C, D, E e Zinco para fortalecer suas defesas naturais." },
    { icon: Zap, title: "Metabolismo Energético", description: "Complexo B completo e Guaraná para energia sustentável ao longo do dia." },
    { icon: Brain, title: "Função Cognitiva", description: "Matchá e Maca Peruana para foco mental e clareza." },
    { icon: Leaf, title: "Suporte Digestivo", description: "6,2g de fibras prebióticas (inulina e polidextrose) por dose." },
    { icon: Heart, title: "Bem-estar", description: "Ingredientes que promovem equilíbrio e bem-estar no dia a dia." },
    { icon: Droplets, title: "Detox Natural", description: "Chlorella, Cúrcuma e Ora-pro-nóbis para limpeza e desintoxicação." },
  ];

  const testimonials = [
    {
      name: "Mariana S.",
      text: "Comecei a tomar há 3 semanas e a diferença na disposição é absurda. Acordo sem aquela preguiça de sempre.",
      rating: 5,
    },
    {
      name: "Rafael T.",
      text: "Sabor surpreendente, achei que seria terrível por ser verde mas é leve e cítrico. Virou rotina.",
      rating: 5,
    },
    {
      name: "Carolina M.",
      text: "Minha digestão melhorou demais. Sinto o intestino regulado todos os dias desde que comecei.",
      rating: 5,
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header forceDark />
      <main className="pt-20">
        {/* Breadcrumb */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Link to="/" className="hover:text-foreground transition-colors">Loja</Link>
            <span>/</span>
            <span className="text-foreground">{product.title}</span>
          </div>
        </div>

        {/* Main Product Section */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
            
            {/* Left: Image Gallery */}
            <div className="space-y-4">
              <div className="aspect-square rounded-2xl overflow-hidden bg-cream relative">
                {images.length > 0 ? (
                  <img
                    src={images[selectedImageIndex]?.node.url}
                    alt={images[selectedImageIndex]?.node.altText || product.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-primary/5">
                    <span className="text-6xl font-semibold text-primary/20">TSLV</span>
                  </div>
                )}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-6">
                  <div className="flex items-center gap-6 text-white text-xs font-medium">
                    <div className="flex items-center gap-2">
                      <Leaf className="w-4 h-4" />
                      <span>Ingredientes Funcionais</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Shield className="w-4 h-4" />
                      <span>Sem Glúten</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Zap className="w-4 h-4" />
                      <span>30 Doses</span>
                    </div>
                  </div>
                </div>
              </div>

              {images.length > 1 && (
                <div className="flex gap-3 overflow-x-auto pb-2">
                  {images.map((img, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImageIndex(index)}
                      className={`flex-shrink-0 w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden border-2 transition-all ${
                        index === selectedImageIndex
                          ? "border-primary ring-2 ring-primary/20"
                          : "border-transparent opacity-60 hover:opacity-100"
                      }`}
                    >
                      <img src={img.node.url} alt={img.node.altText || `${product.title} ${index + 1}`} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Right: Product Info */}
            <div className="lg:py-4">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-foreground tracking-tight mb-2">
                {product.title}
              </h1>

              {product.description && (
                <p className="text-muted-foreground italic mb-6">{product.description}</p>
              )}

              {product.variants.edges.length > 1 && (
                <div className="flex flex-wrap gap-2 mb-8">
                  {product.variants.edges.map((variant, index) => (
                    <button
                      key={variant.node.id}
                      onClick={() => setSelectedVariantIndex(index)}
                      className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all border ${
                        index === selectedVariantIndex
                          ? "bg-primary text-primary-foreground border-primary"
                          : "bg-transparent border-border text-foreground hover:border-primary"
                      }`}
                    >
                      {variant.node.title}
                    </button>
                  ))}
                </div>
              )}

              {/* Purchase Card */}
              <div className="border border-border rounded-2xl overflow-hidden mb-8">
                <div className="p-6 bg-primary/5 border-b border-primary/10">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-semibold text-foreground text-lg">Compra Única</span>
                    <span className="text-2xl font-semibold text-foreground">
                      R$ {price.toFixed(2)}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">Frete calculado no checkout</p>
                </div>

                <div className="p-6 space-y-3">
                  <div className="flex items-center gap-3 text-sm">
                    <span className="w-5 h-5 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs">✓</span>
                    <span className="text-foreground">Frete grátis para todo o Brasil</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <span className="w-5 h-5 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs">✓</span>
                    <span className="text-foreground">30 doses por embalagem</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <span className="w-5 h-5 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs">✓</span>
                    <span className="text-foreground">Garantia de 30 dias</span>
                  </div>
                </div>
              </div>

              {/* Quantity + Buy Now + Add to Cart */}
              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-4">
                  <div className="inline-flex items-center gap-2 border border-border rounded-full p-1">
                    <Button variant="ghost" size="icon" className="rounded-full h-10 w-10" onClick={() => setQuantity(Math.max(1, quantity - 1))}>
                      <Minus className="w-4 h-4" />
                    </Button>
                    <span className="w-10 text-center font-semibold text-foreground">{quantity}</span>
                    <Button variant="ghost" size="icon" className="rounded-full h-10 w-10" onClick={() => setQuantity(quantity + 1)}>
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>

                  <Button
                    size="lg"
                    className="flex-1 gap-3 bg-primary text-primary-foreground hover:bg-primary/90 rounded-full text-base font-semibold h-12"
                    onClick={handleBuyNow}
                    disabled={!selectedVariant?.availableForSale}
                  >
                    {selectedVariant?.availableForSale
                      ? `Comprar agora — R$ ${(price * quantity).toFixed(2)}`
                      : "Indisponível"}
                  </Button>
                </div>

                <Button
                  variant="outline"
                  size="lg"
                  className="w-full gap-3 rounded-full text-base font-semibold h-12"
                  onClick={handleAddToCart}
                  disabled={!selectedVariant?.availableForSale}
                >
                  <ShoppingCart className="w-5 h-5" />
                  Adicionar ao carrinho
                </Button>
              </div>

              {/* Accordion Info */}
              <div className="border-t border-border">
                {accordionItems.map((item) => (
                  <div key={item.id} className="border-b border-border">
                    <button
                      onClick={() => toggleAccordion(item.id)}
                      className="w-full flex items-center justify-between py-5 text-left"
                    >
                      <span className="font-semibold text-foreground text-base">{item.title}</span>
                      <ChevronDown
                        className={`w-5 h-5 text-muted-foreground transition-transform duration-200 ${
                          openAccordion === item.id ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                    {openAccordion === item.id && (
                      <div className="pb-5 -mt-1">
                        <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
                          {item.content}
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Benefits Section - Huel Style */}
        <section className="mt-20 py-20 bg-primary/5">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-semibold text-foreground tracking-tight mb-4">
                Mais de <span className="italic text-primary font-accent">15 benefícios</span>
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Cada dose é rica em vitaminas, minerais e superfoods com benefícios comprovados pela ciência para apoiar e manter sua saúde.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-4xl mx-auto">
              {benefitsData.map((benefit, index) => (
                <div key={index} className="text-center group">
                  <div className="w-16 h-16 rounded-2xl bg-background border border-border flex items-center justify-center mx-auto mb-5 group-hover:border-primary group-hover:bg-primary/5 transition-all">
                    <benefit.icon className="w-7 h-7 text-foreground group-hover:text-primary transition-colors" />
                  </div>
                  <h3 className="font-semibold text-foreground text-lg mb-2">{benefit.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{benefit.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Nutrition Section */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
              <div>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-foreground tracking-tight mb-4">
                  Em uma dose de<br />Daily Greens
                </h2>
                <p className="text-muted-foreground text-lg leading-relaxed mb-10 max-w-md">
                  Daily Greens complementa sua alimentação diária. Fácil de integrar a qualquer estilo de vida ou rotina de saúde. Cuide dos seus macros, depois tome Daily Greens.
                </p>

                <div className="max-w-md">
                  {[
                    { label: "CALORIAS", value: "16" },
                    { label: "CARBOIDRATOS", value: "1,8g" },
                    { label: "FIBRAS ALIMENTARES", value: "6,2g" },
                    { label: "VITAMINA C", value: "90mg" },
                    { label: "VITAMINA D", value: "10µg" },
                    { label: "VITAMINA E", value: "10mg" },
                    { label: "VITAMINAS DO COMPLEXO B", value: "8 tipos" },
                    { label: "ZINCO", value: "3,6mg" },
                  ].map((item, index) => (
                    <div key={index} className="flex items-center justify-between py-4 border-b border-border/60">
                      <span className="text-sm font-semibold text-foreground tracking-wide uppercase">{item.label}</span>
                      <span className="text-sm font-semibold text-foreground">{item.value}</span>
                    </div>
                  ))}
                </div>

                <button
                  onClick={() => setShowNutritionModal(true)}
                  className="inline-flex items-center gap-2 mt-8 px-6 py-3 border border-foreground rounded-full text-sm font-semibold text-foreground hover:bg-foreground hover:text-background transition-colors"
                >
                  Ver tabela nutricional completa
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              <div className="bg-cream rounded-2xl p-8 flex items-center justify-center min-h-[400px] lg:min-h-[560px]">
                {images.length > 0 ? (
                  <img
                    src={images[0]?.node.url}
                    alt={product.title}
                    className="max-w-full max-h-[500px] object-contain"
                  />
                ) : (
                  <div className="text-center">
                    <Leaf className="w-20 h-20 text-primary/30 mx-auto mb-4" />
                    <span className="text-primary/40 font-semibold text-xl">DAILY GREENS</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section - Huel Style */}
        <section className="py-20 bg-primary text-primary-foreground">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight mb-4">
                O que nossos clientes dizem
              </h2>
              <p className="text-primary-foreground/70 text-lg">Feedback real de quem já experimentou.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {testimonials.map((t, index) => (
                <div key={index} className="bg-primary-foreground/10 backdrop-blur-sm rounded-2xl p-8 border border-primary-foreground/10">
                  <Quote className="w-8 h-8 text-primary-foreground/30 mb-4" />
                  <div className="flex gap-1 mb-4">
                    {Array.from({ length: t.rating }).map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" style={{ color: 'hsl(48, 96%, 53%)' }} />
                    ))}
                  </div>
                  <p className="text-primary-foreground/90 leading-relaxed mb-6 text-sm">
                    "{t.text}"
                  </p>
                  <span className="text-sm font-semibold text-primary-foreground/70">— {t.name}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl sm:text-4xl font-semibold text-foreground mb-4">
              Pronto para começar?
            </h2>
            <p className="text-muted-foreground text-lg mb-8 max-w-lg mx-auto">
              Uma dose por dia. Todos os nutrientes que seu corpo precisa.
            </p>
            <Button
              size="lg"
              className="rounded-full text-base font-semibold h-14 px-12"
              onClick={handleBuyNow}
              disabled={!selectedVariant?.availableForSale}
            >
              Comprar agora — R$ {price.toFixed(2)}
            </Button>
          </div>
        </section>

        {/* Full Nutrition Table Modal */}
        {showNutritionModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowNutritionModal(false)} />
            <div className="relative bg-background rounded-2xl max-w-lg w-full max-h-[85vh] overflow-y-auto shadow-2xl">
              <div className="sticky top-0 bg-background border-b border-border px-6 py-4 flex items-center justify-between rounded-t-2xl">
                <h3 className="text-lg font-semibold text-foreground">Informação Nutricional</h3>
                <button onClick={() => setShowNutritionModal(false)} className="p-2 hover:bg-muted rounded-full transition-colors">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="px-6 py-4">
                <p className="text-sm text-muted-foreground mb-4">
                  Porções por embalagem: 20 · Porção: 10g (2 medidores)
                </p>
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b-2 border-foreground">
                      <th className="text-left py-2 font-bold text-foreground">Nutriente</th>
                      <th className="text-right py-2 font-bold text-foreground">10g</th>
                      <th className="text-right py-2 font-bold text-foreground">%VD*</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { name: "Valor energético", value: "16 kcal", vd: "1%" },
                      { name: "Carboidratos", value: "1,8g", vd: "1%" },
                      { name: "Fibras alimentares", value: "6,2g", vd: "25%" },
                      { name: "Vitamina D", value: "10µg", vd: "67%" },
                      { name: "Vitamina E", value: "10mg", vd: "67%" },
                      { name: "Vitamina C", value: "90mg", vd: "90%" },
                      { name: "Vitamina B1", value: "1,2mg", vd: "100%" },
                      { name: "Vitamina B2", value: "1,2mg", vd: "100%" },
                      { name: "Vitamina B3", value: "15mg", vd: "100%" },
                      { name: "Vitamina B5", value: "5mg", vd: "100%" },
                      { name: "Vitamina B6", value: "1,3mg", vd: "100%" },
                      { name: "Vitamina B7 (Biotina)", value: "30µg", vd: "100%" },
                      { name: "Vitamina B9 (Ác. Fólico)", value: "240µg", vd: "60%" },
                      { name: "Vitamina B12", value: "2,4µg", vd: "100%" },
                      { name: "Zinco", value: "3,6mg", vd: "33%" },
                    ].map((row, index) => (
                      <tr key={index} className="border-b border-border/50">
                        <td className="py-3 text-foreground">{row.name}</td>
                        <td className="py-3 text-right text-foreground font-medium">{row.value}</td>
                        <td className="py-3 text-right text-muted-foreground">{row.vd}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <p className="text-xs text-muted-foreground mt-4 leading-relaxed">
                  * Percentual de valores diários fornecidos pela porção.
                </p>
                <p className="text-xs text-muted-foreground mt-2 leading-relaxed">
                  Não contém quantidades significativas de açúcares totais, açúcares adicionados, proteínas, gorduras totais, gorduras saturadas, gorduras trans e sódio.
                </p>
                <div className="mt-6 pt-4 border-t border-border">
                  <p className="text-xs font-bold text-foreground mb-2">Ingredientes:</p>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Polidextrose, inulina obtida da raiz de chicória (Cichorium intybus), farinha de maca peruana, polpa de limão em pó, chlorella, cúrcuma, ora-pro-nóbis, matchá, vinagre de maçã, gengibre, ácido ascórbico, acetato de DL-alfa-tocoferol, niacinamida, bisglicinato de zinco, D-pantotenato de cálcio, cloridrato de piridoxina, cloridrato de tiamina, riboflavina, ácido fólico, D-biotina, colecalciferol, cianocobalamina, acidulante ácido cítrico, aromatizante aroma idêntico ao natural de frutas cítricas, espessante goma xantana, corante natural clorofila, antiumectante dióxido de silício.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default ProductDetail;
