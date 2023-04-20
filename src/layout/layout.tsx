import Navbar from "@/components/navbar/navbar"
import { Box } from "@chakra-ui/react"

const Layout = ({children}: any): JSX.Element => {
  return (
    <Box h={"100vh"} minHeight={"100vh"} w={"100%"} display={"flex"} flexDirection={"column"} justifyContent={"space-between"} alignItems={"start"} >
        <Navbar/>
        {children}
    </Box>
  )
}

export default Layout