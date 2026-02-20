import { HeroSection, GradientExamples, GettingStarted, FeatureCards } from ".";

export default function HomeLayout() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 center">
      <div className="max-w-4xl mx-auto p-8">
        <HeroSection />
        <GradientExamples />
        <GettingStarted />
        <FeatureCards />
      </div>
    </div>
  );
}
