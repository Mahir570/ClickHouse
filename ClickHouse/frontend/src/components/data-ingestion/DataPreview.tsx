import { Eye, Play, RefreshCw } from "lucide-react";
import { toast } from "sonner";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { apiService } from "@/lib/api";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface DataPreviewProps {
  previewData: any[];
  onPreviewData: () => void;
  onStartIngestion: () => void;
  onReset: () => void;
  isLoading: boolean;
  source: string;
  target: string;
  selectedTables: string[];
  selectedColumns: Record<string, string[]>;
  onDataFetched?: (data: any[]) => void;
  onIngestionComplete?: (recordCount: number) => void;
  selectedFile?: File | null;
}

export function DataPreview({
  previewData,
  onPreviewData,
  onStartIngestion,
  onReset,
  isLoading,
  source,
  target,
  selectedTables,
  selectedColumns,
  onDataFetched,
  onIngestionComplete,
  selectedFile,
}: DataPreviewProps) {
  const [targetTable, setTargetTable] = useState("");
  const [targetFile, setTargetFile] = useState("export.csv");
  const [uploadedFilePath, setUploadedFilePath] = useState<string | null>(null);

  const handlePreviewData = async () => {
    if (selectedTables.length === 0) {
      toast.warning("Warning", {
        description: "Please select at least one table to preview",
      });
      return;
    }

    if (
      !selectedColumns[selectedTables[0]] ||
      selectedColumns[selectedTables[0]].length === 0
    ) {
      toast.warning("Warning", {
        description: "Please select at least one column to preview",
      });
      return;
    }

    onPreviewData();

    try {
      // For now, we'll only preview the first selected table
      const table = selectedTables[0];
      const columns = selectedColumns[table];

      const data = await apiService.previewData(table, columns);
      if (onDataFetched) {
        onDataFetched(data);
      }

      toast.success("Preview Loaded", {
        description: `Loaded ${data.length} rows from ${table}`,
      });
    } catch (error) {
      // Error already handled by API service
    }
  };

  const handleStartIngestion = async () => {
    // Validate source data
    if (source === "clickhouse" && selectedTables.length === 0) {
      toast.warning("Warning", {
        description: "Please select at least one table to ingest",
      });
      return;
    }

    if (source === "flatfile" && !selectedFile) {
      toast.warning("Warning", {
        description: "Please upload a file first",
      });
      return;
    }

    // Validate target data
    if (target === "clickhouse" && !targetTable) {
      toast.warning("Warning", {
        description: "Please specify a target table name",
      });
      return;
    }

    onStartIngestion();

    try {
      // Get the file path if the source is a file
      let fileInfo: any = null;
      if (source === "flatfile" && selectedFile) {
        // Upload the file first if not already uploaded
        if (!uploadedFilePath) {
          const result = await apiService.uploadFile(selectedFile);
          if (result.success) {
            fileInfo = result.file;
            setUploadedFilePath(result.file.path);
          } else {
            throw new Error("Failed to upload file");
          }
        }
      }

      const result = await apiService.ingestData({
        source,
        target,
        tables: selectedTables,
        columns: selectedColumns,
        filePath: uploadedFilePath || fileInfo?.path || "",
        targetFile: target === "flatfile" ? targetFile : undefined,
        targetTable: target === "clickhouse" ? targetTable : undefined,
      });

      toast.success("Ingestion Complete", {
        description:
          result.message || `Processed ${result.records} records successfully`,
      });

      // Handle file download for flatfile target
      if (target === "flatfile" && result.filePath) {
        // Extract just the filename without path
        const safeFilename =
          result.filePath.split("/").pop()?.split("\\").pop() ||
          result.filePath;

        // Show download button
        toast.success("File Ready", {
          description: "Your export file is ready for download",
          action: {
            label: "Download",
            onClick: () => apiService.downloadFile(safeFilename),
          },
        });
      }

      if (onIngestionComplete) {
        onIngestionComplete(result.records);
      }
    } catch (error) {
      // Error already handled by API service
    }
  };

  return (
    <Card className="rounded-2xl shadow-lg border border-border bg-background">
  <CardHeader>
    <CardTitle className="text-xl font-semibold">
      Data Preview and Ingestion Controls
    </CardTitle>
    <CardDescription className="text-sm text-muted-foreground">
      Preview data and control the ingestion process
    </CardDescription>
  </CardHeader>
  <CardContent className="space-y-4">
    {/* Target Configuration */}
    {target === "clickhouse" && (
      <div className="space-y-1">
        <Label htmlFor="targetTable" className="text-sm font-medium">
          Target Table Name
        </Label>
        <Input
          id="targetTable"
          placeholder="Enter target table name"
          value={targetTable}
          onChange={(e) => setTargetTable(e.target.value)}
          className="rounded-md border bg-white"
        />
        {source === "flatfile" && selectedFile && (
          <p className="text-xs text-muted-foreground">
            File will be ingested into the table above.
          </p>
        )}
      </div>
    )}

    {target === "flatfile" && (
      <div className="space-y-1">
        <Label htmlFor="targetFile" className="text-sm font-medium">
          Export File Name
        </Label>
        <Input
          id="targetFile"
          placeholder="export.csv"
          value={targetFile}
          onChange={(e) => setTargetFile(e.target.value)}
          className="rounded-md border bg-white"
        />
        {!targetFile.toLowerCase().endsWith(".csv") && (
          <p className="text-xs text-yellow-600 font-medium">
            File name should end with `.csv`
          </p>
        )}
        <p className="text-xs text-muted-foreground">
          Exported file will contain selected data.
        </p>
      </div>
    )}

    {/* Button Controls */}
    <div className="flex flex-wrap gap-2 pt-2">
      {source === "clickhouse" && (
        <Button
          onClick={handlePreviewData}
          className="flex items-center gap-2"
          disabled={isLoading}
        >
          <Eye className="h-4 w-4" />
          {isLoading ? "Loading..." : "Preview Data"}
        </Button>
      )}
      <Button
        onClick={handleStartIngestion}
        className="flex items-center gap-2"
        disabled={isLoading}
      >
        <Play className="h-4 w-4" />
        {isLoading
          ? "Processing..."
          : source === "flatfile" && target === "clickhouse"
          ? "Send to ClickHouse"
          : source === "clickhouse" && target === "flatfile"
          ? "Export to CSV"
          : "Start Ingestion"}
      </Button>
      <Button
        onClick={onReset}
        variant="outline"
        className="flex items-center gap-2"
        disabled={isLoading}
      >
        <RefreshCw className="h-4 w-4" />
        Reset
      </Button>
    </div>

    {/* Preview Table */}
    {previewData.length > 0 && (
      <div className="border rounded-lg overflow-auto max-h-[300px]">
        <table className="w-full text-sm text-left border-collapse">
          <thead className="bg-muted text-muted-foreground text-xs uppercase tracking-wide">
            <tr>
              {Object.keys(previewData[0]).map((key) => (
                <th key={key} className="px-4 py-2 font-semibold border-b">
                  {key}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y">
            {previewData.map((row, i) => (
              <tr
                key={i}
                className={i % 2 === 0 ? "bg-background" : "bg-muted/20"}
              >
                {Object.values(row).map((value, j) => (
                  <td key={j} className="px-4 py-2 whitespace-nowrap">
                    {value as string}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )}
  </CardContent>
</Card>

  );
}
