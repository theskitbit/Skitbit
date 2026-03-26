import CuisineSelector from "../_components/LeadCaptureForm"

export default function Page() {
  return (
    <main className="min-h-screen bg-black flex items-center justify-center">
      <div className="w-full max-w-[540px]">
        <CuisineSelector />
      </div>
    </main>
  )
}