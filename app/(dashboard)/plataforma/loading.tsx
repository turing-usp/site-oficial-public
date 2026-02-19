export default function Loading() {
  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center bg-gray-50">
      <div className="h-12 w-12 animate-spin rounded-full border-4 border-blue-600 border-t-transparent"></div>
      <h2 className="mt-4 text-xl font-semibold text-gray-700">
        Preparando seu painel...
      </h2>
      <p className="text-gray-500">Isso levará apenas um instante.</p>
    </div>
  )
}