import Head from "next/head"
import { Flex, Heading, Button, Text, Code, Link } from "@chakra-ui/react"

// components
import { useAuth } from "@/lib/auth"
import { Google, Logo, Github } from "@/styles/icons"

const Home = () => {
  const auth = useAuth()
  // console.log(auth)
  return (
    <div maxwidth="400px" margin="0 auto">
      <Head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
          if(document.cookie && document.cookie.includes('fast-feedback-auth')){
            window.location.href = "/sites"
          }
        `
          }}
        />
      </Head>
      <Flex
        as="main"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        height="100vh"
      >
        <Logo boxSize="32px" />
        <Text mb={4} fontSize="lg" py={4}>
          <Text as="span" fontWeight="bold" display="inline">
            Fast Feedback
          </Text>
          {" was built as part of "}
          <Link
            href="https://react2025.com"
            isExternal
            textDecoration="underline"
          >
            React 2025
          </Link>
          {`. It's the easiest way to add comments or reviews to your static site. Try it out by leaving a comment below. After the comment is approved, it will display below.`}
        </Text>
        {auth.user ? (
          <Button display="grid" place-content="center" as="a" href="/sites">
            View Dashboard
          </Button>
        ) : (
          <>
            <Button
              display="block"
              mt={4}
              size="sm"
              leftIcon={<Github />}
              onClick={e => auth.signinWithGitHub()}
            >
              Sign in with Github
            </Button>

            <Button
              display="block"
              mt={4}
              size="sm"
              leftIcon={<Google />}
              onClick={e => auth.signinWithGoogle()}
            >
              Sign in with Google
            </Button>
          </>
        )}
      </Flex>
    </div>
  )
}
export default Home
