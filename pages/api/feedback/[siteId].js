import { getAllFeedback, getSite } from "@/lib/db-admin"

export default async (req, res) => {
  const siteId = req.query.siteId

  const feedback = await getAllFeedback(siteId)
  const site = await getSite(siteId)
  console.log(site)

  res.status(200).json({ feedback, site })
}
