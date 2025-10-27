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
import { insertTherapySchema, type InsertTherapy, type Therapy } from "@shared/schema";
import { queryClient, apiRequest } from "@/lib/queryClient";
import { Loader2, Plus, Pencil, Trash2 } from "lucide-react";

interface FAQ {
  question: string;
  answer: string;
}

export default function TherapysEditor() {
  const { toast } = useToast();
  const [editingTherapy, setEditingTherapy] = useState<Therapy | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const { data: therapys, isLoading } = useQuery<Therapy[]>({
    queryKey: ["/api/therapies"],
  });

  const form = useForm<InsertTherapy>({
    resolver: zodResolver(insertTherapySchema),
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
      order: therapys?.length ? therapys.length + 1 : 1,
    },
  });

  const createMutation = useMutation({
    mutationFn: async (data: InsertTherapy) => {
      return apiRequest("POST", "/api/therapies", data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/therapies"] });
      toast({ title: "Success", description: "Therapy created successfully" });
      setIsDialogOpen(false);
      form.reset();
    },
    onError: (error: Error) => {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    },
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<InsertTherapy> }) => {
      return apiRequest("PUT", `/api/therapies/${id}`, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/therapies"] });
      toast({ title: "Success", description: "Therapy updated successfully" });
      setIsDialogOpen(false);
      setEditingTherapy(null);
      form.reset();
    },
    onError: (error: Error) => {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      return apiRequest("DELETE", `/api/therapies/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/therapies"] });
      toast({ title: "Success", description: "Therapy deleted successfully" });
    },
    onError: (error: Error) => {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    },
  });

  const onSubmit = (data: InsertTherapy) => {
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

    if (editingTherapy) {
      updateMutation.mutate({ id: editingTherapy.id, data });
    } else {
      createMutation.mutate(data);
    }
  };

  const handleEdit = (therapy: Therapy) => {
    setEditingTherapy(therapy);
    form.reset({
      title: therapy.title,
      shortDescription: therapy.shortDescription,
      icon: therapy.icon,
      slug: therapy.slug,
      pageTitle: therapy.pageTitle,
      heroTitle: therapy.heroTitle,
      heroDescription: therapy.heroDescription,
      description: therapy.description,
      whoCanBenefit: therapy.whoCanBenefit,
      whatToExpect: therapy.whatToExpect,
      faqs: therapy.faqs,
      order: therapy.order,
    });
    setIsDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this therapy?")) {
      deleteMutation.mutate(id);
    }
  };

  const handleDialogChange = (open: boolean) => {
    setIsDialogOpen(open);
    if (!open) {
      setEditingTherapy(null);
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
        order: therapys?.length ? therapys.length + 1 : 1,
      });
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="h-8 w-8 animate-spin" data-testid="loader-therapys" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Therapy Services</h2>
          <p className="text-muted-foreground">Manage therapy services and their landing pages</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={handleDialogChange}>
          <DialogTrigger asChild>
            <Button data-testid="button-add-therapy">
              <Plus className="h-4 w-4 mr-2" />
              Add Therapy
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingTherapy ? "Edit Therapy" : "Add New Therapy"}</DialogTitle>
              <DialogDescription>
                {editingTherapy ? "Update therapy details" : "Create a new therapy service with its landing page"}
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
                        <Input {...field} placeholder="Bipolar Disorder Therapy" data-testid="input-title" />
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
                          <Input {...field} placeholder="bipolar-disorder-therapy" data-testid="input-slug" />
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
                        <Input {...field} placeholder="Bipolar Disorder Therapy in Winter Park, FL | Empathy Health" data-testid="input-page-title" />
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
                      <FormDescription>Main heading on therapy page</FormDescription>
                      <FormControl>
                        <Input {...field} placeholder="Expert Bipolar Disorder Therapy" data-testid="input-hero-title" />
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
                      <FormDescription>Detailed therapy overview</FormDescription>
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
                        <Textarea {...field} placeholder="Our therapy helps individuals experiencing..." data-testid="input-who-can-benefit" rows={3} />
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
                      <FormDescription>Therapy process and approach</FormDescription>
                      <FormControl>
                        <Textarea {...field} placeholder="Therapy begins with..." data-testid="input-what-to-expect" rows={3} />
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
                          placeholder='[{"question": "How long does therapy take?", "answer": "..."}]' 
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
                    data-testid="button-submit-therapy"
                  >
                    {createMutation.isPending || updateMutation.isPending ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        Saving...
                      </>
                    ) : (
                      <>{editingTherapy ? "Update" : "Create"} Therapy</>
                    )}
                  </Button>
                </div>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4">
        {therapys?.map((therapy) => (
          <Card key={therapy.id}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <CardTitle>{therapy.title}</CardTitle>
                  <CardDescription>/{therapy.slug}</CardDescription>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handleEdit(therapy)}
                    data-testid={`button-edit-${therapy.id}`}
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handleDelete(therapy.id)}
                    disabled={deleteMutation.isPending}
                    data-testid={`button-delete-${therapy.id}`}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm">
                <p className="text-muted-foreground">{therapy.shortDescription}</p>
                <div className="flex gap-4 text-xs text-muted-foreground">
                  <span>Icon: {therapy.icon}</span>
                  <span>Order: {therapy.order}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
