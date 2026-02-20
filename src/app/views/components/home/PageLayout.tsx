interface PageLayoutProps {
  children: React.ReactNode;
}

export default function PageLayout({ children }: PageLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 center">
      <div className="max-w-4xl mx-auto p-8">
        {children}
      </div>
    </div>
  );
}