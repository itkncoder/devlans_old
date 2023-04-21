import { HamburgerIcon } from "@chakra-ui/icons"
import { Avatar, Box, Input, Menu, MenuButton, MenuList, MenuItem, useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Button, Text } from "@chakra-ui/react"
import { useRouter } from "next/router"
import Link from "next/link"
import { useContext, useEffect, useState } from "react"
import { Context } from "@/pages/_app"
import { useAuthState } from 'react-firebase-hooks/auth';
import { signOut } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore"

const Navbar = (): JSX.Element => {

    const { auth, db, search, setSearch } = useContext(Context)
    const [user]: any = useAuthState(auth)

    const [imgUrl, setImgUrl] = useState('')
    const [descChat, setDescChat] = useState('')
    const [nameChat, setNameChat] = useState('')

    const router = useRouter()

    const [isHome, setHome] = useState(true)

    const { isOpen, onOpen, onClose } = useDisclosure()

    useEffect(() => {
        if (router.pathname !== "/") {
            setHome(false)
        }
    }, [router.pathname])

    const addChat = async () => {
        if (nameChat) {

            const chatsRef = doc(db, 'chats', `${new Date().getMilliseconds()}`);

            setImgUrl('')
            setDescChat('')
            setNameChat('')

            onClose()

            await setDoc(chatsRef, { uid: user.uid,
                displayName: nameChat,
                photoURL: imgUrl,
                description: descChat,
                isMine: user?.uid,
                id: `${new Date().getTime()}`
            }, { merge: true });
        }
    }

    const addChannel = async () => {
        if (nameChat) {

            const chatsRef = doc(db, 'chats', `${new Date().getMilliseconds()}`);

            setImgUrl('')
            setDescChat('')
            setNameChat('')

            onClose()

            await setDoc(chatsRef, { 
                uid: user.uid,
                displayName: nameChat,
                photoURL: imgUrl,
                description: descChat,
                isMine: user?.uid,
                id: `${new Date().getTime()}`
            }, { merge: true });
        }
    }

    return (
        <Box position={"absolute"} zIndex={"100"} bg={"#18222E"} paddingY={"8px"} borderBottom={"0.5px solid #2B2B2B"} paddingX="20px" w={"100%"} display="flex" justifyContent="space-between" alignItems="center">
            {!isHome && <Link className="hover:underline h-fit" style={{padding: "8px", fontSize: "18px"}} href={"https://t.me/kncoder"}>Murojaat uchun</Link>}
            {isHome && <Box display="flex" justifyContent="center" alignItems="center" gap="20px">
                <Menu>
                    <MenuButton>
                        <HamburgerIcon fontSize="28px" />
                    </MenuButton>
                    <MenuList border="0">
                        <MenuItem onClick={onOpen}>Guruh ochish</MenuItem>

                        <Modal isOpen={isOpen} onClose={onClose}>
                            <ModalOverlay />
                            <ModalContent>
                                <ModalHeader>Guruh ochish</ModalHeader>
                                <ModalCloseButton />
                                <ModalBody display={"flex"} flexDirection={"column"} gap={"20px"} justifyContent={"start"}>
                                    <Box display={"flex"} flexDirection={"column"} gap={"5px"} justifyContent={"start"}>
                                        <Text fontSize={"lg"}>Rasm URL:</Text>
                                        <Input value={imgUrl} onChange={e => setImgUrl(e.target.value)} variant='filled' placeholder='Rasm URL...' />
                                    </Box>
                                    <Box display={"flex"} flexDirection={"column"} gap={"5px"} justifyContent={"start"}>
                                        <Text fontSize={"lg"}>Nomini kiriting:</Text>
                                        <Input value={nameChat} onChange={e => setNameChat(e.target.value)} variant='filled' placeholder='Nomi...' />
                                    </Box>
                                    <Box display={"flex"} flexDirection={"column"} gap={"5px"} justifyContent={"start"}>
                                        <Text fontSize={"lg"}>Malumot kiriting:</Text>
                                        <Input value={descChat} onChange={e => setDescChat(e.target.value)} variant='filled' placeholder='Malumot...' />
                                    </Box>
                                </ModalBody>

                                <ModalFooter>
                                    <Button onClick={addChat} colorScheme={'blue'} mr={3}>Ochish</Button>
                                </ModalFooter>
                            </ModalContent>
                        </Modal>

                        <MenuItem><a target="_blank" href="https://t.me/kncoder">Contact</a></MenuItem>
                    </MenuList>
                </Menu>
            </Box>}
            {isHome && 
                <Menu>
                    <MenuButton>
                        <Avatar size={"sm"} name={user?.displayName} src={user?.photoURL}/>
                    </MenuButton>
                    <MenuList border="0">
                        <MenuItem onClick={() => signOut(auth)}>Profildan chiqish</MenuItem>
                    </MenuList>
                </Menu>
            }
        </Box>
    )
}

export default Navbar