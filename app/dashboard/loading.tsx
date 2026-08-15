import { LoadingState } from "@/components/common/loading-state"

export default function DashboardLoading() {
  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-8 sm:px-6">
      <LoadingState variant="skeleton" />
    </div>
  )
}
