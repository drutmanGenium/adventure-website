import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { TrekkingDetail } from "@/components/trekking-detail"
import { Suspense } from "react"

export default async function TrekkingDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  return (
    <main className="min-h-screen">
      <Navigation />
      <div className="pt-16">
        <Suspense>
          <TrekkingDetail id={id} />
        </Suspense>
      </div>
      <Footer />
    </main>
  )
}
