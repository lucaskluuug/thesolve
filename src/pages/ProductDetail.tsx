import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { fetchProductByHandle, ShopifyProduct, CartItem } from "@/lib/shopify";
import { useCartStore } from "@/stores/cartStore";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Loader2, Minus, Plus, ShoppingCart } from "lucide-react";
import { toast } from "sonner";

const ProductDetail = () => {
  const { handle } = useParams<{ handle: string }>();
  const [product, setProduct] = useState<ShopifyProduct['node'] | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [selectedVariantIndex, setSelectedVariantIndex] = useState(0);
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
        <Header />
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
        <Header />
        <div className="container mx-auto px-4 py-40 text-center">
          <h1 className="font-display text-2xl font-bold text-primary mb-4">
            Produto não encontrado
          </h1>
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
    toast.success("Adicionado ao carrinho", {
      description: `${quantity}x ${product.title}`,
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back Button */}
          <Link 
            to="/" 
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="font-body text-sm">Voltar para a loja</span>
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Images */}
            <div className="space-y-4">
              <div className="aspect-square rounded-2xl overflow-hidden bg-secondary">
                {images[0] ? (
                  <img
                    src={images[0].node.url}
                    alt={images[0].node.altText || product.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <span className="font-display text-6xl font-bold text-muted-foreground/30">TSLV</span>
                  </div>
                )}
              </div>
              
              {images.length > 1 && (
                <div className="grid grid-cols-4 gap-4">
                  {images.slice(1, 5).map((img, index) => (
                    <div key={index} className="aspect-square rounded-lg overflow-hidden bg-secondary">
                      <img
                        src={img.node.url}
                        alt={img.node.altText || `${product.title} ${index + 2}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Product Info */}
            <div className="lg:py-8">
              <h1 className="font-display text-3xl sm:text-4xl font-bold text-primary mb-4">
                {product.title}
              </h1>

              <p className="font-display text-3xl font-bold text-accent mb-6">
                R$ {price.toFixed(2)}
              </p>

              {product.description && (
                <p className="font-body text-muted-foreground mb-8 leading-relaxed">
                  {product.description}
                </p>
              )}

              {/* Variants */}
              {product.variants.edges.length > 1 && (
                <div className="mb-8">
                  <label className="font-display text-sm font-semibold text-primary block mb-3">
                    Opções
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {product.variants.edges.map((variant, index) => (
                      <button
                        key={variant.node.id}
                        onClick={() => setSelectedVariantIndex(index)}
                        className={`px-4 py-2 rounded-lg border-2 font-body text-sm transition-all ${
                          index === selectedVariantIndex
                            ? "border-primary bg-primary text-primary-foreground"
                            : "border-border hover:border-primary"
                        }`}
                      >
                        {variant.node.title}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity */}
              <div className="mb-8">
                <label className="font-display text-sm font-semibold text-primary block mb-3">
                  Quantidade
                </label>
                <div className="inline-flex items-center gap-3 border-2 border-border rounded-lg p-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  >
                    <Minus className="w-4 h-4" />
                  </Button>
                  <span className="w-12 text-center font-display font-semibold">{quantity}</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setQuantity(quantity + 1)}
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {/* Add to Cart */}
              <Button 
                variant="accent" 
                size="lg" 
                className="w-full gap-3"
                onClick={handleAddToCart}
                disabled={!selectedVariant?.availableForSale}
              >
                <ShoppingCart className="w-5 h-5" />
                {selectedVariant?.availableForSale ? "Adicionar ao Carrinho" : "Indisponível"}
              </Button>

              {/* Total */}
              <div className="mt-6 p-4 bg-secondary rounded-lg">
                <div className="flex items-center justify-between">
                  <span className="font-body text-muted-foreground">Total</span>
                  <span className="font-display text-xl font-bold text-primary">
                    R$ {(price * quantity).toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ProductDetail;