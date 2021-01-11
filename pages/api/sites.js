import { getUserSites } from "@/lib/db-admin"
import { auth } from "@/lib/firebase-admin"

export default async (req, res) => {
  // console.log(req)
  const { uid } = await auth.verifyIdToken(req.headers.token)

  const sites = await getUserSites(uid)

  res.status(200).json(sites)
}
