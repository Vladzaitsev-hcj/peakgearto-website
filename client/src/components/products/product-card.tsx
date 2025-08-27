import { Link } from "wouter";
import { Car, Bike, Star } from "lucide-react";
import type { Product } from "@shared/schema";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const getProductIcon = (category: string) => {
    return category === 'cargo_box' ? Car : Bike;
  };

  const getProductImage = (product: Product) => {
    if (product.images && product.images.length > 0) {
      return product.images[0];
    }
    // Fallback images based on category
    return product.category === 'cargo_box' 
      ? 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600'
      : 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600';
  };

  const IconComponent = getProductIcon(product.category);

  return (
    <div className="bg-card rounded-lg shadow-sm border border-border overflow-hidden card-hover" data-testid={`card-product-${product.id}`}>
      <img 
        src={getProductImage(product)}
        alt={product.name}
        className="w-full h-48 object-cover"
        data-testid={`img-product-${product.id}`}
      />
      <div className="p-6">
        <h3 className="text-lg font-semibold mb-2 text-card-foreground" data-testid={`text-name-${product.id}`}>
          {product.name}
        </h3>
        <p className="text-sm text-muted-foreground mb-3 line-clamp-2" data-testid={`text-description-${product.id}`}>
          {product.description}
        </p>
        <div className="flex items-center justify-between mb-4">
          <span className="text-2xl font-bold text-primary" data-testid={`text-price-${product.id}`}>
            ${product.dailyRate}/day
          </span>
          <span className="text-sm text-muted-foreground" data-testid={`text-deposit-${product.id}`}>
            ${product.securityDeposit} deposit
          </span>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
          <IconComponent className="h-4 w-4 text-accent" />
          <span>
            {product.category === 'cargo_box' ? 'Fits most vehicles' : 
             product.category === 'bike_carrier' ? 'Holds multiple bikes' : 'Premium choice'}
          </span>
        </div>
        <Link href={`/products/${product.id}`}>
          <button className="w-full btn-primary py-3 rounded-lg font-medium" data-testid={`button-view-details-${product.id}`}>
            View Details
          </button>
        </Link>
      </div>
    </div>
  );
}
