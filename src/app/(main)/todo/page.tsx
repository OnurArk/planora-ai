export default function TodoPage() {
  return (
    <section className="p-4 sm:p-6">
      <div className="max-w-4xl">
        <h1 className="mb-8 text-3xl font-bold">Todo List</h1>

        <div className="card">
          <div className="space-y-4">
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Add a new todo..."
                className="input flex-1"
              />
              <button className="btn btn-primary">Add</button>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-3 rounded-md bg-gray-50 p-3 dark:bg-gray-700">
                <input type="checkbox" className="h-4 w-4 text-blue-600" />
                <span className="flex-1 text-gray-800 dark:text-gray-200">
                  Example todo item 1
                </span>
                <button className="btn btn-danger px-3 py-1 text-sm">
                  Delete
                </button>
              </div>

              <div className="flex items-center gap-3 rounded-md bg-gray-50 p-3 dark:bg-gray-700">
                <input type="checkbox" className="h-4 w-4 text-blue-600" />
                <span className="flex-1 text-gray-800 dark:text-gray-200">
                  Example todo item 2
                </span>
                <button className="btn btn-danger px-3 py-1 text-sm">
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="card mt-6">
          <div className="card-header">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              Form Example
            </h2>
          </div>

          <div className="form-group">
            <label className="form-label">Task Name</label>
            <input type="text" className="input" placeholder="Enter task name" />
          </div>

          <div className="form-group">
            <label className="form-label">Description</label>
            <textarea
              className="input"
              rows={3}
              placeholder="Enter description"
            ></textarea>
          </div>

          <div className="flex gap-2">
            <button className="btn btn-primary">Save Task</button>
            <button className="btn btn-secondary">Cancel</button>
          </div>
        </div>
      </div>
    </section>
  );
}
