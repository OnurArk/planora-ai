const features = [
  {
    title: "Todo Management",
    description: "Organize your tasks efficiently",
    buttonText: "Go to Todos",
    href: "/todo",
    disabled: false,
    variant: "primary" as const
  },
  {
    title: "AI Features",
    description: "Coming soon...",
    buttonText: "Coming Soon",
    href: "#",
    disabled: true,
    variant: "secondary" as const
  }
];

export default function FeatureCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {features.map((feature, index) => (
        <div key={index} className="card">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
            {feature.title}
          </h3>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            {feature.description}
          </p>
          
          {feature.disabled ? (
            <button 
              className={`btn btn-${feature.variant}`} 
              disabled={feature.disabled}
            >
              {feature.buttonText}
            </button>
          ) : (
            <a 
              href={feature.href} 
              className={`btn btn-${feature.variant}`}
            >
              {feature.buttonText}
            </a>
          )}
        </div>
      ))}
    </div>
  );
}