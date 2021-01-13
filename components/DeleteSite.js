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

import { deleteSite } from "@/lib/db"
import { useAuth } from "@/lib/auth"

const DeleteSite = ({ id }) => {
  const [isOpen, setIsOpen] = React.useState(false)
  const cancelRef = React.useRef()

  const auth = useAuth()
  const onClose = () => setIsOpen(false)

  const onDelete = () => {
    deleteSite(id)
    // console.log(id)
    mutate(
      ["/api/sites", auth?.user?.token],
      async data => {
        return {
          sites: data.sites.filter(sites => sites.id !== id)
        }
      },
      false
    )
    onClose()
  }

  return (
    <>
      <IconButton
        aria-label="Delete site"
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
              Delete Site
            </AlertDialogHeader>
            <AlertDialogBody>
              Are you sure?! All Feedback for this site will be lost . You can't
              undo this action afterwards.
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
export default DeleteSite
