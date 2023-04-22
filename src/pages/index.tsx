import Layout from "@/layout/layout"
import { Box } from "@chakra-ui/react"
import Sidebar from "../components/sidebar/sidebar"
import Top from "@/components/top/top"
import InputField from "@/components/input/input"
import MessagesBox from "@/components/messagesBox/messagesBox"
import React, { useRef, useState, useContext, useEffect, MutableRefObject } from "react"
import { Context } from "./_app"
import { useRouter } from "next/router"
import { onAuthStateChanged } from "firebase/auth"
import { useAuthState } from "react-firebase-hooks/auth"

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

const Index = (): JSX.Element => {

    const { auth } = useContext(Context)
    const [user] = useAuthState(auth)

    const router = useRouter()

    const swiperRef = useRef<any>(null)

    onAuthStateChanged(auth, (user) => {
        if (user) {
            return;
        } else {
            router.push('/login')
        }
    });

    useEffect(() => {
        localStorage.setItem("chakra-ui-color-mode", "dark")
    }, [])

    return (
        <Box bg='#0E1924'>
            <Layout>
                <Box pt={"50px"} h={"100vh"} w={"100%"} display={{base: "none", lg: "flex"}} justifyContent={"space-between"} alignItems={"start"} flexDirection={{base: "column", lg: "row"}}>
                    <Sidebar/>
                    <Box w={"100%"} height={"100vh"} display={"flex"} flexDirection={"column"} alignItems={"stretch"} justifyContent={"space-between"} >
                        <Top />
                        <Box display={"flex"} height={`80vh`} flexDirection={"column"} justifyContent={"stretch"} alignItems={"start"} >
                            <MessagesBox/>
                        </Box>
                        <Box>
                            <InputField/>
                        </Box>
                    </Box>
                </Box>
                <Swiper 
                onBeforeInit={(swiper) => {
                    swiperRef.current = swiper;
                }} className="swiperApp w-full">
                    <SwiperSlide className="w-full">
                        <Sidebar {...{ swipeRight: swiperRef }} />
                    </SwiperSlide>
                    <SwiperSlide>
                        <Box w={"100%"} height={"100%"} display={"flex"} flexDirection={"column"} alignItems={"stretch"} justifyContent={"space-between"} >
                            <Top {...{ swipeLeft: swiperRef }} />
                            <Box pb={"90px"} display={"flex"} height={`80vh`} flexDirection={"column"} justifyContent={"stretch"} alignItems={"start"} >
                                <MessagesBox/>
                            </Box>
                            <Box>
                                <InputField/>
                            </Box>
                        </Box>
                    </SwiperSlide>
                </Swiper>
            </Layout>
        </Box>
    )
}

export default Index