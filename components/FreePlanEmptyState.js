import React from "react"
import { Heading, Flex, Text } from "@chakra-ui/react"
import DashboardShell from "./DashboardShell"

const FreePlanEmptyState = () => (
  <DashboardShell>
    <Flex width="100%" backgroundColor="white" borderRadius="8px" p={16} justify="center" align="center" direction="column">
      <Heading size="lg" mb={2}>
        Get feedback on your site
      </Heading>
      <Text mb={4}>start today and grow with us</Text>
    </Flex>
  </DashboardShell>
)

export default FreePlanEmptyState
