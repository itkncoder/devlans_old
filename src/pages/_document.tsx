import { Html, Main, NextScript, Head } from 'next/document'
import { useEffect } from 'react'

const _document = () => {

  useEffect(() => {
    localStorage.setItem("chakra-ui-color-mode", "dark")
  }, [])

  return (
      <Html lang='en'>
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
}

export default _document