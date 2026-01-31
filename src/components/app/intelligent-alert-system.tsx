"use client";

import { useState, useEffect } from "react";
import { intelligentAlert, type IntelligentAlertOutput, type IntelligentAlertInput } from "@/ai/flows/intelligent-alert-system";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle, Bell, Loader2, ZapOff, CheckCircle2, HeartPulse } from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

const mockSensorData: IntelligentAlertInput[] = [
    { time: "night", motion: "walking", noise: "quiet", battery: "high", locationContext: "unfamiliar area", voiceStressLevel: "normal", movementPattern: "normal" },
    { time: "day", motion: "falling", noise: "quiet", battery: "medium", locationContext: "familiar area", voiceStressLevel: "stressed", movementPattern: "sudden stop" },
    { time: "night", motion: "walking", noise: "quiet", battery: "medium", locationContext: "prolonged isolation", voiceStressLevel: "elevated", movementPattern: "normal" },
    { time: "night", motion: "running", noise: "quiet", battery: "medium", locationContext: "unfamiliar area", voiceStressLevel: "stressed", movementPattern: "erratic" },
    { time: "day", motion: "walking", noise: "crowded", battery: "high", locationContext: "known route", voiceStressLevel: "normal", movementPattern: "normal" },
    { time: "night", motion: "still", noise: "quiet", battery: "low", locationContext: "isolated", voiceStressLevel: "normal", movementPattern: "sudden stop" },
];

export default function IntelligentAlertSystem() {
  const [isLoading, setIsLoading] = useState(true);
  const [currentAlert, setCurrentAlert] = useState<IntelligentAlertOutput | null>(null);
  const [log, setLog] = useState<({ context: IntelligentAlertInput, alert: IntelligentAlertOutput })[]>([]);

  useEffect(() => {
    let mockIndex = 0;
    const initialCall = async () => {
        try {
            const res = await intelligentAlert(mockSensorData[0]);
            if (res.alertType !== 'false-alarm-suppression') {
                setCurrentAlert(res);
            }
            setLog([{ context: mockSensorData[0], alert: res }]);
        } catch (error) {
            console.error(error);
            setCurrentAlert({ alertType: "error", alertMessage: "Could not get alert status.", urgency: "low" });
        } finally {
            setIsLoading(false);
        }
    };
    initialCall();

    const interval = setInterval(async () => {
      setIsLoading(true);
      
      mockIndex = (mockIndex + 1) % mockSensorData.length;
      const newContext = mockSensorData[mockIndex];

      try {
        const res = await intelligentAlert(newContext);
        
        if (res.alertType !== 'false-alarm-suppression') {
            setCurrentAlert(res);
        } else {
            setCurrentAlert({alertType: "false-alarm-suppression", alertMessage: "Situation is safe. No action needed.", urgency: "low"});
            setTimeout(() => setCurrentAlert(null), 3000);
        }
        setLog(prev => [{ context: newContext, alert: res }, ...prev].slice(0, 5));
      } catch (error) {
        console.error(error);
        setCurrentAlert({ alertType: "error", alertMessage: "Could not get alert status.", urgency: "low" });
      } finally {
        setIsLoading(false);
      }
    }, 10000); 

    return () => clearInterval(interval);
  }, []);

  const getUrgencyColorThemed = (urgency: string) => {
    if (urgency === "high") return "border-destructive bg-destructive/20 text-destructive-foreground";
    if (urgency === "medium") return "border-yellow-500 bg-yellow-500/20 text-yellow-200";
    return "border-accent bg-accent/20 text-accent-foreground";
  };
  
  const getUrgencyIconThemed = (urgency: string, alertType?: string) => {
    if (alertType === 'false-alarm-suppression') return <CheckCircle2 className="h-6 w-6 text-accent" />;
    if (alertType === 'medical-emergency') return <HeartPulse className="h-6 w-6 text-destructive" />;
    if (urgency === "high") return <AlertTriangle className="h-6 w-6 text-destructive" />;
    if (urgency === "medium") return <Bell className="h-6 w-6 text-yellow-400" />;
    return <Bell className="h-6 w-6 text-accent" />;
  };

  const getBadgeVariant = (urgency: string) => {
    if (urgency === "high") return "destructive";
    if (urgency === "medium") return "secondary";
    return "default";
  };

  return (
    <Card className="w-full border-primary/10">
      <CardHeader>
        <div className="flex items-center justify-between">
            <CardTitle className="font-headline text-xl">Intelligent Alert System</CardTitle>
            {isLoading ? <Loader2 className="h-6 w-6 animate-spin text-primary" /> : <Bell className="h-6 w-6 text-primary" />}
        </div>
        <CardDescription>
          Context-aware, life-saving alerts that are reasoned by AI, not just triggered by static rules.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {currentAlert ? (
          <div className={cn("rounded-lg border-2 p-4 flex items-start gap-4 transition-all", getUrgencyColorThemed(currentAlert.urgency))}>
              {getUrgencyIconThemed(currentAlert.urgency, currentAlert.alertType)}
              <div>
                  <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="font-bold text-lg capitalize">{currentAlert.alertType.replace(/-/g, ' ')}</h3>
                      <Badge variant={getBadgeVariant(currentAlert.urgency)}>{currentAlert.urgency.toUpperCase()}</Badge>
                  </div>
                  <p className="text-sm mt-1">{currentAlert.alertMessage}</p>
                  {currentAlert.additionalGuidance && <p className="text-xs mt-2 opacity-80">{currentAlert.additionalGuidance}</p>}
              </div>
          </div>
        ) : (
          <div className="rounded-lg border-2 border-dashed p-4 flex flex-col items-center justify-center text-center text-muted-foreground h-32">
            <ZapOff className="h-8 w-8 mb-2" />
            <p className="font-semibold">All Clear</p>
            <p className="text-sm">No critical alerts at the moment.</p>
          </div>
        )}

        <div>
            <h4 className="font-semibold mb-2">Sensor Data & Alert Log</h4>
            <div className="space-y-2 max-h-64 overflow-y-auto rounded-md border p-2 bg-black/20">
                {log.length === 0 && <p className="text-sm text-muted-foreground text-center p-4">Waiting for sensor data...</p>}
                {log.map((entry, index) => (
                    <div key={index} className="text-xs p-2 rounded-md bg-background/50">
                        <p><span className="font-semibold text-primary/80">Context:</span> {Object.entries(entry.context).map(([k,v]) => `${k}: ${v}`).join(', ')}</p>
                        <p><span className="font-semibold text-accent/80">AI Alert:</span> {entry.alert.alertMessage} ({entry.alert.alertType}, {entry.alert.urgency})</p>
                    </div>
                ))}
            </div>
        </div>
      </CardContent>
    </Card>
  );
}
