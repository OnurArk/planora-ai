export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 center">
      <div className="max-w-4xl mx-auto p-8 text-center">
        <h1 className="text-4xl font-bold gradient-text mb-6">
          Welcome to Planora AI
        </h1>

        <div className="mb-8 space-y-6">
          <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-300">
            🎨 Animated Gradient Examples
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="card text-center">
              <p className="text-2xl font-bold gradient-text mb-2">
                Default Flow
              </p>
              <small className="text-gray-600 dark:text-gray-400">
                Blue → Purple → Pink (3s)
              </small>
            </div>

            <div className="card text-center">
              <p className="text-2xl font-bold gradient-text-fire mb-2">
                🔥 Fire
              </p>
              <small className="text-gray-600 dark:text-gray-400">
                Red → Orange → Yellow (4s)
              </small>
            </div>

            <div className="card text-center">
              <p className="text-2xl font-bold gradient-text-ocean mb-2">
                🌊 Ocean
              </p>
              <small className="text-gray-600 dark:text-gray-400">
                Cyan → Blue → Dark Blue (5s)
              </small>
            </div>

            <div className="card text-center">
              <p className="text-2xl font-bold gradient-text-sunset mb-2">
                🌅 Sunset
              </p>
              <small className="text-gray-600 dark:text-gray-400">
                Pink → Orange → Yellow (6s)
              </small>
            </div>

            <div className="card text-center">
              <p className="text-2xl font-bold gradient-text-green mb-2">
                🌿 Green
              </p>
              <small className="text-gray-600 dark:text-gray-400">
                Light → Dark Green (3.5s)
              </small>
            </div>

            <div className="card text-center">
              <p className="text-2xl font-bold gradient-text-rainbow mb-2">
                🌈 Rainbow
              </p>
              <small className="text-gray-600 dark:text-gray-400">
                Full spectrum (8s)
              </small>
            </div>
          </div>
        </div>

        <div className="card mb-8">
          <div className="card-header">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
              Getting Started
            </h2>
          </div>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Choose from our available features to get started.
          </p>

          <div className="flex-between gap-4">
            <button className="btn btn-primary">Create Project</button>
            <button className="btn btn-secondary">View Docs</button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="card">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
              Todo Management
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Organize your tasks efficiently
            </p>
            <a href="/todo" className="btn btn-primary">
              Go to Todos
            </a>
          </div>

          <div className="card">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
              AI Features
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Coming soon...
            </p>
            <button className="btn btn-secondary" disabled>
              Coming Soon
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
