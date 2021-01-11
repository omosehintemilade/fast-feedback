import React from "react"
import { Button, Heading, Flex, Text } from "@chakra-ui/react"
import AddSiteModal from "./AddSiteModal"

const EmptyState = () => (
  <Flex width="100%" backgroundColor="white" borderRadius="8px" p={16} justify="center" align="center" direction="column">
    <Heading size="lg" mb={2}>
      Get feedback on your site
    </Heading>
    <Text mb={4}>Start today and grow with us</Text>
    <AddSiteModal>Add Your First Site</AddSiteModal>
  </Flex>
)

export default EmptyState
