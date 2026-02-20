import { HeroSection, GradientExamples, GettingStarted, FeatureCards } from ".";

export default function HomeLayout() {
  return (
    <div className="layout">
      <div className="p-8">
        <HeroSection />
        <GradientExamples />
        <GettingStarted />
        <FeatureCards />
      </div>
    </div>
  );
}
