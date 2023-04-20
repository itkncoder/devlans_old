import Layout from "@/layout/layout"
import { Box } from "@chakra-ui/react"
import Sidebar from "../components/sidebar/sidebar"
import Top from "@/components/top/top"
import InputField from "@/components/input/input"
import MessagesBox from "@/components/messagesBox/messagesBox"
import { useContext, useEffect } from "react"
import { Context } from "./_app"
import { useRouter } from "next/router"
import { onAuthStateChanged } from "firebase/auth"
import { useAuthState } from "react-firebase-hooks/auth"

const Index = (): JSX.Element => {

    const { auth } = useContext(Context)
    const [user] = useAuthState(auth)

    const router = useRouter()

    onAuthStateChanged(auth, (user) => {
        if (user) {
            return;
        } else {
            router.push('/login')
        }
    });

    return (
        <Box bg='#0E1924' h={"100vh"}>
            <Layout>
                <Box h={"100%"} w={"100%"} display={"flex"} justifyContent={"space-between"} alignItems={"start"} flexDirection={"row"}>
                    <Sidebar/>
                    <Box w={"100%"} height={"100%"} display={"flex"} flexDirection={"column"} alignItems={"stretch"} justifyContent={"space-between"} >
                        <Top />
                        <Box display={"flex"} flexDirection={"column"} justifyContent={"start"} alignItems={"start"} >
                            <MessagesBox/>
                        </Box>
                        <Box>
                            <InputField/>
                        </Box>
                    </Box>
                </Box>
            </Layout>
        </Box>
    )
}

export default Index