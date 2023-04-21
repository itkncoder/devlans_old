import Layout from '@/layout/layout'
import { Box, Button, Card, Text } from '@chakra-ui/react'
import Image from 'next/image'
import logo from "../assets/logo.png"
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useContext, useEffect } from 'react'
import { Context } from './_app'
import { GoogleAuthProvider, onAuthStateChanged, signInWithPopup } from "firebase/auth";
import { useAuthState } from 'react-firebase-hooks/auth'
import { doc, deleteDoc, setDoc } from "firebase/firestore";

const Login = (): JSX.Element => {

    const { auth, db } = useContext(Context)
    const [user]: any = useAuthState(auth)

    const router = useRouter()

    onAuthStateChanged(auth, (user) => {
        if (user) {
            router.push('/')
        }
    });

    useEffect(() => {
        localStorage.setItem("chakra-ui-color-mode", "dark")
    }, [])

    const onSubmit = async () => {
        const provider = new GoogleAuthProvider()
        const chatsRef = doc(db, 'chats', `${new Date().getMilliseconds()}`);

        await signInWithPopup(auth, provider);
    }

    return (
        <Box className='loginBG' h={"100vh"}>
            <Layout>
                <Box h={"100%"} w={"100%"} display="flex" justifyContent="start" pt={"150px"} gap={"30px"} flexDirection={"column"} alignItems="center">
                    <Box display={"flex"} justifyContent={"center"} alignItems={"center"} flexDirection={"column"} gap={"5px"} >
                        <Link href={"/"}>
                            <Image alt='logo' className='w-20' width={500} height={500} src={logo} />
                        </Link>
                        <Text fontSize={"2xl"} fontWeight={"bold"}>DEVLANS</Text>
                    </Box>
                    <Card boxShadow={"0px 0px 40px #161616"} maxW={"450px"} w={"90%"} padding={"60px"} borderRadius={"15px"}>
                        <Text fontSize={"26px"} textAlign={"start"} ml={"20px"} mb={"10px"} fontWeight={"bold"} >Kirish</Text>
                        <form className='flex justify-center items-center flex-col gap-[15px] w-full' onSubmit={() => console.log("siu")} >
                            <Box mt={"8px"} paddingX={"10px"} display={"flex"} flexDirection={"column"} justifyContent={"end"} w={"100%"} >
                                <Button onClick={onSubmit} paddingX={"30px"} colorScheme='blue'>Google orqali kirish</Button>
                            </Box>
                        </form>
                    </Card>
                </Box>
            </Layout>
        </Box>
    )
}

export default Login