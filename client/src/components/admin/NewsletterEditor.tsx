import { useQuery, useMutation } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { Mail, Calendar, Send } from "lucide-react";
import type { NewsletterSubscriber } from "@shared/schema";

export default function NewsletterEditor() {
  const { toast } = useToast();

  const { data: subscribers = [], isLoading } = useQuery<NewsletterSubscriber[]>({
    queryKey: ["/api/newsletter/subscribers"],
  });

  const sendNewsletterMutation = useMutation({
    mutationFn: async () => {
      return await apiRequest("/api/newsletter/send", {
        method: "POST",
      });
    },
    onSuccess: (data: any) => {
      toast({
        title: "Newsletter sent!",
        description: data.message || "Newsletter has been sent to all active subscribers.",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/newsletter/subscribers"] });
    },
    onError: (error: Error) => {
      toast({
        title: "Failed to send newsletter",
        description: error.message || "Please try again later.",
        variant: "destructive",
      });
    },
  });

  const activeSubscribers = subscribers.filter(s => s.status === 'active');

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-muted-foreground">Loading subscribers...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Card data-testid="card-newsletter-overview">
        <CardHeader>
          <CardTitle>Newsletter Management</CardTitle>
          <CardDescription>
            Manage your newsletter subscribers and send weekly blog updates
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Mail className="w-5 h-5" />
                <span className="text-sm font-medium">Total Subscribers</span>
              </div>
              <p className="text-3xl font-bold" data-testid="text-total-subscribers">
                {subscribers.length}
              </p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Calendar className="w-5 h-5" />
                <span className="text-sm font-medium">Active Subscribers</span>
              </div>
              <p className="text-3xl font-bold text-green-600 dark:text-green-400" data-testid="text-active-subscribers">
                {activeSubscribers.length}
              </p>
            </div>

            <div className="flex items-center">
              <Button
                onClick={() => sendNewsletterMutation.mutate()}
                disabled={sendNewsletterMutation.isPending || activeSubscribers.length === 0}
                className="w-full"
                data-testid="button-send-newsletter"
              >
                <Send className="w-4 h-4 mr-2" />
                {sendNewsletterMutation.isPending ? "Sending..." : "Send Newsletter Now"}
              </Button>
            </div>
          </div>

          {activeSubscribers.length === 0 && (
            <div className="mt-6 p-4 bg-muted rounded-lg">
              <p className="text-sm text-muted-foreground text-center">
                No active subscribers yet. Subscribers will appear here when users sign up via the website footer.
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {activeSubscribers.length > 0 && (
        <Card data-testid="card-subscriber-list">
          <CardHeader>
            <CardTitle>Active Subscribers</CardTitle>
            <CardDescription>
              {activeSubscribers.length} {activeSubscribers.length === 1 ? 'person' : 'people'} subscribed to your newsletter
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {activeSubscribers.map((subscriber, index) => (
                <div
                  key={subscriber.id}
                  className="flex items-center justify-between p-4 bg-muted/50 rounded-lg"
                  data-testid={`subscriber-${index}`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                      <Mail className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium" data-testid={`text-subscriber-email-${index}`}>
                        {subscriber.email}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Subscribed {new Date(subscriber.subscribedAt).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      <Card data-testid="card-newsletter-info">
        <CardHeader>
          <CardTitle>About Weekly Newsletters</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4 text-sm text-muted-foreground">
            <p>
              <strong className="text-foreground">How it works:</strong> When you click "Send Newsletter Now", 
              all active subscribers will receive an email featuring your latest blog posts.
            </p>
            <p>
              <strong className="text-foreground">What's included:</strong> The newsletter showcases up to 
              5 of your most recent blog articles with titles, excerpts, and direct links to read more.
            </p>
            <p>
              <strong className="text-foreground">Best practice:</strong> Send newsletters once per week 
              after publishing new blog content to keep your audience engaged.
            </p>
            <p className="text-xs italic">
              Note: Subscriber data is stored in memory and will reset when the server restarts. 
              Consider upgrading to a database for production use.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
