import { Flex, Heading } from "@chakra-ui/react"
import AddSiteModal from "./AddSiteModal"

const SiteTableHeader = () => (
  <Flex justifyContent="space-between">
    <Heading>My Sites</Heading>
    <AddSiteModal>+ Add Site</AddSiteModal>
  </Flex>
)

export default SiteTableHeader
