import Header from '@/components/app/header';
import CognitiveTravelMode from '@/components/app/cognitive-travel-mode';
import SituationalAIReasoning from '@/components/app/situational-ai-reasoning';
import IntelligentAlertSystem from '@/components/app/intelligent-alert-system';
import SmartSOS from '@/components/app/smart-sos';
import StatusDashboard from '@/components/app/status-dashboard';
import Features from '@/components/app/features';

export default function Home() {
  return (
    <div className="flex min-h-screen w-full flex-col bg-background text-foreground">
      <Header />
      <main className="flex-1 space-y-8 p-4 sm:p-6 md:p-8">
        <div className="grid grid-cols-1 gap-8 xl:grid-cols-2">
            <StatusDashboard />
            <SmartSOS />
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
