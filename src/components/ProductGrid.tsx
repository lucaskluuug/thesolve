import { useEffect, useState } from "react";
import { fetchProducts, ShopifyProduct } from "@/lib/shopify";
import { ProductCard } from "./ProductCard";
import { Loader2, Package } from "lucide-react";

export const ProductGrid = () => {
  const [products, setProducts] = useState<ShopifyProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await fetchProducts(20);
        setProducts(data);
      } catch (err) {
        setError("Erro ao carregar produtos");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  if (loading) {
    return (
      <section id="produtos" className="py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="produtos" className="py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-20">
            <p className="text-destructive font-body">{error}</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="produtos" className="py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="font-body text-sm font-medium text-accent uppercase tracking-widest mb-4 block">
            Loja
          </span>
          <h2 className="font-display text-4xl sm:text-5xl font-bold text-primary mb-4">
            Nossos Produtos
          </h2>
          <p className="font-body text-lg text-muted-foreground max-w-xl mx-auto">
            Ciência e qualidade em cada fórmula. Escolhas inteligentes para sua rotina de bem-estar.
          </p>
        </div>

        {/* Products */}
        {products.length === 0 ? (
          <div className="text-center py-20">
            <Package className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="font-display text-xl font-semibold text-primary mb-2">
              Nenhum produto encontrado
            </h3>
            <p className="font-body text-muted-foreground">
              Novos produtos em breve. Fique ligado!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
            {products.map((product, index) => (
              <ProductCard key={product.node.id} product={product} index={index} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};