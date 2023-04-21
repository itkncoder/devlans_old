import { Context } from "@/pages/_app"
import { ChevronLeftIcon, HamburgerIcon } from "@chakra-ui/icons"
import { Avatar, Box, Text, Menu, MenuButton, MenuList, MenuItem, Modal, useDisclosure, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Button } from "@chakra-ui/react"
import { collection, deleteDoc, doc, getFirestore } from "firebase/firestore"
import { forwardRef, useContext } from "react"
import { useAuthState } from "react-firebase-hooks/auth"
import { useCollection } from "react-firebase-hooks/firestore"

const Top = ({swipeLeft}: any): JSX.Element => {

    const { auth, db, firebase, chatNow } = useContext(Context)
    const [user]: any = useAuthState(auth)

    const { isOpen, onOpen, onClose } = useDisclosure()

    const [value] = useCollection(
        collection(getFirestore(firebase), 'messages'),
        {
            snapshotListenOptions: { includeMetadataChanges: true },  
        }
    );

    const clearChat = () => {
        const allMessages = value?.docs.sort((b: any, a: any) => b.data().timestamp - a.data().timestamp)
        const thisChatMessages = allMessages?.filter(i => chatNow.id === i.data().chatId)

        thisChatMessages?.map(i => {
            const messagesRef = doc(db, 'messages', `${i.id}`)
            deleteDoc(messagesRef)
        })
    }

    return (
        <Box _hover={{bg: "#17202C"}} bg={"#18222E"} cursor={"pointer"} margin={"15px"} borderRadius={"12.5px"} border={"2px solid #1F2E3D"} paddingX={"20px"} paddingY={"10px"} display={"flex"} justifyContent={"space-between"} alignItems={"center"}>
            <Box w={"100%"} display={"flex"} justifyContent={"start"} alignItems={"center"} gap={"15px"}>
                <ChevronLeftIcon onClick={() => swipeLeft?.current.slidePrev()} display={{base: "flex", lg: "none"}} fontSize={"2xl"} />
                <Box onClick={onOpen}  w={"100%"} display={"flex"} justifyContent={"start"} alignItems={"center"} gap={"15px"}>
                    <Avatar bg={"#0E1924"} size={"sm"} src={chatNow.photoURL}/>
                    <Text fontSize={"18px"} fontWeight={"bold"} textOverflow={"ellipsis"} overflow={"hidden"} whiteSpace={"nowrap"} maxWidth={"400px"}>{chatNow?.displayName}</Text>
                </Box>
            </Box>

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader><Text fontWeight={"bold"}>{chatNow?.displayName} {chatNow.isChannel ? "KANALI" : "GURUHI"} </Text></ModalHeader>
                    <ModalCloseButton />
                    <ModalBody display={"flex"} flexDirection={"column"} gap={"20px"} justifyContent={"start"}>
                        <Box display={"flex"} flexDirection={"row"} gap={"10px"} alignItems={"center"} justifyContent={"start"}>
                            <Avatar onClick={onOpen} cursor={"pointer"} name={chatNow?.displayName} src={chatNow?.photoURL}/>
                            <Text fontSize={"xl"} fontWeight={"bold"}>{chatNow?.displayName}</Text>
                        </Box>
                        <Box>
                            <Text paddingX={"10px"} fontWeight={"bold"}>{chatNow?.description}</Text>
                        </Box>
                    </ModalBody>

                    <ModalFooter>
                        <Button onClick={onClose} colorScheme={'blue'} mr={3}>Yopish</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>

            {user?.uid === chatNow.isMine ? <Menu>
                <MenuButton>
                    <HamburgerIcon fontSize="28px" />
                </MenuButton>
                <MenuList border="0">
                    <MenuItem onClick={clearChat}>Tozalash</MenuItem>
                </MenuList>
            </Menu> : ''}
        </Box>
    )
}

export default Top