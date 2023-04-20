import { Avatar, Box, Text } from "@chakra-ui/react"
import Message from "../message/message"
import { collection, getFirestore } from "firebase/firestore";
import { useContext, useEffect, useState } from "react";
import { Context } from "@/pages/_app";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from 'react-firebase-hooks/firestore';

const MessagesBox = () => {

    const { auth, db, firebase } = useContext(Context)
    const [user]: any = useAuthState(auth)

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

    return (
        <Box padding={"20px"} overflow={"auto"} w={"100%"} height={"100%"} maxHeight={"79vh"} display={"flex"} flexDirection={"column"} gap={"12px"} alignItems={"start"} justifyContent={"start"} >
            {sorted?.map((i: any) => 
                <Message key={i.data().timestamp} text={i.data().text} ava={i.data().photoURL} createdAt={i.data().createdAt} name={i.data().displayName} isMine={i.data().uid == user?.uid ? true : false} />
            )}
        </Box>
    )
}

export default MessagesBox