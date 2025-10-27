import { useQuery, useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from "@/components/ui/form";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { insertTreatmentSchema, type InsertTreatment, type Treatment } from "@shared/schema";
import { queryClient, apiRequest } from "@/lib/queryClient";
import { Loader2, Plus, Pencil, Trash2 } from "lucide-react";

interface FAQ {
  question: string;
  answer: string;
}

export default function TreatmentsEditor() {
  const { toast } = useToast();
  const [editingTreatment, setEditingTreatment] = useState<Treatment | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const { data: treatments, isLoading } = useQuery<Treatment[]>({
    queryKey: ["/api/treatments"],
  });

  const form = useForm<InsertTreatment>({
    resolver: zodResolver(insertTreatmentSchema),
    defaultValues: {
      title: "",
      shortDescription: "",
      icon: "Brain",
      slug: "",
      pageTitle: "",
      heroTitle: "",
      heroDescription: "",
      description: "",
      whoCanBenefit: "",
      whatToExpect: "",
      faqs: "[]",
      order: treatments?.length ? treatments.length + 1 : 1,
    },
  });

  const createMutation = useMutation({
    mutationFn: async (data: InsertTreatment) => {
      return apiRequest("POST", "/api/treatments", data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/treatments"] });
      toast({ title: "Success", description: "Treatment created successfully" });
      setIsDialogOpen(false);
      form.reset();
    },
    onError: (error: Error) => {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    },
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<InsertTreatment> }) => {
      return apiRequest("PUT", `/api/treatments/${id}`, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/treatments"] });
      toast({ title: "Success", description: "Treatment updated successfully" });
      setIsDialogOpen(false);
      setEditingTreatment(null);
      form.reset();
    },
    onError: (error: Error) => {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      return apiRequest("DELETE", `/api/treatments/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/treatments"] });
      toast({ title: "Success", description: "Treatment deleted successfully" });
    },
    onError: (error: Error) => {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    },
  });

  const onSubmit = (data: InsertTreatment) => {
    try {
      JSON.parse(data.faqs || '[]');
    } catch {
      toast({
        title: "Invalid FAQs",
        description: "FAQs must be valid JSON. Example: [{'question': 'Q?', 'answer': 'A'}]",
        variant: "destructive",
      });
      return;
    }

    if (editingTreatment) {
      updateMutation.mutate({ id: editingTreatment.id, data });
    } else {
      createMutation.mutate(data);
    }
  };

  const handleEdit = (treatment: Treatment) => {
    setEditingTreatment(treatment);
    form.reset({
      title: treatment.title,
      shortDescription: treatment.shortDescription,
      icon: treatment.icon,
      slug: treatment.slug,
      pageTitle: treatment.pageTitle,
      heroTitle: treatment.heroTitle,
      heroDescription: treatment.heroDescription,
      description: treatment.description,
      whoCanBenefit: treatment.whoCanBenefit,
      whatToExpect: treatment.whatToExpect,
      faqs: treatment.faqs,
      order: treatment.order,
    });
    setIsDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this treatment?")) {
      deleteMutation.mutate(id);
    }
  };

  const handleDialogChange = (open: boolean) => {
    setIsDialogOpen(open);
    if (!open) {
      setEditingTreatment(null);
      form.reset({
        title: "",
        shortDescription: "",
        icon: "Brain",
        slug: "",
        pageTitle: "",
        heroTitle: "",
        heroDescription: "",
        description: "",
        whoCanBenefit: "",
        whatToExpect: "",
        faqs: "[]",
        order: treatments?.length ? treatments.length + 1 : 1,
      });
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="h-8 w-8 animate-spin" data-testid="loader-treatments" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Treatment Services</h2>
          <p className="text-muted-foreground">Manage treatment services and their landing pages</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={handleDialogChange}>
          <DialogTrigger asChild>
            <Button data-testid="button-add-treatment">
              <Plus className="h-4 w-4 mr-2" />
              Add Treatment
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingTreatment ? "Edit Treatment" : "Add New Treatment"}</DialogTitle>
              <DialogDescription>
                {editingTreatment ? "Update treatment details" : "Create a new treatment service with its landing page"}
              </DialogDescription>
            </DialogHeader>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Title</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Bipolar Disorder Treatment" data-testid="input-title" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="shortDescription"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Short Description</FormLabel>
                      <FormDescription>Brief description shown on cards (1-2 sentences)</FormDescription>
                      <FormControl>
                        <Textarea {...field} placeholder="Personalized plans to stabilize mood..." data-testid="input-short-description" rows={2} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="icon"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Icon</FormLabel>
                        <FormDescription>Lucide icon name</FormDescription>
                        <FormControl>
                          <Input {...field} placeholder="Brain" data-testid="input-icon" />
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
                        <FormDescription>For SEO-friendly URL</FormDescription>
                        <FormControl>
                          <Input {...field} placeholder="bipolar-disorder-treatment" data-testid="input-slug" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="pageTitle"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Page Title (SEO)</FormLabel>
                      <FormDescription>Appears in browser tab and search results</FormDescription>
                      <FormControl>
                        <Input {...field} placeholder="Bipolar Disorder Treatment in Winter Park, FL | Empathy Health" data-testid="input-page-title" />
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
                      <FormLabel>Hero Section Title</FormLabel>
                      <FormDescription>Main heading on treatment page</FormDescription>
                      <FormControl>
                        <Input {...field} placeholder="Expert Bipolar Disorder Treatment" data-testid="input-hero-title" />
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
                      <FormDescription>Subtitle in hero section (2-3 sentences)</FormDescription>
                      <FormControl>
                        <Textarea {...field} placeholder="Comprehensive psychiatric care..." data-testid="input-hero-description" rows={3} />
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
                      <FormDescription>Detailed treatment overview</FormDescription>
                      <FormControl>
                        <Textarea {...field} placeholder="At Empathy Health Clinic, we understand..." data-testid="input-description" rows={4} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="whoCanBenefit"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Who Can Benefit</FormLabel>
                      <FormDescription>Target audience and symptoms addressed</FormDescription>
                      <FormControl>
                        <Textarea {...field} placeholder="Our treatment helps individuals experiencing..." data-testid="input-who-can-benefit" rows={3} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="whatToExpect"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>What to Expect</FormLabel>
                      <FormDescription>Treatment process and approach</FormDescription>
                      <FormControl>
                        <Textarea {...field} placeholder="Treatment begins with..." data-testid="input-what-to-expect" rows={3} />
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
                      <FormLabel>FAQs (JSON)</FormLabel>
                      <FormDescription>Array of FAQ objects: {`[{"question": "...", "answer": "..."}]`}</FormDescription>
                      <FormControl>
                        <Textarea 
                          {...field} 
                          placeholder='[{"question": "How long does treatment take?", "answer": "..."}]' 
                          data-testid="input-faqs" 
                          rows={4} 
                          className="font-mono text-sm"
                          onBlur={(e) => {
                            field.onBlur();
                            try {
                              const parsed = JSON.parse(e.target.value);
                              const formatted = JSON.stringify(parsed, null, 2);
                              field.onChange(formatted);
                            } catch {
                              // Keep invalid JSON as-is for user to fix
                            }
                          }}
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
                          {...field}
                          type="number"
                          onChange={(e) => field.onChange(parseInt(e.target.value))}
                          data-testid="input-order"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex justify-end gap-2 pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => handleDialogChange(false)}
                    data-testid="button-cancel"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    disabled={createMutation.isPending || updateMutation.isPending}
                    data-testid="button-submit-treatment"
                  >
                    {createMutation.isPending || updateMutation.isPending ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        Saving...
                      </>
                    ) : (
                      <>{editingTreatment ? "Update" : "Create"} Treatment</>
                    )}
                  </Button>
                </div>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4">
        {treatments?.map((treatment) => (
          <Card key={treatment.id}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <CardTitle>{treatment.title}</CardTitle>
                  <CardDescription>/{treatment.slug}</CardDescription>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handleEdit(treatment)}
                    data-testid={`button-edit-${treatment.id}`}
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handleDelete(treatment.id)}
                    disabled={deleteMutation.isPending}
                    data-testid={`button-delete-${treatment.id}`}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm">
                <p className="text-muted-foreground">{treatment.shortDescription}</p>
                <div className="flex gap-4 text-xs text-muted-foreground">
                  <span>Icon: {treatment.icon}</span>
                  <span>Order: {treatment.order}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
