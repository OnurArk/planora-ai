import {
  PageLayout,
  HeroSection,
  GradientExamples,
  GettingStarted,
  FeatureCards,
} from "./views/components/home";

export default function HomePage() {
  return (
    <PageLayout>
      <HeroSection />
      <GradientExamples />
      <GettingStarted />
      <FeatureCards />
    </PageLayout>
  );
}
