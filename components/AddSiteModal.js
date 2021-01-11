import React from "react"
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Button,
  Input,
  useDisclosure
} from "@chakra-ui/react"
import { useForm } from "react-hook-form"
import { createSite } from "@/lib/db"
import { useToast } from "@chakra-ui/react"
import { useAuth } from "@/lib/auth"
import { mutate } from "swr"

const AddSiteModal = ({ children }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const initialRef = React.useRef()

  const { handleSubmit, register } = useForm()
  const toast = useToast()

  const auth = useAuth()

  const onCreateSite = ({ name, url }) => {
    const newSite = {
      authorId: auth.user.uid,
      createdAt: new Date().toISOString(),
      name,
      url
    }
    const { id } = createSite(newSite)
    toast({
      title: "Success",
      description: "We've added your site successfully.",
      status: "success",
      duration: 4000,
      isClosable: true
    })
    mutate(
      ["/api/sites", auth.user.token],
      async data => {
        return { sites: [...data.sites, { id, ...newSite }] }
      },
      false
    )
    onClose()
  }

  return (
    <>
      {/* <Button >{children}</Button> */}
      <Button
        onClick={onOpen}
        backgroundColor="gray.900"
        color="white"
        fontWeight="medium"
      >
        {children}
      </Button>

      <Modal initialFocusRef={initialRef} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent as="form" onSubmit={handleSubmit(onCreateSite)}>
          <ModalHeader>Add Site</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Name</FormLabel>
              <Input
                ref={initialRef}
                placeholder="Site"
                name="name"
                ref={register({
                  required: "Required"
                })}
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Link</FormLabel>
              <Input
                placeholder="https://website.com"
                name="url"
                ref={register({
                  required: "Required"
                })}
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button onClick={onClose} mr={3}>
              Cancel
            </Button>
            <Button
              background="#99FFFE"
              color="#194D4C"
              fontWeight="medium"
              type="submit"
            >
              Create
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}
export default AddSiteModal
