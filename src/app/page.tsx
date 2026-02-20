export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 center">
      <div className="max-w-4xl mx-auto p-8 text-center">
        <h1 className="text-4xl font-bold gradient-text mb-6">
          Welcome to Planora AI
        </h1>
        
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
            <button className="btn btn-primary">
              Create Project
            </button>
            <button className="btn btn-secondary">
              View Docs
            </button>
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
