import React from "react"
import NextLink from "next/link"
import { Box, Link } from "@chakra-ui/react"
import { parseISO, format } from "date-fns"
import { Table, Tr, Th, Td } from "@chakra-ui/react"
import DeleteSite from "./DeleteSite"

const SiteTable = ({ sites }) => {
  // console.log(sites.sites)
  // let site = sites.sites
  // return ""
  // console.log(site)
  // replace(/\\n/g, "\n")
  // const hello = process.env.FIREBASE_PRIVATE_KEY
  const hi =
    "-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQCHW9xJqP7SkcIE\ngO1txqHlm/lhoz/cDeFHOtqUnE3BjaNxDKpNh6S9Ab09XpU0HNUuUVNY1annywL1\nRiDGfL9e+5V8i7xvrPxhhArxPLj8B80RiGiUzebVTcQRrtZzSWLihwwCRPI5huK6\nCfRJbXOONhbhU87OQEyz4Gz9BDK8CFbgI1oePK+8sdedzk62DxGwXfsQNnZE+rFu\nysXW47mDgSdE3Syp2ZJcfQNYw9StfOvMVc0u96OvOEuWaiUJHLB5pvS9gmFsBISF\nWimxxi21SND7gsIXnmR/R5Oh907NmGe8ZXiFTEJTbS/kR/f32HPcotpB8DvQP46G\nkzvOdo85AgMBAAECggEAA+gHBFPKYA9t6VbclnuYlJy+Fo8EfghWUGNJ4RpeSEzb\nFjb7gdRj3cK7cFZQZh1dGqKlGuFDSSnFWoimumVQJlo9q9QIwP+3SRiRzBLIs0wf\nVmQljoI46SSyJdRLovtpQIJAurg8j4paWzk3BPJ4PTbhTXXveAM7idpn35wIjpjm\n3fTS6ifZPKoHsQfpDikka4XRZd5e0J2VV+RnW6VENMLjVvl3AebjouDH+EfyXQv5\nudGDT8aEr/LycVO5ZBMCpO1fC18qvkKYykHXJH94BsjCQbgA/wQMDuAmszsl6tNK\nHHgUQyRnt5K32sxWeM9/D6ClSlVrncrTez1ljwkHjQKBgQC+saC3TpI8LQGIfJZ+\nojVNw544An0G2DyQIYTO/Sc3ZYztNxshNrryKsncjQyXAb4Y3yl4Y5mVDvCaxsMK\nwa6pK+DCFbG7ahyq+HdxdP3vu2U8EiWGGh56QBPv0soJAfmSl9AlQ4x+/ZiQyfuT\nqXCB2xWChnwPAw6ouVUfKQ/aTQKBgQC1tvDNwvDbNoJQu3If8JP1qIMwSseWsU5X\nPkwAQDqp8pnpjQJw/vy285BKqaUqTYAlSGjPRuZscZeVfKNwXSBxEEf945sPZzgB\nf85v4tMzz4n8Z9K4ATrERUAwvcVLbf7tpb0Nym7ZA9epxenfVDJZcIwn6+waxVI9\nGi/hNU9mnQKBgFU8tKf7GOaI/3xwpBxqiQT/gYNrqVMb6MZMFT8obRUX8Uw/K4NH\nIX0Jnz1UVuJQxxX6+mBztLyp9uZYHep69IVttYNLiyxInBPYCBvQvYkg7HlTay5s\nEl92sPKr997a4SGjdkiRzwUcecuOXUN9o2qH8S9syZs0NKM6ZFAPXKSpAoGASGGj\nj8J74EXZKMFRl0lkFnFWOFFBKVRdCUFmUp9C/tkE19P0SgA3t8RTEHp8sNoIFlG+\ndfoe5MlmgQQRsjtWJdM/afFUnZEW7Pn0x/qI+FVN+H1+oQ7UUsPm6sNcqEwbRJxF\nLw4Yk1cFe7m7C9tk5t1+5pQCCzPYK0CYG9P5Wb0CgYB9O4+n9AMg08VzsflApXyM\nsN2wHrVN3y/1VKk5Jd8Uy4tyS5uf0dRhwWVIKmRdbbktSOCYJ+6814BkUG0Y31sQ\nBFB8/XdaNMGxyn1qbokXstOmGiV+A1bHnQrGItSL8Yc4307CxQUQ5A2DZOpM9xde\nPKz1PsjqGIiutHWYbuAJug==\n-----END PRIVATE KEY-----\n"
  const hello = hi.replace(/\\n/g, "\n")
  console.log(hello)
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
                  <NextLink
                    href="/site/[siteId]"
                    as={`/site/${site.id}`}
                    passHref
                  >
                    <Link fontWeight="medium">{site.name}</Link>
                  </NextLink>
                </Td>

                <Td>
                  <Link href={site.url} isExternal>
                    {site.url}
                  </Link>
                </Td>

                <Td>
                  <NextLink
                    href="/feedback/[siteId]"
                    as={`/feedback/${site.id}`}
                    passHref
                  >
                    <Link color="blue.500" fontWeight="medium">
                      View Feedback
                    </Link>
                  </NextLink>
                </Td>

                <Td>{format(parseISO(site.createdAt), "PPpp")}</Td>

                <Td width="50px">
                  <DeleteSite id={site.id} />
                </Td>
              </Box>
            )
          })}
        </tbody>
      </Table>
    </Box>
  )
}

export default SiteTable
