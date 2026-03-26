import CuisineSelector from "../_components/LeadCaptureForm"

export default function Page() {
  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      {/* ISOLATION LAYER */}
      <div className="bg-black text-white [all:initial] font-sans">
        <div className="min-h-screen bg-black text-white flex items-center justify-center p-6">
          <CuisineSelector />
        </div>
      </div>
    </div>
  )
}