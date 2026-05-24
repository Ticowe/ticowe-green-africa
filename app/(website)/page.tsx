import Hero from "@/components/home/Hero";
import Stats from "@/components/home/Stats";
import AboutPreview from "@/components/home/AboutPreview";
import Programs from "@/components/home/Programs";
import Impact from "@/components/home/Impact";
import BoardMembers from "@/components/home/BoardMembers";
import CTASection from "@/components/home/CTASection";
import VisionMission from "@/components/home/VisionMission";

export default function HomePage() {
  return (
    <main className="overflow-hidden bg-white">
      <Hero />
      <AboutPreview />
      <VisionMission />
      <Programs />
      <Stats />
      <Impact />
      <BoardMembers />
      <CTASection />
    </main>
  );
}