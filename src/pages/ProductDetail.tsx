import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { fetchProductByHandle, ShopifyProduct, CartItem } from "@/lib/shopify";
import { useCartStore } from "@/stores/cartStore";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Loader2, Minus, Plus, ShoppingCart, ChevronDown, Leaf, Zap, Brain, Shield } from "lucide-react";
import { toast } from "sonner";

const ProductDetail = () => {
  const { handle } = useParams<{ handle: string }>();
  const [product, setProduct] = useState<ShopifyProduct["node"] | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [selectedVariantIndex, setSelectedVariantIndex] = useState(0);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [openAccordion, setOpenAccordion] = useState<string | null>("what-is");
  const addItem = useCartStore((state) => state.addItem);

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
          <h1 className="text-2xl font-bold text-foreground mb-4">Produto não encontrado</h1>
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
      content: "Daily Greens é um blend premium de superfoods que combina fibras, vitaminas, minerais, adaptógenos e antioxidantes em uma dose diária. Com ingredientes como chlorella, matchá, cúrcuma e maca peruana, oferece nutrição completa em um único scoop."
    },
    {
      id: "for-who",
      title: "Para quem é indicado",
      content: "Homens e mulheres maiores de 18 anos que buscam complementar a alimentação com nutrientes essenciais. Compatível com dietas veganas, low-carb, paleo e jejum intermitente."
    },
    {
      id: "benefits",
      title: "Benefícios",
      content: "Suporte diário para: produção de energia, digestão regular, defesa imunológica, foco mental e redução de inflamação."
    },
    {
      id: "how-to",
      title: "Como usar",
      content: "1. Misture 1 scoop (13g) de Daily Greens em 200-300ml de água gelada.\n2. Agite até dissolver completamente.\n3. Aproveite! Melhor consumido pela manhã em jejum."
    },
    {
      id: "quality",
      title: "Qualidade & Ingredientes",
      content: "Formulado com 75+ ingredientes de alta absorção e densidade nutricional. Inclui chlorella, spirulina, matchá, cúrcuma, maca peruana, gengibre, fibras prebióticas e probióticos. Sem glúten, sem açúcar adicionado, sem corantes artificiais."
    },
  ];

  const benefits = [
    { icon: Zap, label: "Energia Limpa" },
    { icon: Brain, label: "Foco Mental" },
    { icon: Shield, label: "Imunidade" },
    { icon: Leaf, label: "Digestão" },
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

        {/* Main Product Section - AG1 Style */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
            
            {/* Left: Image Gallery */}
            <div className="space-y-4">
              {/* Main Image */}
              <div className="aspect-square rounded-2xl overflow-hidden bg-cream relative">
                {images.length > 0 ? (
                  <img
                    src={images[selectedImageIndex]?.node.url}
                    alt={images[selectedImageIndex]?.node.altText || product.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-primary/5">
                    <span className="text-6xl font-black text-primary/20">TSLV</span>
                  </div>
                )}
                {/* Trust badges overlayed on image */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-6">
                  <div className="flex items-center gap-6 text-white text-xs font-medium">
                    <div className="flex items-center gap-2">
                      <Leaf className="w-4 h-4" />
                      <span>75+ Ingredientes</span>
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

              {/* Thumbnails */}
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
              {/* Title */}
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-foreground tracking-tight mb-2">
                {product.title}
              </h1>

              {/* Flavor description */}
              {product.description && (
                <p className="text-muted-foreground italic mb-6">{product.description}</p>
              )}

              {/* Variants as flavor chips (AG1 style) */}
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

              {/* Purchase Card - AG1 Style */}
              <div className="border border-border rounded-2xl overflow-hidden mb-8">
                {/* Buy option */}
                <div className="p-6 bg-primary/5 border-b border-primary/10">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-foreground text-lg">Compra Única</span>
                    <span className="text-2xl font-black text-foreground">
                      R$ {price.toFixed(2)}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">Frete calculado no checkout</p>
                </div>

                {/* Benefits list */}
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

              {/* Quantity + Add to Cart */}
              <div className="flex items-center gap-4 mb-6">
                <div className="inline-flex items-center gap-2 border border-border rounded-full p-1">
                  <Button variant="ghost" size="icon" className="rounded-full h-10 w-10" onClick={() => setQuantity(Math.max(1, quantity - 1))}>
                    <Minus className="w-4 h-4" />
                  </Button>
                  <span className="w-10 text-center font-bold text-foreground">{quantity}</span>
                  <Button variant="ghost" size="icon" className="rounded-full h-10 w-10" onClick={() => setQuantity(quantity + 1)}>
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>

                <Button
                  size="lg"
                  className="flex-1 gap-3 bg-primary text-primary-foreground hover:bg-primary/90 rounded-full text-base font-bold h-12"
                  onClick={handleAddToCart}
                  disabled={!selectedVariant?.availableForSale}
                >
                  <ShoppingCart className="w-5 h-5" />
                  {selectedVariant?.availableForSale
                    ? `Adicionar — R$ ${(price * quantity).toFixed(2)}`
                    : "Indisponível"}
                </Button>
              </div>

              {/* Accordion Info - AG1 Style */}
              <div className="border-t border-border">
                {accordionItems.map((item) => (
                  <div key={item.id} className="border-b border-border">
                    <button
                      onClick={() => toggleAccordion(item.id)}
                      className="w-full flex items-center justify-between py-5 text-left"
                    >
                      <span className="font-bold text-foreground text-base">{item.title}</span>
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

        {/* Benefits Strip - AG1 Style */}
        <section className="mt-20 bg-primary text-primary-foreground py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl sm:text-3xl font-black text-center mb-12">
              Suporte diário em um único scoop
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {benefits.map((benefit, index) => (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 rounded-full bg-primary-foreground/10 flex items-center justify-center mx-auto mb-4">
                    <benefit.icon className="w-7 h-7" />
                  </div>
                  <span className="font-bold text-lg">{benefit.label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Nutrition Quick Facts */}
        <section className="py-16 bg-cream">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl sm:text-3xl font-black text-center text-foreground mb-12">
              Em um scoop de Daily Greens
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-3xl mx-auto">
              {[
                { label: "Calorias", value: "40" },
                { label: "Carboidratos", value: "6g" },
                { label: "Fibras", value: "2g" },
                { label: "Açúcar", value: "<1g" },
              ].map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-4xl sm:text-5xl font-black text-primary mb-2">{stat.value}</div>
                  <div className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default ProductDetail;
