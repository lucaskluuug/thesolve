import { Button } from "@/components/ui/button";
import { ShopifyProduct, CartItem } from "@/lib/shopify";
import { useCartStore } from "@/stores/cartStore";
import { ShoppingCart, Plus } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "sonner";

interface ProductCardProps {
  product: ShopifyProduct;
  index?: number;
}

export const ProductCard = ({ product, index = 0 }: ProductCardProps) => {
  const addItem = useCartStore((state) => state.addItem);
  const { node } = product;

  const price = parseFloat(node.priceRange.minVariantPrice.amount);
  const firstVariant = node.variants.edges[0]?.node;
  const image = node.images.edges[0]?.node;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!firstVariant) return;

    const cartItem: CartItem = {
      product,
      variantId: firstVariant.id,
      variantTitle: firstVariant.title,
      price: firstVariant.price,
      quantity: 1,
      selectedOptions: firstVariant.selectedOptions || [],
    };

    addItem(cartItem);
    toast.success("Adicionado ao carrinho", { description: node.title });
  };

  return (
    <div
      className="group animate-fade-up opacity-0"
      style={{ animationDelay: `${0.1 + index * 0.1}s` }}
    >
      <Link to={`/produto/${node.handle}`} className="block">
        {/* Image */}
        <div className="relative aspect-square rounded-xl overflow-hidden bg-cream mb-4">
          {image ? (
            <img
              src={image.url}
              alt={image.altText || node.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <span className="text-4xl font-bold text-muted-foreground/20">TSLV</span>
            </div>
          )}

          <Button
            size="icon"
            className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0 rounded-full bg-foreground text-background hover:bg-foreground/90"
            onClick={handleAddToCart}
          >
            <Plus className="w-4 h-4" />
          </Button>
        </div>

        {/* Content */}
        <div className="space-y-1.5">
          <h3 className="text-base font-bold text-foreground group-hover:text-primary transition-colors line-clamp-2">
            {node.title}
          </h3>

          {node.description && (
            <p className="text-sm text-muted-foreground line-clamp-2">{node.description}</p>
          )}

          <div className="flex items-center justify-between pt-1">
            <span className="text-lg font-extrabold text-foreground">
              R$ {price.toFixed(2)}
            </span>

            <Button
              variant="outline"
              size="sm"
              onClick={handleAddToCart}
              className="gap-2 rounded-full text-xs"
            >
              <ShoppingCart className="w-3.5 h-3.5" />
              Adicionar
            </Button>
          </div>
        </div>
      </Link>
    </div>
  );
};