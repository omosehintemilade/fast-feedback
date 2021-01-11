import { compareDesc, parseISO } from "date-fns"
import { db } from "./firebase-admin"

export async function getAllFeedback(siteId) {
  const snapshot = await db.collection("feedback").where("siteId", "==", siteId).get()
  let feedback = []

  snapshot.forEach(doc => {
    feedback.push({ id: doc.id, ...doc.data() })
  })

  feedback.sort((a, b) => compareDesc(parseISO(a.createdAt), parseISO(b.createdAt)))

  return feedback
}

export async function getAllSites() {
  const snapshot = await db.collection("sites").get()

  let sites = []

  snapshot.forEach(doc => {
    sites.push({ id: doc.id, ...doc.data() })
  })

  return sites
}

export async function getUserSites(userId) {
  const snapshot = await db.collection("sites").where("authorId", "==", userId).get()

  let sites = []

  snapshot.forEach(doc => {
    sites.push({ id: doc.id, ...doc.data() })
  })

  return { sites }
}

export async function getUserFeedback(userId) {
  const snapshot = await db.collection("feedback").where("authorId", "==", userId).get()

  let feedback = []

  snapshot.forEach(doc => {
    feedback.push({ id: doc.id, ...doc.data() })
  })

  return { feedback }
}
