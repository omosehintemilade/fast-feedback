import React from "react"
import { Box, Code } from "@chakra-ui/react"
import { Switch, Table, Tr, Th, Td, IconButton } from "@chakra-ui/react"

import RemoveButton from "./RemoveButton"

const FeedbackTable = ({ allFeedback }) => {
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
          {allFeedback.map(feedback => {
            return (
              <Box as="tr" key={feedback.id}>
                <Td>{feedback.author}</Td>
                <Td>{feedback.text}</Td>
                <Td>
                  <Code>{"/"}</Code>
                </Td>
                <Td>
                  {/* {feedback.status} */}
                  <Switch
                    variant="green"
                    defaultChecked={feedback.status === "active" ? true : false}
                  />
                </Td>
                <Td>
                  <RemoveButton feedbackId={feedback.id} />
                </Td>
              </Box>
            )
          })}
        </tbody>
      </Table>
    </Box>
  )
}

export default FeedbackTable
