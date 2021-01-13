import { useRouter } from "next/router"
import { Box, Input, FormControl, FormLabel, Button } from "@chakra-ui/react"
import { useRef, useState } from "react"

// components
import Feedback from "@/components/Feedback"
import { useAuth } from "@/lib/auth"
import { getAllFeedback, getAllSites } from "@/lib/db-admin"
import { createFeedback } from "@/lib/db"
import DashboardShell from "@/components/DashboardShell"

export async function getStaticProps(context) {
  const siteId = context.params.siteId
  const feedback = await getAllFeedback(siteId)

  return {
    props: {
      initialFeedback: feedback
    },

    revalidate: 1
  }
}

export async function getStaticPaths() {
  const sites = await getAllSites()

  const paths = sites.map(site => {
    return {
      params: {
        siteId: site.id.toString()
      }
    }
  })
  return {
    paths,
    fallback: true
  }
}

function SiteFeedback({ initialFeedback }) {
  const auth = useAuth()
  const router = useRouter()
  const input = useRef(null)
  const [allFeedback, setAllFeedback] = useState(initialFeedback)

  const onSubmit = e => {
    e.preventDefault()
    const newFeedback = {
      author: auth.user.name || auth.user.email,
      authorId: auth.user.uid,
      siteId: router.query.siteId,
      text: input.current.value,
      createdAt: new Date().toISOString(),
      provider: auth.user.provider,
      status: "pending"
    }
    setAllFeedback([newFeedback, ...allFeedback])
    createFeedback(newFeedback)
    input.current.value = ""
  }

  return (
    <DashboardShell>
      <Box
        display="flex"
        flexDirection="column"
        width="full"
        maxW="700px"
        margin="0 auto"
      >
        <Box as="form" onSubmit={onSubmit}>
          <FormControl id="comment" my={4}>
            <FormLabel>Comment </FormLabel>
            <Input type="comment" ref={input} />
            <Button fontWeight="medium" type="submit" mt={2}>
              Add Comment
            </Button>
          </FormControl>
        </Box>

        {allFeedback.map(feedback => (
          <Feedback key={feedback.id} {...feedback} />
        ))}
      </Box>
    </DashboardShell>
  )
}

export default SiteFeedback
