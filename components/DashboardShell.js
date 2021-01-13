import React from "react"
import NextLink from "next/link"
import { Box, Button, Flex, Link, Avatar, Heading } from "@chakra-ui/react"
import { NextSeo } from "next-seo"

import { useAuth } from "@/lib/auth"
import { Logo } from "@/styles/icons"

const DashboardShell = ({ children }) => {
  // const { user } = useAuth()

  const auth = useAuth()
  // const path = window.location.pathname
  // const name = path
  // const title = `Fast Feedback - ${name}`
  // const url = `https://fastfeedback.io/${path}`
  return (
    <>
      {/* <NextSeo
        title={title}
        canonical={url}
        openGraph={{
          url,
          title
        }}
      /> */}
      <Box backgroundColor="gray.100" h="100%">
        <Flex backgroundColor="white" mb={[8, 16]} w="full">
          <Flex
            alignItems="center"
            justifyContent="space-between"
            pt={4}
            pb={4}
            maxW="1250px"
            margin="0 auto"
            w="full"
            px={8}
            h="60px"
          >
            <Flex align="center">
              <NextLink href="/" passHref>
                <Logo boxSize="24px" mr={4} />
              </NextLink>
              <NextLink href="/sites" passHref>
                <Link mr={4}>Sites</Link>
              </NextLink>
              <NextLink href="/feedback" passHref>
                <Link>Feedback</Link>
              </NextLink>
            </Flex>
            <Flex justifyContent="center" alignItems="center">
              {auth?.user && (
                // <Link mr={4}>Account</Link>
                <Button
                  href="/"
                  as="a"
                  variant="ghost"
                  mr={2}
                  onClick={() => auth.signout()}
                >
                  Log Out
                </Button>
              )}

              <Link>
                <Avatar size="sm" src={auth?.user?.photoUrl} />
              </Link>
            </Flex>
          </Flex>
        </Flex>

        <Flex margin="0 auto" direction="column" maxW="1250px" px={[0, 8, 8]}>
          {children}
        </Flex>
      </Box>
    </>
  )
}

export default DashboardShell
