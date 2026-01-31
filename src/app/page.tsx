import Header from '@/components/app/header';
import CognitiveTravelMode from '@/components/app/cognitive-travel-mode';
import SituationalAIReasoning from '@/components/app/situational-ai-reasoning';
import IntelligentAlertSystem from '@/components/app/intelligent-alert-system';
import SmartSOS from '@/components/app/smart-sos';
import StatusDashboard from '@/components/app/status-dashboard';
import Features from '@/components/app/features';
import Image from 'next/image';

export default function Home() {
  return (
    <div className="flex min-h-screen w-full flex-col bg-background text-foreground">
      <Image
        src="https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=2070&auto=format&fit=crop"
        alt="Travel background"
        fill
        className="object-cover -z-20"
        data-ai-hint="travel background"
      />
      <div className="fixed inset-0 bg-background/70 backdrop-blur-sm -z-10" />
      <Header />
      <main className="flex-1 container mx-auto space-y-12 p-4 sm:p-6 md:p-8 mt-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            <div className="lg:col-span-1">
                <StatusDashboard />
            </div>
            <div className="lg:col-span-2">
                <SmartSOS />
            </div>
        </div>
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          <CognitiveTravelMode />
          <SituationalAIReasoning />
        </div>
        <IntelligentAlertSystem />
        <Features />
      </main>
    </div>
  );
}
