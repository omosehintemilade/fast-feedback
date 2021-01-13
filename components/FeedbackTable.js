import React from "react"
import { Box } from "@chakra-ui/react"
import { Table, Tr, Th } from "@chakra-ui/react"

import FeedbackRow from "./FeedbackRow"

const FeedbackTable = ({ feedback }) => {
  return (
    <Box>
      <Table w="full">
        <thead>
          <Tr>
            <Th>Name</Th>
            <Th>Feedback</Th>
            <Th>Routes</Th>
            <Th>Visibiity</Th>
            <Th width="50px">{""}</Th>
          </Tr>
        </thead>
        <tbody>
          {feedback.map(feedback => {
            return <FeedbackRow key={feedback.id} {...feedback} />
          })}
        </tbody>
      </Table>
    </Box>
  )
}

export default FeedbackTable
