import { useQuery, useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { insertSiteContentSchema, type InsertSiteContent } from "@shared/schema";
import { queryClient, apiRequest } from "@/lib/queryClient";
import { Loader2 } from "lucide-react";

export default function SiteContentEditor() {
  const { toast } = useToast();

  const { data: content, isLoading } = useQuery({
    queryKey: ["/api/site-content"],
  });

  const form = useForm<InsertSiteContent>({
    resolver: zodResolver(insertSiteContentSchema),
    values: content || undefined,
  });

  const updateMutation = useMutation({
    mutationFn: async (data: InsertSiteContent) => {
      return apiRequest("/api/site-content", {
        method: "PUT",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/site-content"] });
      toast({
        title: "Success",
        description: "Site content updated successfully",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Site Content</CardTitle>
        <CardDescription>Edit hero section and footer information</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit((data) => updateMutation.mutate(data))} className="space-y-6">
            <FormField
              control={form.control}
              name="heroTitle"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Hero Title</FormLabel>
                  <FormControl>
                    <Input {...field} data-testid="input-hero-title" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="heroSubtitle"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Hero Subtitle</FormLabel>
                  <FormControl>
                    <Textarea {...field} data-testid="input-hero-subtitle" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="heroImage"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Hero Image Path</FormLabel>
                  <FormControl>
                    <Input {...field} data-testid="input-hero-image" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="reviewCount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Review Count</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        {...field}
                        onChange={(e) => field.onChange(parseInt(e.target.value))}
                        data-testid="input-review-count"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="reviewRating"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Review Rating Text</FormLabel>
                    <FormControl>
                      <Input {...field} data-testid="input-review-rating" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <FormField
                control={form.control}
                name="footerPhone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Footer Phone</FormLabel>
                    <FormControl>
                      <Input {...field} data-testid="input-footer-phone" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="footerEmail"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Footer Email</FormLabel>
                    <FormControl>
                      <Input type="email" {...field} data-testid="input-footer-email" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="footerAddress"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Footer Address</FormLabel>
                    <FormControl>
                      <Input {...field} data-testid="input-footer-address" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="aboutText"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>About Text</FormLabel>
                  <FormControl>
                    <Textarea {...field} rows={4} data-testid="input-about-text" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" disabled={updateMutation.isPending} data-testid="button-save-site-content">
              {updateMutation.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Save Changes
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
