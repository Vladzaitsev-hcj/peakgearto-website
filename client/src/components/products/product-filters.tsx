import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface ProductFiltersProps {
  filters: {
    category: string;
    minPrice: number;
    maxPrice: number;
    carCompatibility: string;
  };
  onFiltersChange: (filters: any) => void;
}

export default function ProductFilters({ filters, onFiltersChange }: ProductFiltersProps) {
  const updateFilter = (key: string, value: any) => {
    onFiltersChange({ ...filters, [key]: value });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Filters</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Category Filter */}
        <div>
          <Label className="text-sm font-medium mb-2 block">Category</Label>
          <Select value={filters.category} onValueChange={(value) => updateFilter('category', value)}>
            <SelectTrigger data-testid="select-category">
              <SelectValue placeholder="All categories" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All Categories</SelectItem>
              <SelectItem value="cargo_box">Roof Boxes</SelectItem>
              <SelectItem value="bike_carrier">Bike Carriers</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Price Range Filter */}
        <div>
          <Label className="text-sm font-medium mb-2 block">
            Price Range: ${filters.minPrice} - ${filters.maxPrice}
          </Label>
          <div className="px-2">
            <Slider
              min={0}
              max={100}
              step={5}
              value={[filters.minPrice, filters.maxPrice]}
              onValueChange={([min, max]) => {
                updateFilter('minPrice', min);
                updateFilter('maxPrice', max);
              }}
              className="w-full"
              data-testid="slider-price-range"
            />
          </div>
          <div className="flex gap-2 mt-2">
            <Input
              type="number"
              placeholder="Min"
              value={filters.minPrice}
              onChange={(e) => updateFilter('minPrice', parseInt(e.target.value) || 0)}
              className="text-sm"
              data-testid="input-min-price"
            />
            <Input
              type="number"
              placeholder="Max"
              value={filters.maxPrice}
              onChange={(e) => updateFilter('maxPrice', parseInt(e.target.value) || 1000)}
              className="text-sm"
              data-testid="input-max-price"
            />
          </div>
        </div>

        {/* Car Compatibility Filter */}
        <div>
          <Label className="text-sm font-medium mb-2 block">Car Compatibility</Label>
          <Input
            placeholder="e.g., Honda, Toyota, SUV..."
            value={filters.carCompatibility}
            onChange={(e) => updateFilter('carCompatibility', e.target.value)}
            data-testid="input-car-compatibility"
          />
        </div>

        {/* Clear Filters */}
        <button
          onClick={() => onFiltersChange({ category: '', minPrice: 0, maxPrice: 1000, carCompatibility: '' })}
          className="w-full text-sm text-muted-foreground hover:text-foreground transition-colors border border-border rounded-lg py-2"
          data-testid="button-clear-filters"
        >
          Clear All Filters
        </button>
      </CardContent>
    </Card>
  );
}
