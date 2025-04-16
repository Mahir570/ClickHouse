import { ArrowRightLeft, Database, FileText } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface SourceTargetSelectorProps {
  source: string;
  target: string;
  onSourceChange: (value: string) => void;
  onTargetChange: (value: string) => void;
}

export function SourceTargetSelector({
  source,
  target,
  onSourceChange,
  onTargetChange,
}: SourceTargetSelectorProps) {
  return (
    <Card className="rounded-2xl shadow-sm border border-border bg-muted/20">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-lg font-semibold">
          <ArrowRightLeft className="h-5 w-5 text-primary" />
          Source and Target Selection
        </CardTitle>
        <CardDescription className="text-sm text-muted-foreground">
          Select the source and target for your data ingestion
        </CardDescription>
      </CardHeader>
      <CardContent className="grid md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="source" className="text-sm font-medium">
            Source
          </Label>
          <Select value={source} onValueChange={onSourceChange}>
            <SelectTrigger
              id="source"
              className="w-full bg-background border border-border px-3 py-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
            >
              <SelectValue placeholder="Select source" />
            </SelectTrigger>
            <SelectContent className="rounded-lg border border-border shadow-md">
              <SelectItem value="clickhouse">
                <div className="flex items-center gap-2">
                  <Database className="h-4 w-4 text-foreground" />
                  ClickHouse
                </div>
              </SelectItem>
              <SelectItem value="flatfile">
                <div className="flex items-center gap-2">
                  <FileText className="h-4 w-4 text-foreground" />
                  Flat File
                </div>
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="target" className="text-sm font-medium">
            Target
          </Label>
          <Select value={target} onValueChange={onTargetChange}>
            <SelectTrigger
              id="target"
              className="w-full bg-background border border-border px-3 py-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
            >
              <SelectValue placeholder="Select target" />
            </SelectTrigger>
            <SelectContent className="rounded-lg border border-border shadow-md">
              <SelectItem value="clickhouse">
                <div className="flex items-center gap-2">
                  <Database className="h-4 w-4 text-foreground" />
                  ClickHouse
                </div>
              </SelectItem>
              <SelectItem value="flatfile">
                <div className="flex items-center gap-2">
                  <FileText className="h-4 w-4 text-foreground" />
                  Flat File
                </div>
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  );
}
