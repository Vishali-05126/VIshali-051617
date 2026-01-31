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
      <div className="fixed top-0 left-0 w-full h-full bg-grid-slate-900/[0.04] bg-[linear-gradient(to_right,theme(colors.border/0.3)_1px,transparent_1px),linear-gradient(to_bottom,theme(colors.border/0.3)_1px,transparent_1px)] bg-[size:2rem_2rem] [mask-image:radial-gradient(ellipse_at_center,white_20%,transparent_100%)] -z-10"></div>
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
