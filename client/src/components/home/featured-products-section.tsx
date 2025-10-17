import { useQuery } from "@tanstack/react-query";
import { Car, Bike, Star } from "lucide-react";
import { Link } from "wouter";
import type { Product } from "@shared/schema";

export default function FeaturedProductsSection() {
  const { data: products, isLoading } = useQuery<Product[]>({
    queryKey: ["/api/products"],
  });

  // Get first 4 products as featured
  const featuredProducts = products?.slice(0, 4) || [];

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

  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">Featured Products</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Our most popular gear for your next adventure. Premium quality, competitive prices.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {isLoading ? (
            // Loading skeleton
            [...Array(4)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-muted rounded-lg h-48 mb-4"></div>
                <div className="h-4 bg-muted rounded mb-2"></div>
                <div className="h-4 bg-muted rounded w-2/3 mb-2"></div>
                <div className="h-8 bg-muted rounded mb-4"></div>
                <div className="h-10 bg-muted rounded"></div>
              </div>
            ))
          ) : (
            featuredProducts.map((product) => {
              const IconComponent = getProductIcon(product.category);
              return (
                <div key={product.id} className="bg-card rounded-lg shadow-sm border border-border overflow-hidden card-hover">
                  <img 
                    src={getProductImage(product)}
                    alt={product.name}
                    className="w-full h-48 object-cover"
                    data-testid={`img-featured-product-${product.id}`}
                  />
                  <div className="p-6">
                    <h3 className="text-lg font-semibold mb-2 text-card-foreground" data-testid={`text-product-name-${product.id}`}>
                      {product.name}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-3" data-testid={`text-product-description-${product.id}`}>
                      {product.description}
                    </p>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-2xl font-bold text-primary" data-testid={`text-product-price-${product.id}`}>
                        ${product.dailyRate}/day
                      </span>
                      <span className="text-sm text-muted-foreground" data-testid={`text-product-deposit-${product.id}`}>
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
            })
          )}
        </div>
        
        <div className="text-center mt-12">
          <Link href="/products">
            <button className="btn-secondary px-8 py-3 rounded-lg font-semibold" data-testid="button-view-all-products">
              View All Products
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}
