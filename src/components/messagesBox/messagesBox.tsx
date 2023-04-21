import { Avatar, Box, Text } from "@chakra-ui/react"
import Message from "../message/message"
import { collection, getFirestore } from "firebase/firestore";
import { useContext, useEffect, useRef, useState } from "react";
import { Context } from "@/pages/_app";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from 'react-firebase-hooks/firestore';
import Loader from "../loader/loader";
import { ChevronDownIcon } from "@chakra-ui/icons";

const MessagesBox = () => {

    const { auth, firebase, chatNow } = useContext(Context)
    const [user]: any = useAuthState(auth)

    const box = useRef<any>(null)

    useEffect(() => {
        box?.current?.scrollTo(0, box.current.scrollHeight)
    })

    const [sorted, setSorted] = useState<any | undefined[]>([])

    const [value, loading, error] = useCollection(
        collection(getFirestore(firebase), 'messages'),
        {
            snapshotListenOptions: { includeMetadataChanges: true },    
        }
    );

    useEffect(() => {
        const filtered = value?.docs.sort((b: any, a: any) => b.data().timestamp - a.data().timestamp)
        setSorted(filtered)
    }, [value])

    if (loading) {
        return (
            <Box width={"100%"} display={"flex"} justifyContent={"center"} alignItems={"center"} height={"100%"} >
                <Loader/>
            </Box>
        )
    }

    return (
        <Box ref={box} scrollBehavior={"smooth"} padding={"20px"} overflow={"auto"} w={"100%"} height={"100%"} display={"flex"} flexDirection={"column"} gap={"12px"} alignItems={"start"} justifyContent={"start"} >
            <Box cursor={"pointer"} _hover={{bg: "#1C2835"}} bg={"#18222E"} borderRadius={"50%"} w={"40px"} height={"40px"} display={"flex"} justifyContent={"center"} alignItems={"center"} onClick={() => box?.current?.scrollTo(0, box.current.scrollHeight)} position={"fixed"} zIndex={"210"} bottom={"60px"} right={"20px"}>
                <ChevronDownIcon fontSize={"xl"} fontWeight={"bold"} />
            </Box>
            {sorted?.map((i: any) => 
                <Message reply={i.data().replyTo} id={i.id} key={i.data().timestamp} text={i.data().text} ava={i.data().photoURL} createdAt={i.data().createdAt} name={i.data().displayName} isMine={i.data().uid == user?.uid ? true : false} isAllow={chatNow.id === i.data().chatId} />
            )}
        </Box>
    )
}

export default MessagesBox