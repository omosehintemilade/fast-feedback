import React, { useState, useRef } from "react"
import {
  Button,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay
} from "@chakra-ui/react"
import { DeleteIcon } from "@chakra-ui/icons"
import { IconButton } from "@chakra-ui/react"
import { mutate } from "swr"

import { deleteFeedback } from "@/lib/db"
import { useAuth } from "@/lib/auth"

const RemoveButton = ({ feedbackId }) => {
  const [isOpen, setIsOpen] = React.useState(false)
  const cancelRef = React.useRef()

  const auth = useAuth()
  const onClose = () => setIsOpen(false)

  const onDelete = () => {
    // console.log(feedbackId)
    deleteFeedback(feedbackId)
    mutate(
      ["/api/feedback", auth?.user?.token],
      async data => {
        return {
          feedback: data.feedback.filter(feedback => feedback.id !== feedbackId)
        }
      },
      false
    )
    onClose()
  }

  return (
    <>
      <IconButton
        aria-label="Delete feedback"
        icon={<DeleteIcon />}
        variant="ghost"
        onClick={() => setIsOpen(true)}
      />

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            p
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete Feedback
            </AlertDialogHeader>
            <AlertDialogBody>
              Are you sure? You can't undo this action afterwards.
            </AlertDialogBody>
            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button colorScheme="red" onClick={onDelete} ml={3}>
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  )
}
export default RemoveButton
