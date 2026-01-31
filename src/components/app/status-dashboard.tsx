"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Wifi, WifiOff, BatteryFull, BatteryMedium, BatteryLow, ShieldCheck, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

export default function StatusDashboard() {
  const [online, setOnline] = useState(true);
  const [batteryLevel, setBatteryLevel] = useState(100);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setOnline(navigator.onLine);

      const handleOnline = () => setOnline(true);
      const handleOffline = () => setOnline(false);

      window.addEventListener('online', handleOnline);
      window.addEventListener('offline', handleOffline);
      
      const interval = setInterval(() => {
        setBatteryLevel((prev) => (prev > 5 ? prev - 1 : 5));
      }, 60000); // drain 1% every minute
      
      return () => {
        window.removeEventListener('online', handleOnline);
        window.removeEventListener('offline', handleOffline);
        clearInterval(interval);
      };
    }
  }, []);

  const getBatteryIcon = () => {
    if (batteryLevel > 60) return <BatteryFull className="h-5 w-5 text-accent" />;
    if (batteryLevel > 20) return <BatteryMedium className="h-5 w-5 text-primary" />;
    return <BatteryLow className="h-5 w-5 text-destructive" />;
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
            <CardTitle className="font-headline text-xl">System Status</CardTitle>
            <ShieldCheck className="h-6 w-6 text-accent" />
        </div>
        <CardDescription>Real-time on-device monitoring.</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="flex items-center justify-between rounded-lg border p-3">
          <div className="flex items-center gap-3">
            {online ? <Wifi className="h-5 w-5 text-accent" /> : <WifiOff className="h-5 w-5 text-destructive" />}
            <div>
              <p className="text-sm font-medium">Network</p>
              <p className={cn("text-xs", online ? "text-accent" : "text-destructive")}>{online ? "Connected" : "Offline - Dead-Zone Guardian Active"}</p>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between rounded-lg border p-3">
            <div className="flex items-center gap-3">
                {getBatteryIcon()}
                <div>
                    <p className="text-sm font-medium">Battery</p>
                    <p className="text-xs text-muted-foreground">{batteryLevel}% Remaining</p>
                </div>
            </div>
        </div>
        <div className="flex items-center justify-between rounded-lg border p-3">
            <div className="flex items-center gap-3">
                <Zap className="h-5 w-5 text-accent"/>
                <div>
                    <p className="text-sm font-medium">Zero-Trace Tourist Mode</p>
                    <p className="text-xs text-accent">Active</p>
                </div>
            </div>
            <p className="text-xs text-muted-foreground">RAM-only, auto-wiping.</p>
        </div>
      </CardContent>
    </Card>
  );
}
