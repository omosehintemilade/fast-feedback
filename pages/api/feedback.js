import { getUserFeedback } from "@/lib/db-admin"
import { auth } from "@/lib/firebase-admin"

export default async (req, res) => {
  const { uid } = await auth.verifyIdToken(req.headers.token)

  const feedback = await getUserFeedback(uid)

  res.status(200).json(feedback)
}
