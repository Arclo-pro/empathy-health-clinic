import { useQuery, useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { insertConditionSchema, type InsertCondition, type Condition } from "@shared/schema";
import { queryClient, apiRequest } from "@/lib/queryClient";
import { Loader2, Plus, Pencil, Trash2 } from "lucide-react";

export default function ConditionsEditor() {
  const { toast } = useToast();
  const [editingCondition, setEditingCondition] = useState<Condition | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const { data: conditions, isLoading } = useQuery<Condition[]>({
    queryKey: ["/api/conditions"],
  });

  const form = useForm<InsertCondition>({
    resolver: zodResolver(insertConditionSchema),
    defaultValues: {
      description: "",
      order: conditions?.length ? conditions.length + 1 : 1,
    },
  });

  const createMutation = useMutation({
    mutationFn: async (data: InsertCondition) => {
      return apiRequest("/api/conditions", {
        method: "POST",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/conditions"] });
      toast({ title: "Success", description: "Condition added successfully" });
      setIsDialogOpen(false);
      form.reset();
    },
    onError: (error: Error) => {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    },
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<InsertCondition> }) => {
      return apiRequest(`/api/conditions/${id}`, {
        method: "PUT",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/conditions"] });
      toast({ title: "Success", description: "Condition updated successfully" });
      setIsDialogOpen(false);
      setEditingCondition(null);
      form.reset();
    },
    onError: (error: Error) => {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      return apiRequest(`/api/conditions/${id}`, { method: "DELETE" });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/conditions"] });
      toast({ title: "Success", description: "Condition removed successfully" });
    },
    onError: (error: Error) => {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    },
  });

  const handleEdit = (condition: Condition) => {
    setEditingCondition(condition);
    form.reset(condition);
    setIsDialogOpen(true);
  };

  const handleSubmit = (data: InsertCondition) => {
    if (editingCondition) {
      updateMutation.mutate({ id: editingCondition.id, data });
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
          <h2 className="text-2xl font-semibold">Conditions We Treat</h2>
          <p className="text-muted-foreground">Manage conditions list</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => { setEditingCondition(null); form.reset(); }} data-testid="button-add-condition">
              <Plus className="w-4 h-4 mr-2" />
              Add Condition
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{editingCondition ? "Edit Condition" : "Add Condition"}</DialogTitle>
              <DialogDescription>
                {editingCondition ? "Update condition description" : "Add a new condition"}
              </DialogDescription>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea {...field} rows={3} data-testid="input-condition-description" />
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
                      <FormLabel>Order</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          {...field}
                          onChange={(e) => field.onChange(parseInt(e.target.value))}
                          data-testid="input-condition-order"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  type="submit"
                  disabled={createMutation.isPending || updateMutation.isPending}
                  data-testid="button-save-condition"
                >
                  {(createMutation.isPending || updateMutation.isPending) && (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  {editingCondition ? "Update" : "Create"}
                </Button>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="space-y-3">
        {conditions?.map((condition) => (
          <Card key={condition.id}>
            <CardHeader>
              <CardTitle className="flex items-start justify-between">
                <span className="text-base flex-1">{condition.description}</span>
                <div className="flex gap-2 flex-shrink-0">
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={() => handleEdit(condition)}
                    data-testid={`button-edit-condition-${condition.id}`}
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={() => deleteMutation.mutate(condition.id)}
                    data-testid={`button-delete-condition-${condition.id}`}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardTitle>
              <CardDescription>Order: {condition.order}</CardDescription>
            </CardHeader>
          </Card>
        ))}
      </div>
    </div>
  );
}
