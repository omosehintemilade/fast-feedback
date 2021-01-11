import React from "react"
import { Box, Heading, Text, Divider } from "@chakra-ui/react"
import { format, parseISO } from "date-fns"

const Feedback = ({ author, createdAt, text }) => {
  return (
    <Box borderRadius={4} maxWidth="700px" w="full">
      <Heading size="sm" as="h3" mb={0} fontWeight="medium">
        {author}
      </Heading>
      <Text color="gray.500" mb={4} fontSize="xs">
        {format(parseISO(createdAt), "PPpp")}
      </Text>
      <Text mb={4} color="gray.500" fontWeight="medium" fontSize="sm">
        {text}
      </Text>
      <Divider borderColor="gray.200" background="red"></Divider>
    </Box>
  )
}

export default Feedback
