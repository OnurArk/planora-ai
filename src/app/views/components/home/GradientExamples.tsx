const gradientExamples = [
  {
    text: "Default Flow",
    className: "gradient-text",
    emoji: "",
    description: "Blue → Purple → Pink (3s)"
  },
  {
    text: "🔥 Fire",
    className: "gradient-text-fire",
    emoji: "🔥",
    description: "Red → Orange → Yellow (4s)"
  },
  {
    text: "🌊 Ocean",
    className: "gradient-text-ocean",
    emoji: "🌊",
    description: "Cyan → Blue → Dark Blue (5s)"
  },
  {
    text: "🌅 Sunset",
    className: "gradient-text-sunset",
    emoji: "🌅",
    description: "Pink → Orange → Yellow (6s)"
  },
  {
    text: "🌿 Green",
    className: "gradient-text-green",
    emoji: "🌿",
    description: "Light → Dark Green (3.5s)"
  },
  {
    text: "🌈 Rainbow",
    className: "gradient-text-rainbow",
    emoji: "🌈",
    description: "Full spectrum (4s)"
  }
];

export default function GradientExamples() {
  return (
    <div className="mb-8 space-y-6">
      <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-300">
        🎨 Animated Gradient Examples
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {gradientExamples.map((gradient, index) => (
          <div key={index} className="card text-center">
            <p className={`text-2xl font-bold ${gradient.className} mb-2`}>
              {gradient.text}
            </p>
            <small className="text-gray-600 dark:text-gray-400">
              {gradient.description}
            </small>
          </div>
        ))}
      </div>
    </div>
  );
}