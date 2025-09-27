import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { isUnauthorizedError } from "@/lib/authUtils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, Edit, Trash2, Car, Bike, ToggleLeft, ToggleRight, RefreshCw } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertProductSchema, type Product, type InsertProduct } from "@shared/schema";
import { z } from "zod";

const productFormSchema = insertProductSchema.extend({
  compatibleCars: z.string().optional(),
  images: z.string().optional(),
});

type ProductFormData = z.infer<typeof productFormSchema>;

export default function ProductManagement() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [showDisabled, setShowDisabled] = useState(true);

  const { data: products, isLoading } = useQuery<Product[]>({
    queryKey: ["/api/admin/products"],
  });

  const { register, handleSubmit, reset, setValue, watch, formState: { errors } } = useForm<ProductFormData>({
    resolver: zodResolver(productFormSchema),
    defaultValues: {
      name: '',
      description: '',
      category: 'cargo_box',
      dailyRate: '',
      securityDeposit: '',
      specifications: '',
      compatibleCars: '',
      images: '',
      available: true,
    },
  });

  const createProductMutation = useMutation({
    mutationFn: async (data: InsertProduct) => {
      await apiRequest("POST", "/api/products", data);
    },
    onSuccess: () => {
      toast({
        title: "Product Created",
        description: "New product has been added successfully.",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/admin/products"] });
      setIsCreateDialogOpen(false);
      reset();
    },
    onError: (error) => {
      if (isUnauthorizedError(error)) {
        toast({
          title: "Unauthorized",
          description: "You are logged out. Logging in again...",
          variant: "destructive",
        });
        setTimeout(() => {
          window.location.href = "/auth";
        }, 500);
        return;
      }
      toast({
        title: "Error",
        description: "Failed to create product. Please try again.",
        variant: "destructive",
      });
    },
  });

  const updateProductMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<InsertProduct> }) => {
      await apiRequest("PUT", `/api/products/${id}`, data);
    },
    onSuccess: () => {
      toast({
        title: "Product Updated",
        description: "Product has been updated successfully.",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/admin/products"] });
      setEditingProduct(null);
      reset();
    },
    onError: (error) => {
      if (isUnauthorizedError(error)) {
        toast({
          title: "Unauthorized",
          description: "You are logged out. Logging in again...",
          variant: "destructive",
        });
        setTimeout(() => {
          window.location.href = "/auth";
        }, 500);
        return;
      }
      toast({
        title: "Error",
        description: "Failed to update product. Please try again.",
        variant: "destructive",
      });
    },
  });

  const deleteProductMutation = useMutation({
    mutationFn: async (id: string) => {
      await apiRequest("DELETE", `/api/products/${id}`);
    },
    onSuccess: () => {
      toast({
        title: "Product Deleted",
        description: "Product has been deleted successfully.",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/admin/products"] });
    },
    onError: (error) => {
      if (isUnauthorizedError(error)) {
        toast({
          title: "Unauthorized",
          description: "You are logged out. Logging in again...",
          variant: "destructive",
        });
        setTimeout(() => {
          window.location.href = "/auth";
        }, 500);
        return;
      }
      toast({
        title: "Error",
        description: "Failed to delete product. Please try again.",
        variant: "destructive",
      });
    },
  });

  const toggleProductAvailability = useMutation({
    mutationFn: async ({ id, available }: { id: string; available: boolean }) => {
      await apiRequest("PUT", `/api/products/${id}`, { available });
    },
    onSuccess: () => {
      toast({
        title: "Product Updated",
        description: "Product availability has been updated successfully.",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/admin/products"] });
    },
    onError: (error) => {
      if (isUnauthorizedError(error)) {
        toast({
          title: "Unauthorized",
          description: "You are logged out. Logging in again...",
          variant: "destructive",
        });
        setTimeout(() => {
          window.location.href = "/auth";
        }, 500);
        return;
      }
      toast({
        title: "Error",
        description: "Failed to update product availability. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setValue('name', product.name);
    setValue('description', product.description || '');
    setValue('category', product.category);
    setValue('dailyRate', product.dailyRate);
    setValue('securityDeposit', product.securityDeposit);
    setValue('specifications', JSON.stringify(product.specifications || {}));
    setValue('compatibleCars', product.compatibleCars?.join(', ') || '');
    setValue('images', product.images?.join(', ') || '');
    setValue('available', product.available ?? true);
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this product?')) {
      deleteProductMutation.mutate(id);
    }
  };

  const filteredProducts = products?.filter(product => showDisabled || product.available) || [];

  const onSubmit = (data: ProductFormData) => {
    const processedData: InsertProduct = {
      name: data.name,
      description: data.description,
      category: data.category,
      dailyRate: data.dailyRate,
      securityDeposit: data.securityDeposit,
      specifications: data.specifications ? JSON.parse(String(data.specifications)) : {},
      compatibleCars: data.compatibleCars ? data.compatibleCars.split(',').map(car => car.trim()).filter(Boolean) : [],
      images: data.images ? data.images.split(',').map(img => img.trim()).filter(Boolean) : [],
      available: data.available,
    };

    if (editingProduct) {
      updateProductMutation.mutate({ id: editingProduct.id, data: processedData });
    } else {
      createProductMutation.mutate(processedData);
    }
  };

  const getProductIcon = (category: string) => {
    return category === 'cargo_box' ? Car : Bike;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Product Management</h2>
          <p className="text-muted-foreground">Manage your rental inventory</p>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Label htmlFor="show-disabled" className="text-sm">Show disabled:</Label>
            <Button
              id="show-disabled"
              variant="ghost"
              size="sm"
              onClick={() => setShowDisabled(!showDisabled)}
              className="p-1"
              data-testid="toggle-show-disabled"
            >
              {showDisabled ? <ToggleRight className="h-4 w-4 text-green-600" /> : <ToggleLeft className="h-4 w-4 text-gray-400" />}
            </Button>
          </div>
          
          <Dialog open={isCreateDialogOpen || !!editingProduct} onOpenChange={(open) => {
            if (!open) {
              setIsCreateDialogOpen(false);
              setEditingProduct(null);
              reset();
            }
          }}>
            <DialogTrigger asChild>
              <Button 
                onClick={() => setIsCreateDialogOpen(true)} 
                className="btn-primary"
                data-testid="button-add-product"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Product
              </Button>
            </DialogTrigger>
            
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>
                  {editingProduct ? 'Edit Product' : 'Add New Product'}
                </DialogTitle>
              </DialogHeader>
              
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Product Name *</Label>
                    <Input
                      id="name"
                      {...register('name')}
                      placeholder="e.g., Thule Motion XL"
                      data-testid="input-product-name"
                    />
                    {errors.name && (
                      <p className="text-sm text-destructive mt-1">{errors.name.message}</p>
                    )}
                  </div>
                  
                  <div>
                    <Label htmlFor="category">Category *</Label>
                    <Select 
                      value={watch('category')} 
                      onValueChange={(value) => setValue('category', value as 'cargo_box' | 'bike_carrier')}
                    >
                      <SelectTrigger data-testid="select-product-category">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="cargo_box">Roof Box</SelectItem>
                        <SelectItem value="bike_carrier">Bike Carrier</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    {...register('description')}
                    placeholder="Product description..."
                    className="min-h-[80px]"
                    data-testid="textarea-product-description"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="dailyRate">Daily Rate ($) *</Label>
                    <Input
                      id="dailyRate"
                      type="number"
                      step="0.01"
                      {...register('dailyRate')}
                      placeholder="25.00"
                      data-testid="input-daily-rate"
                    />
                    {errors.dailyRate && (
                      <p className="text-sm text-destructive mt-1">{errors.dailyRate.message}</p>
                    )}
                  </div>
                  
                  <div>
                    <Label htmlFor="securityDeposit">Security Deposit ($) *</Label>
                    <Input
                      id="securityDeposit"
                      type="number"
                      step="0.01"
                      {...register('securityDeposit')}
                      placeholder="100.00"
                      data-testid="input-security-deposit"
                    />
                    {errors.securityDeposit && (
                      <p className="text-sm text-destructive mt-1">{errors.securityDeposit.message}</p>
                    )}
                  </div>
                </div>

                <div>
                  <Label htmlFor="specifications">Specifications (JSON format)</Label>
                  <Textarea
                    id="specifications"
                    {...register('specifications')}
                    placeholder='{"capacity": "18 cu ft", "weight": "45 lbs"}'
                    className="min-h-[60px] font-mono text-sm"
                    data-testid="textarea-specifications"
                  />
                </div>

                <div>
                  <Label htmlFor="compatibleCars">Compatible Cars (comma-separated)</Label>
                  <Textarea
                    id="compatibleCars"
                    {...register('compatibleCars')}
                    placeholder="Honda CR-V, Toyota RAV4, Nissan Rogue"
                    className="min-h-[60px]"
                    data-testid="textarea-compatible-cars"
                  />
                </div>

                <div>
                  <Label htmlFor="images">Image URLs (comma-separated)</Label>
                  <Textarea
                    id="images"
                    {...register('images')}
                    placeholder="https://example.com/image1.jpg, https://example.com/image2.jpg"
                    className="min-h-[60px]"
                    data-testid="textarea-images"
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="available"
                    {...register('available')}
                    className="rounded border-gray-300"
                    data-testid="checkbox-available"
                  />
                  <Label htmlFor="available">Available for rent</Label>
                </div>

                <div className="flex gap-2 pt-4">
                  <Button
                    type="submit"
                    disabled={createProductMutation.isPending || updateProductMutation.isPending}
                    className="btn-primary"
                    data-testid="button-save-product"
                  >
                    {editingProduct ? 'Update Product' : 'Create Product'}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      setIsCreateDialogOpen(false);
                      setEditingProduct(null);
                      reset();
                    }}
                    data-testid="button-cancel-product"
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Products Table */}
      <Card>
        <CardHeader>
          <CardTitle>Products ({filteredProducts.length || 0})</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="space-y-4">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="h-16 bg-muted rounded"></div>
                </div>
              ))}
            </div>
          ) : !filteredProducts || filteredProducts.length === 0 ? (
            <div className="text-center py-12">
              <Car className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No Products</h3>
              <p className="text-muted-foreground mb-6">
                Start by adding your first rental product.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Product</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Daily Rate</TableHead>
                    <TableHead>Deposit</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredProducts.map((product) => {
                    const IconComponent = getProductIcon(product.category);
                    return (
                      <TableRow key={product.id} data-testid={`row-product-${product.id}`} className={!product.available ? "opacity-60" : ""}>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <IconComponent className="h-5 w-5 text-muted-foreground" />
                            <div>
                              <div className="font-medium" data-testid={`text-product-name-${product.id}`}>
                                {product.name}
                              </div>
                              <div className="text-sm text-muted-foreground line-clamp-1">
                                {product.description}
                              </div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" data-testid={`badge-category-${product.id}`}>
                            {product.category === 'cargo_box' ? 'Roof Box' : 'Bike Carrier'}
                          </Badge>
                        </TableCell>
                        <TableCell data-testid={`text-daily-rate-${product.id}`}>
                          ${product.dailyRate}
                        </TableCell>
                        <TableCell data-testid={`text-deposit-${product.id}`}>
                          ${product.securityDeposit}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Badge 
                              variant={product.available ? "default" : "secondary"}
                              data-testid={`badge-status-${product.id}`}
                            >
                              {product.available ? 'Available' : 'Disabled'}
                            </Badge>
                            {!product.available && (
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => toggleProductAvailability.mutate({ id: product.id, available: true })}
                                disabled={toggleProductAvailability.isPending}
                                data-testid={`button-enable-${product.id}`}
                                title="Enable this product"
                              >
                                <RefreshCw className="h-3 w-3 text-green-600" />
                              </Button>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleEdit(product)}
                              data-testid={`button-edit-${product.id}`}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            {product.available ? (
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => toggleProductAvailability.mutate({ id: product.id, available: false })}
                                disabled={toggleProductAvailability.isPending}
                                data-testid={`button-disable-${product.id}`}
                                title="Disable this product"
                              >
                                <ToggleLeft className="h-4 w-4 text-orange-600" />
                              </Button>
                            ) : (
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleDelete(product.id)}
                                disabled={deleteProductMutation.isPending}
                                data-testid={`button-delete-${product.id}`}
                                title="Permanently delete this product"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}