export default function GettingStarted() {
  return (
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
  );
}