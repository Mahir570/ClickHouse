import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";

interface StatusDisplayProps {
  status: string;
  progress: number;
  recordsIngested: number;
}

export function StatusDisplay({
  status,
  progress,
  recordsIngested,
}: StatusDisplayProps) {
  return (
    <Card className="rounded-2xl shadow-sm border border-border bg-muted/20">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-semibold">Status and Results</CardTitle>
        <CardDescription className="text-sm text-muted-foreground">
          Current status and progress of the ingestion process
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label className="text-sm font-medium text-muted-foreground">Status</Label>
          <div className="p-2 rounded-lg bg-background border border-border text-sm font-medium text-foreground shadow-inner">
            {status}
          </div>
        </div>

        <div className="space-y-1">
          <div className="flex justify-between items-center">
            <Label className="text-sm font-medium text-muted-foreground">Progress</Label>
            <span className="text-xs font-semibold text-muted-foreground">
              {progress}%
            </span>
          </div>
          <Progress value={progress} className="h-2 rounded-full" />
        </div>

        {progress > 0 && (
          <div className="space-y-2">
            <Label className="text-sm font-medium text-muted-foreground">
              Records Ingested
            </Label>
            <div className="p-2 rounded-lg bg-background border border-border text-sm font-mono text-primary shadow-inner">
              {recordsIngested.toLocaleString()}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
