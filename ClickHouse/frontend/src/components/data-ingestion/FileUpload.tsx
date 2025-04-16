import { FileText, Upload } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { apiService } from "@/lib/api";

interface FileUploadProps {
  type: "source" | "target";
  selectedFile: File | null;
  onFileChange: (file: File | null) => void;
}

// No changes to imports or props...

export function FileUpload({
  type,
  selectedFile,
  onFileChange,
}: FileUploadProps) {
  // same hook logic...

  return (
    <Card className="border border-border shadow-md rounded-2xl">
      <CardHeader className="bg-muted/30 rounded-t-2xl">
        <CardTitle className="flex items-center gap-2 text-lg font-semibold">
          <FileText className="h-5 w-5 text-primary" />
          Flat File Configuration
        </CardTitle>
        <CardDescription className="text-sm text-muted-foreground">
          {type === "source" ? "Source" : "Target"} file details
        </CardDescription>
      </CardHeader>
      <CardContent className="grid md:grid-cols-2 gap-6 p-6">
        <div>
          <Label htmlFor="filename" className="text-sm font-medium">
            File Name
          </Label>
          <Input
            id="filename"
            placeholder="data.csv"
            className="mt-2"
            value={selectedFile?.name || ""}
            readOnly
          />
        </div>
        <div>
          <Label htmlFor="delimiter" className="text-sm font-medium">
            Delimiter
          </Label>
          <Input
            id="delimiter"
            placeholder=","
            className="mt-2"
            value={delimiter}
            onChange={handleDelimiterChange}
          />
        </div>
        <div className="md:col-span-2">
          <Label htmlFor="fileupload" className="text-sm font-medium">
            Upload File
          </Label>
          <div
            className={`mt-2 border-2 border-dashed transition-all duration-200 rounded-xl p-6 flex flex-col items-center justify-center cursor-pointer hover:border-primary hover:bg-muted/20 ${
              selectedFile ? "bg-muted/30" : "bg-background"
            }`}
            onDrop={handleFileDrop}
            onDragOver={handleDragOver}
          >
            {uploading ? (
              <div className="flex flex-col items-center">
                <div className="animate-spin h-8 w-8 border-2 border-primary border-t-transparent rounded-full mb-3"></div>
                <p className="text-sm text-muted-foreground">Uploading file...</p>
              </div>
            ) : selectedFile ? (
              <>
                <FileText className="h-8 w-8 text-primary mb-2" />
                <p className="text-sm font-medium mb-1">{selectedFile.name}</p>
                <p className="text-xs text-muted-foreground mb-3">
                  {(selectedFile.size / 1024).toFixed(2)} KB
                </p>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={handleRemoveFile}
                  className="rounded-md"
                >
                  Remove File
                </Button>
              </>
            ) : (
              <>
                <Upload className="h-8 w-8 text-muted-foreground mb-2" />
                <p className="text-sm text-muted-foreground mb-2">
                  Drag & drop or click to browse
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  className="rounded-md"
                  onClick={() =>
                    document.getElementById("file-input")?.click()
                  }
                >
                  Browse Files
                </Button>
                <input
                  id="file-input"
                  type="file"
                  className="hidden"
                  onChange={handleFileChange}
                  accept=".csv,.tsv,.txt,.json"
                />
              </>
            )}
          </div>

          <p className="text-xs text-muted-foreground mt-3">
            {type === "source"
              ? "Supported formats: CSV, TSV, TXT, JSON (max 5MB)"
              : "Export will be in CSV format with selected delimiter."}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}

