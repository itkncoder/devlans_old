import { Context } from "@/pages/_app"
import { HamburgerIcon } from "@chakra-ui/icons"
import { Avatar, Box, Text, Menu, MenuButton, MenuList, MenuItem } from "@chakra-ui/react"
import { collection, deleteDoc, doc, getFirestore } from "firebase/firestore"
import { useContext } from "react"
import { useAuthState } from "react-firebase-hooks/auth"
import { useCollection } from "react-firebase-hooks/firestore"

const Top = () => {

    const { auth, db, firebase } = useContext(Context)
    const [user]: any = useAuthState(auth)

    const [value] = useCollection(
        collection(getFirestore(firebase), 'messages'),
        {
            snapshotListenOptions: { includeMetadataChanges: true },  
        }
    );

    const clearChat = () => {
        const allMessages = value?.docs.sort((b: any, a: any) => b.data().timestamp - a.data().timestamp)

        allMessages?.map(i => {
            const messagesRef = doc(db, 'messages', `${i.id}`)
            deleteDoc(messagesRef)
        })
    }

    return (
        <Box bg={"#18222E"} margin={"15px"} borderRadius={"12.5px"} border={"2px solid #1F2E3D"} paddingX={"20px"} paddingY={"10px"} display={"flex"} justifyContent={"space-between"} alignItems={"center"}>
            <Box display={"flex"} justifyContent={"space-between"} alignItems={"center"} gap={"15px"}>
                <Avatar name="USER" size={"sm"} src='https://bit.ly/dan-abramov'/>
                <Text fontSize={"18px"} fontWeight={"bold"} textOverflow={"ellipsis"} overflow={"hidden"} whiteSpace={"nowrap"} maxWidth={"400px"}>KNCODER</Text>
            </Box>
            <Menu>
                <MenuButton>
                    <HamburgerIcon fontSize="28px" />
                </MenuButton>
                <MenuList border="0">
                    <MenuItem onClick={clearChat}>Tozalash</MenuItem>
                </MenuList>
            </Menu>
        </Box>
    )
}

export default Top