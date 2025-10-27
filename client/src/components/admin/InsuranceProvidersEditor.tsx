import { useQuery, useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { insertInsuranceProviderSchema, type InsertInsuranceProvider, type InsuranceProvider } from "@shared/schema";
import { queryClient, apiRequest } from "@/lib/queryClient";
import { Loader2, Plus, Pencil, Trash2 } from "lucide-react";

export default function InsuranceProvidersEditor() {
  const { toast } = useToast();
  const [editingProvider, setEditingProvider] = useState<InsuranceProvider | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const { data: providers, isLoading } = useQuery<InsuranceProvider[]>({
    queryKey: ["/api/insurance-providers"],
  });

  const form = useForm<InsertInsuranceProvider>({
    resolver: zodResolver(insertInsuranceProviderSchema),
    defaultValues: {
      name: "",
      logo: "",
      slug: "",
      pageTitle: "",
      heroTitle: "",
      heroDescription: "",
      description: "",
      coverageDetails: "",
      faqs: "[]",
      order: providers?.length ? providers.length + 1 : 1,
    },
  });

  const createMutation = useMutation({
    mutationFn: async (data: InsertInsuranceProvider) => {
      return apiRequest("POST", "/api/insurance-providers", data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/insurance-providers"] });
      toast({ title: "Success", description: "Insurance provider added successfully" });
      setIsDialogOpen(false);
      form.reset();
    },
    onError: (error: Error) => {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    },
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<InsuranceProvider> }) => {
      return apiRequest("PUT", `/api/insurance-providers/${id}`, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/insurance-providers"] });
      toast({ title: "Success", description: "Insurance provider updated successfully" });
      setIsDialogOpen(false);
      setEditingProvider(null);
      form.reset();
    },
    onError: (error: Error) => {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      return apiRequest("DELETE", `/api/insurance-providers/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/insurance-providers"] });
      toast({ title: "Success", description: "Insurance provider removed successfully" });
    },
    onError: (error: Error) => {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    },
  });

  const handleEdit = (provider: InsuranceProvider) => {
    setEditingProvider(provider);
    form.reset(provider);
    setIsDialogOpen(true);
  };

  const handleSubmit = (data: InsertInsuranceProvider) => {
    if (editingProvider) {
      updateMutation.mutate({ id: editingProvider.id, data });
    } else {
      createMutation.mutate(data);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-semibold">Insurance Providers</h2>
          <p className="text-muted-foreground">Manage accepted insurance</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => { setEditingProvider(null); form.reset(); }} data-testid="button-add-provider">
              <Plus className="w-4 h-4 mr-2" />
              Add Provider
            </Button>
          </DialogTrigger>
          <DialogContent className="max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingProvider ? "Edit Provider" : "Add Provider"}</DialogTitle>
              <DialogDescription>
                {editingProvider ? "Update provider information and page content" : "Add a new insurance provider with page details"}
              </DialogDescription>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Provider Name</FormLabel>
                      <FormControl>
                        <Input {...field} data-testid="input-provider-name" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="logo"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Logo Path</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="/attached_assets/insurance/logo.png" data-testid="input-provider-logo" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="slug"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>URL Slug</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="aetna-aetna-coverage" data-testid="input-provider-slug" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="pageTitle"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Page Title (SEO)</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Find a Psychiatrist That Accepts..." data-testid="input-provider-page-title" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="heroTitle"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Hero Title</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Main heading for provider page" data-testid="input-provider-hero-title" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="heroDescription"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Hero Description</FormLabel>
                      <FormControl>
                        <Textarea {...field} placeholder="Introductory paragraph for provider page" rows={3} data-testid="input-provider-hero-description" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Description</FormLabel>
                      <FormControl>
                        <Textarea {...field} placeholder="Detailed description of the provider partnership and services..." rows={4} data-testid="input-provider-description" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="coverageDetails"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Coverage Details</FormLabel>
                      <FormControl>
                        <Textarea {...field} placeholder="Information about coverage, copays, plans accepted..." rows={4} data-testid="input-provider-coverage-details" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="faqs"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>FAQs (JSON format)</FormLabel>
                      <FormControl>
                        <Textarea 
                          {...field} 
                          placeholder='[{"question": "Q1?", "answer": "A1"}, {"question": "Q2?", "answer": "A2"}]' 
                          rows={6} 
                          className="font-mono text-sm"
                          data-testid="input-provider-faqs" 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="order"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Display Order</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          {...field}
                          onChange={(e) => field.onChange(parseInt(e.target.value))}
                          data-testid="input-provider-order"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  type="submit"
                  disabled={createMutation.isPending || updateMutation.isPending}
                  data-testid="button-save-provider"
                >
                  {(createMutation.isPending || updateMutation.isPending) && (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  {editingProvider ? "Update" : "Create"}
                </Button>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {providers?.map((provider) => (
          <Card key={provider.id}>
            <CardHeader>
              <CardTitle className="flex items-center justify-between text-base">
                <span className="line-clamp-2">{provider.name}</span>
                <div className="flex gap-2 flex-shrink-0">
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={() => handleEdit(provider)}
                    data-testid={`button-edit-provider-${provider.id}`}
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={() => deleteMutation.mutate(provider.id)}
                    data-testid={`button-delete-provider-${provider.id}`}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardTitle>
              <CardDescription>Order: {provider.order}</CardDescription>
            </CardHeader>
          </Card>
        ))}
      </div>
    </div>
  );
}
