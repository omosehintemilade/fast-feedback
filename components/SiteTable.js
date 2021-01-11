import React from "react"
import NextLink from "next/link"
import { Box, Link } from "@chakra-ui/react"
import { parseISO, format } from "date-fns"
import { Table, Tr, Th, Td } from "@chakra-ui/react"

const SiteTable = ({ sites }) => {
  // console.log(sites.sites)
  // let site = sites.sites
  // return ""
  // console.log(site)
  return (
    <Box>
      <Table w="full">
        <thead>
          <Tr>
            <Th>Name</Th>
            <Th>Site Link</Th>
            <Th>Feedback Link</Th>
            <Th>Date Added</Th>
            <Th width="50px">{""}</Th>
          </Tr>
        </thead>
        <tbody>
          {sites.map(site => {
            return (
              <Box as="tr" key={site.id}>
                <Td>
                  <Link fontWeight="medium">{site.name}</Link>
                </Td>
                <Td>
                  <Link>{site.url}</Link>
                </Td>
                <Td>
                  <NextLink href="/p/[siteId]" as={`/p/${site.id}`} passHref>
                    <Link color="blue.500" fontWeight="medium">
                      View Feedback
                    </Link>
                  </NextLink>
                </Td>
                <Td>{format(parseISO(site.createdAt), "PPpp")}</Td>
                <Td></Td>
              </Box>
            )
          })}
        </tbody>
      </Table>
    </Box>
  )
}

export default SiteTable
