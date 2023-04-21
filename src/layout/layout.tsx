import Navbar from "@/components/navbar/navbar"
import { Box } from "@chakra-ui/react"
import Head from "next/head"

const Layout = ({children}: any): JSX.Element => {
  return (
    <Box w={"100%"} display={"flex"} flexDirection={"column"} justifyContent={"space-between"} alignItems={"start"} >
        <Head>
          <title>DEVLANS</title>
          <link rel="shortcut icon" href="logo.png" type="image/x-icon" />
          <meta name="viewport" content="width=device-width, initial-scale=0.85" />
          <meta name="description" content="DEVLANS - simple online chat by KNCoder" />
          <meta name="keywords" content="devlans, kncoder" />
          <meta http-equiv="Content-Type" content="text/html;charset=UTF-8" />
        </Head>
        <Navbar/>
        {children}
    </Box>
  )
}

export default Layout