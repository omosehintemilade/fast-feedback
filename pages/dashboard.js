import Head from "next/head"

// components
import { useAuth } from "@/lib/auth"
import EmptyState from "@/components/EmptyState"
import SiteTableSkeleton from "@/components/SiteTableSkeleton"
import DashboardShell from "@/components/DashboardShell"
import useSWR from "swr"
import fetcher from "@/utils/fetcher"
import SiteTable from "@/components/SiteTable"
import SiteTableHeader from "@/components/SiteTableHeader"

const Dashboard = () => {
  const { user } = useAuth()
  // console.log(user)
  const { data } = useSWR(user ? ["/api/sites", user.token] : null, fetcher)

  if (!data) {
    return (
      <DashboardShell>
        <SiteTableHeader />
        <SiteTableSkeleton />
      </DashboardShell>
    )
  }
  // console.log(data.sites)
  return (
    <DashboardShell>
      <SiteTableHeader />
      {data?.sites ? <SiteTable sites={data.sites} /> : <EmptyState />}
    </DashboardShell>
  )
}
export default Dashboard
