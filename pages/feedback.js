import Head from "next/head"

// components
import { useAuth } from "@/lib/auth"
import EmptyState from "@/components/EmptyState"
import SiteTableSkeleton from "@/components/SiteTableSkeleton"
import DashboardShell from "@/components/DashboardShell"
import useSWR from "swr"
import fetcher from "@/utils/fetcher"
import FeedbackTable from "@/components/FeedbackTable"
import FeedbackTableHeader from "@/components/FeedbackTableHeader"

const MyFeedback = () => {
  const auth = useAuth()
  const { data } = useSWR(auth.user ? ["/api/feedback", auth.user.token] : null, fetcher)

  if (!data) {
    return (
      <DashboardShell>
        <FeedbackTableHeader />
        <SiteTableSkeleton />
      </DashboardShell>
    )
  }

  return (
    <DashboardShell>
      <FeedbackTableHeader />
      {data?.feedback ? <FeedbackTable allFeedback={data.feedback} /> : <EmptyState />}
    </DashboardShell>
  )
}
export default MyFeedback
