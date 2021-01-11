import Head from "next/head"
import { Flex, Heading, Button, Text, Code } from "@chakra-ui/react"

// components
import { useAuth } from "@/lib/auth"
import { Google, Logo, Github } from "@/styles/icons"

const Home = () => {
  const auth = useAuth()
  // console.log(auth)
  return (
    <div maxW="400px" margin="0 auto">
      <Head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
          if(document.cookie && document.cookie.includes('fast-feedback-auth')){
            window.location.href = "/dashboard"
          }
        `
          }}
        />
        <title>Fast Feedback</title>
      </Head>
      <Flex
        as="main"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        height="100vh"
      >
        <Logo boxSize="32px" />
        <Text p={5}>
          {
            "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quo voluptate earum beatae harum! Molestiae est dolores cum rerum ducimus rem, odio minima natus ratione tempora accusamus magni maiores nulla nisi?          "
          }
        </Text>
        {auth.user ? (
          <Button
            display="grid"
            place-content="center"
            as="a"
            href="/dashboard"
          >
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
