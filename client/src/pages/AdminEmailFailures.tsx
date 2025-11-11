import { useQuery, useMutation } from "@tanstack/react/query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AlertCircle, CheckCircle, RefreshCw } from "lucide-react";
import { queryClient, apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

interface EmailFailure {
  id: string;
  leadId: string | null;
  emailType: string;
  recipientEmail: string;
  errorMessage: string;
  errorDetails: string | null;
  retryCount: number;
  lastRetryAt: string | null;
  resolved: boolean;
  createdAt: string;
  resolvedAt: string | null;
}

export default function AdminEmailFailures() {
  const { toast } = useToast();

  const { data: unresolvedFailures = [], isLoading: loadingUnresolved } = useQuery<EmailFailure[]>({
    queryKey: ["/api/email-failures?resolved=false"],
  });

  const { data: resolvedFailures = [], isLoading: loadingResolved } = useQuery<EmailFailure[]>({
    queryKey: ["/api/email-failures?resolved=true"],
  });

  const retryMutation = useMutation({
    mutationFn: async (id: string) => {
      return apiRequest("POST", `/api/email-failures/${id}/retry`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/email-failures"] });
      toast({
        title: "Email Retry Successful",
        description: "The email has been resent successfully.",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Retry Failed",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const resolveMutation = useMutation({
    mutationFn: async (id: string) => {
      return apiRequest("POST", `/api/email-failures/${id}/resolve`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/email-failures"] });
      toast({
        title: "Email Failure Resolved",
        description: "The failure has been marked as resolved.",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Resolve Failed",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  const renderFailureCard = (failure: EmailFailure) => (
    <Card key={failure.id} className="mb-4">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-lg flex items-center gap-2">
              {failure.resolved ? (
                <CheckCircle className="h-5 w-5 text-green-600" />
              ) : (
                <AlertCircle className="h-5 w-5 text-red-600" />
              )}
              {failure.emailType.replace(/_/g, " ").toUpperCase()}
            </CardTitle>
            <CardDescription className="mt-1">
              Recipient: {failure.recipientEmail}
            </CardDescription>
          </div>
          <Badge variant={failure.resolved ? "secondary" : "destructive"}>
            {failure.resolved ? "Resolved" : "Unresolved"}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div>
            <p className="text-sm font-medium text-muted-foreground">Error Message:</p>
            <p className="text-sm mt-1 font-mono bg-muted p-2 rounded">
              {failure.errorMessage}
            </p>
          </div>

          {failure.leadId && (
            <div>
              <p className="text-sm font-medium text-muted-foreground">Lead ID:</p>
              <p className="text-sm mt-1">{failure.leadId}</p>
            </div>
          )}

          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Created:</p>
              <p className="text-sm mt-1">{formatDate(failure.createdAt)}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Retry Count:</p>
              <p className="text-sm mt-1">{failure.retryCount}</p>
            </div>
          </div>

          {failure.lastRetryAt && (
            <div>
              <p className="text-sm font-medium text-muted-foreground">Last Retry:</p>
              <p className="text-sm mt-1">{formatDate(failure.lastRetryAt)}</p>
            </div>
          )}

          {failure.resolvedAt && (
            <div>
              <p className="text-sm font-medium text-muted-foreground">Resolved:</p>
              <p className="text-sm mt-1">{formatDate(failure.resolvedAt)}</p>
            </div>
          )}

          {!failure.resolved && (
            <div className="flex gap-2 pt-2">
              <Button
                size="sm"
                onClick={() => retryMutation.mutate(failure.id)}
                disabled={retryMutation.isPending}
                data-testid={`button-retry-${failure.id}`}
              >
                <RefreshCw className={`h-4 w-4 mr-2 ${retryMutation.isPending ? "animate-spin" : ""}`} />
                Retry Email
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => resolveMutation.mutate(failure.id)}
                disabled={resolveMutation.isPending}
                data-testid={`button-resolve-${failure.id}`}
              >
                <CheckCircle className="h-4 w-4 mr-2" />
                Mark Resolved
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="container mx-auto p-6 max-w-6xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Email Failure Monitor</h1>
        <p className="text-muted-foreground mt-2">
          Track and retry failed email notifications
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <Card className="mb-4 bg-red-50 dark:bg-red-950">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertCircle className="h-5 w-5 text-red-600" />
                Unresolved Failures ({unresolvedFailures.length})
              </CardTitle>
              <CardDescription>
                Email failures that need attention
              </CardDescription>
            </CardHeader>
          </Card>

          {loadingUnresolved ? (
            <p>Loading...</p>
          ) : unresolvedFailures.length === 0 ? (
            <Card>
              <CardContent className="py-8 text-center text-muted-foreground">
                No unresolved email failures! 🎉
              </CardContent>
            </Card>
          ) : (
            unresolvedFailures.map(renderFailureCard)
          )}
        </div>

        <div>
          <Card className="mb-4 bg-green-50 dark:bg-green-950">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-600" />
                Resolved Failures ({resolvedFailures.length})
              </CardTitle>
              <CardDescription>
                Successfully resolved email failures
              </CardDescription>
            </CardHeader>
          </Card>

          {loadingResolved ? (
            <p>Loading...</p>
          ) : resolvedFailures.length === 0 ? (
            <Card>
              <CardContent className="py-8 text-center text-muted-foreground">
                No resolved failures yet
              </CardContent>
            </Card>
          ) : (
            resolvedFailures.map(renderFailureCard)
          )}
        </div>
      </div>
    </div>
  );
}
