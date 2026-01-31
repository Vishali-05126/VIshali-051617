"use client"

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Siren, HeartPulse, ShieldAlert, Wifi, Smartphone, Bluetooth, Satellite, BatteryWarning } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

export default function SmartSOS() {
  const [isOpen, setIsOpen] = useState(false);
  const [sosType, setSosType] = useState<"health" | "crime" | null>(null);

  const triggerSOS = (type: "health" | "crime") => {
    setSosType(type);
    setIsOpen(true);
  };

  return (
    <>
      <Card className="h-full border-primary/10">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="font-headline text-xl">Smart SOS</CardTitle>
            <Siren className="h-6 w-6 text-destructive" />
          </div>
          <CardDescription>
            AI-powered emergency escalation. Offline-first, multi-channel delivery.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <p className="text-sm text-muted-foreground">In case of emergency, select the type of incident. TripGuardian will handle the rest.</p>
          <div className="grid grid-cols-2 gap-4">
            <Button variant="outline" className="h-24 flex-col gap-2 hover:bg-red-500/10 hover:border-destructive hover:text-destructive" onClick={() => triggerSOS("health")}>
              <HeartPulse className="h-8 w-8" />
              <span>Health Emergency</span>
            </Button>
            <Button variant="outline" className="h-24 flex-col gap-2 hover:bg-yellow-500/10 hover:border-yellow-500 hover:text-yellow-400" onClick={() => triggerSOS("crime")}>
              <ShieldAlert className="h-8 w-8" />
              <span>Crime/Threat</span>
            </Button>
          </div>
          <Separator className="my-2" />
          <div className="space-y-3">
            <div className="flex items-center justify-between">
                <Label htmlFor="last-gasp-sos" className="flex items-center gap-2 font-semibold">
                    <BatteryWarning className="h-5 w-5 text-primary" />
                    Last-Moments Intelligence Capsule (LMIC)
                </Label>
                <Switch id="last-gasp-sos" defaultChecked />
            </div>
            <p className="text-xs text-muted-foreground">
                When enabled, if the device is about to die, the AI creates an end-to-end encrypted SOS capsule with your location, audio snapshot, and other data. It auto-sends once power or signal returns.
            </p>
          </div>
        </CardContent>
      </Card>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="font-headline text-2xl flex items-center gap-2">
              {sosType === "health" ? <HeartPulse className="text-destructive"/> : <ShieldAlert className="text-destructive"/>}
              SOS Escalation Initiated
            </DialogTitle>
            <DialogDescription>
              An SOS packet is being generated on-device and will be sent as soon as a connection is available.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4 space-y-4">
            <h4 className="font-semibold">Delivery Channels (Priority Order):</h4>
            <div className="space-y-3 text-sm text-muted-foreground">
              <div className="flex items-center gap-3"><Wifi className="h-4 w-4 text-accent"/> Cellular / Internet</div>
              <div className="flex items-center gap-3"><Smartphone className="h-4 w-4 text-accent"/> SMS Fallback (2G)</div>
              <div className="flex items-center gap-3"><Bluetooth className="h-4 w-4 text-accent"/> Bluetooth Relay</div>
              <div className="flex items-center gap-3"><Satellite className="h-4 w-4 text-accent"/> Satellite SMS (Future)</div>
            </div>
            <p className="text-xs text-center text-muted-foreground pt-4">Your privacy is protected. Location data is only shared upon successful SOS transmission.</p>
          </div>
          <DialogFooter>
            <Button onClick={() => setIsOpen(false)} className="w-full">Understood</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
