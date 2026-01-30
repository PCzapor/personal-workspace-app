import { DashboardApiServer } from "@/features/dashboard/api.server"
import { QuickAdd } from "@/features/dashboard/components/QuickAdd"
import { RecentActivity } from "@/features/dashboard/components/RecentActivity"
import TasksChecklist from "@/features/dashboard/components/TasksChecklist"
import { PanelSkeleton, EmptyState } from "@/features/ui/custom"
import { Suspense } from "react"

export default async function DashboardPage() {
  const summary = await DashboardApiServer.getSummary()
  if (!summary) return <EmptyState title='Failed to load data.' />
  const { recentNotes, recentLinks } = summary

  return (
    <Suspense fallback={<PanelSkeleton />}>
      <div className='space-y-6'>
        <div className='grid gap-4 md:grid-cols-3'>
          <TasksChecklist />

          <QuickAdd />

          <RecentActivity recentNotes={recentNotes} recentLinks={recentLinks} />
        </div>
      </div>
    </Suspense>
  )
}
