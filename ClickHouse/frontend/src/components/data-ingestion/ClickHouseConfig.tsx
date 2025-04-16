import { Database, Lock, Server } from "lucide-react";
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

interface ClickHouseConfigProps {
  type: "source" | "target";
  onConnected?: (success: boolean) => void;
}

export function ClickHouseConfig({ type, onConnected }: ClickHouseConfigProps) {
  const [host, setHost] = useState("localhost");
  const [port, setPort] = useState("8123");
  const [database, setDatabase] = useState("default");
  const [username, setUsername] = useState("default");
  const [password, setPassword] = useState("");
  const [isConnecting, setIsConnecting] = useState(false);
  const [isConnected, setIsConnected] = useState(false);

  const handleConnect = async () => {
    if (!host || !port || !database || !username) {
      toast.warning("Warning", {
        description: "Please fill in all required fields",
      });
      return;
    }

    setIsConnecting(true);
    try {
      const result = await apiService.connectToClickHouse({
        host,
        port,
        database,
        username,
        password,
      });

      if (result.success) {
        setIsConnected(true);
        toast.success("Connection Successful", {
          description: "Connected to ClickHouse database",
        });
        onConnected?.(true);
      } else {
        toast.error("Connection Failed", {
          description: result.message || "Failed to connect to ClickHouse",
        });
        onConnected?.(false);
      }
    } catch {
      onConnected?.(false);
    } finally {
      setIsConnecting(false);
    }
  };

  return (
    <Card className="rounded-2xl shadow-md border border-muted p-4">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <Database className="h-5 w-5 text-primary" />
          ClickHouse Configuration
        </CardTitle>
        <CardDescription className="text-sm text-muted-foreground">
          {type === "source" ? "Source" : "Target"} database connection details
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-1">
            <Label htmlFor="host">Host</Label>
            <div className="flex items-center rounded-lg border px-3">
              <Server className="h-4 w-4 text-muted-foreground mr-2" />
              <Input
                id="host"
                className="border-none focus-visible:ring-0 focus-visible:ring-offset-0"
                placeholder="localhost"
                value={host}
                onChange={(e) => setHost(e.target.value)}
                disabled={isConnected}
              />
            </div>
          </div>
          <div className="space-y-1">
            <Label htmlFor="port">Port</Label>
            <Input
              id="port"
              placeholder="8123"
              value={port}
              onChange={(e) => setPort(e.target.value)}
              disabled={isConnected}
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor="database">Database</Label>
            <div className="flex items-center rounded-lg border px-3">
              <Database className="h-4 w-4 text-muted-foreground mr-2" />
              <Input
                id="database"
                className="border-none focus-visible:ring-0 focus-visible:ring-offset-0"
                placeholder="default"
                value={database}
                onChange={(e) => setDatabase(e.target.value)}
                disabled={isConnected}
              />
            </div>
          </div>
          <div className="space-y-1">
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              placeholder="default"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              disabled={isConnected}
            />
          </div>
          <div className="space-y-1 md:col-span-2">
            <Label htmlFor="password">Password</Label>
            <div className="flex items-center rounded-lg border px-3">
              <Lock className="h-4 w-4 text-muted-foreground mr-2" />
              <Input
                id="password"
                type="password"
                className="border-none focus-visible:ring-0 focus-visible:ring-offset-0"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isConnected}
              />
            </div>
          </div>
          <div className="md:col-span-2">
            <Button
              onClick={handleConnect}
              disabled={isConnecting || isConnected}
              className="w-full mt-4"
            >
              {isConnecting
                ? "Connecting..."
                : isConnected
                ? "Connected ✓"
                : "Connect"}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
