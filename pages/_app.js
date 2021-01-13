import { AuthProvider } from "@/lib/auth"
import customTheme from "@/styles/theme"
import { Global, css } from "@emotion/react"
import { CSSReset } from "@chakra-ui/react"
import { ThemeProvider } from "@emotion/react"

import { DefaultSeo } from "next-seo"
import SEO from "../next.seo.config"

const GlobalStyle = ({ children }) => {
  return (
    <>
      <CSSReset />
      <Global
        styles={css`
          html {
            min-width: 360px
            scroll-behavior: smooth;
            background-color: #edf2f7
          }

          #__next {
            display: flex;
            flex-direction: column;
            min-height: 100%;
               
          }
        `}
      />
      {children}
    </>
  )
}

const App = ({ Component, pageProps }) => {
  return (
    <ThemeProvider theme={customTheme}>
      <AuthProvider>
        <GlobalStyle />
        <DefaultSeo {...SEO} />
        <Component {...pageProps} />
      </AuthProvider>
    </ThemeProvider>
  )
}

export default App
