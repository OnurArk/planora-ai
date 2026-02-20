export default function TodoPage() {
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-100 mb-8">
          Todo List
        </h1>
        
        <div className="bg-white dark:bg-zinc-900 rounded-lg shadow-lg p-6">
          <p className="text-zinc-600 dark:text-zinc-400">
            Todo uygulaması burada olacak
          </p>
        </div>
      </div>
    </div>
  );
}