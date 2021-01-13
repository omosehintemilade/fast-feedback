import Head from "next/head"
import { useRouter } from "next/router"

// components
import { useAuth } from "@/lib/auth"
import EmptyState from "@/components/EmptyState"
import SiteTableSkeleton from "@/components/SiteTableSkeleton"
import DashboardShell from "@/components/DashboardShell"
import useSWR from "swr"
import fetcher from "@/utils/fetcher"
import FeedbackTable from "@/components/FeedbackTable"
import FeedbackTableHeader from "@/components/FeedbackTableHeader"

const SiteFeedback = () => {
  const auth = useAuth()
  const { query } = useRouter()
  const { data } = useSWR(
    auth.user ? [`/api/feedback/${query.siteId}`, auth.user.token] : null,
    fetcher
  )

  console.log(data)

  if (!data) {
    return (
      <DashboardShell>
        <FeedbackTableHeader />
        <SiteTableSkeleton />
      </DashboardShell>
    )
  }

  console.log(data.feedback)

  return (
    <DashboardShell>
      <FeedbackTableHeader siteName={data.site.name} />
      {data?.feedback ? (
        <FeedbackTable feedback={data.feedback} />
      ) : (
        <EmptyState />
      )}
    </DashboardShell>
  )
}
export default SiteFeedback
