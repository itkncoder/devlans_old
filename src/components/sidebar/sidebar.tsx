import { Context } from "@/pages/_app"
import { ChatIcon } from "@chakra-ui/icons"
import { Avatar, Box, Card, Text, Modal, Input,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    Button, } from "@chakra-ui/react"
import axios from "axios"
import { collection, getFirestore } from "firebase/firestore"
import { useContext, useEffect, useState } from "react"
import { useAuthState } from "react-firebase-hooks/auth"
import { useCollection } from "react-firebase-hooks/firestore"
import Loader from "../loader/loader"

const Sidebar = ({swipeRight}: any): JSX.Element => {

    const { auth, db, firebase, chatNow, setChatNow, search } = useContext(Context)
    const [user]: any = useAuthState(auth)

    const { isOpen, onOpen, onClose } = useDisclosure()

    const [ userName, setName ] = useState('')
    const [ msg, setMsg ] = useState('')

    const [sorted, setSorted] = useState<any | undefined[]>([])

    const [value, loading, error] = useCollection(
        collection(getFirestore(firebase), 'chats'),
        {
            snapshotListenOptions: { includeMetadataChanges: true },    
        }
    );

    const onSubmit = async () => {
        const TOKEN = '6219285371:AAGj1X5HDmpgKE4wTFISfHgb5wgNhErUm-g'
        const CHAT_ID = '-1001939464039'
        const URL_API = 'https://api.telegram.org/bot' + TOKEN + '/sendMessage'

        let message = `<b>IZOH</b>\n`
        message += `<b>Ism: ${userName}</b>\n`
        message += `<b>Izoh: ${msg}</b>\n`

        onClose()

        setMsg(''), setName('')

        await axios.post(URL_API, {
            chat_id: CHAT_ID,
            parse_mode: 'html',
            text: message
        })
    }

    useEffect(() => {
        const filtered = value?.docs.sort((a: any, b: any) => b.data().id - a.data().id)
        setSorted(filtered)

        if (search.length) {
            const searched = sorted?.filter((i: any) => i.data().displayName.toLowerCase().includes(search.trim().toLowerCase()))
            setSorted(searched) 
        }
    }, [value, search])

    return (
        <Box className="scroll" bg={"#18222E"} height={"100%"} overflowX={"hidden"} pr={{lg: "55px"}} display={"flex"} alignItems={"start"} justifyContent={"start"}>
            <Box display={{base: "none", lg: "flex"}} borderRight={"0.5px solid #2B2B2B"} padding={"30px"} justifyContent={"center"} alignItems={"end"} h={"100vh"}>
                <Box display={"flex"} justifyContent={"center"} >
                    <ChatIcon position={"fixed"} bottom={"20px"} cursor={"pointer"} _hover={{color: "#B0B0B0"}} fontSize={"24px"} onClick={onOpen}/>
                </Box>
                <Modal isOpen={isOpen} onClose={onClose}>
                    <ModalOverlay />
                    <ModalContent>
                        <ModalHeader>Murojaat qilish</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody display={"flex"} flexDirection={"column"} gap={"20px"} justifyContent={"start"}>
                        <Box display={"flex"} flexDirection={"column"} gap={"5px"} justifyContent={"start"}>
                            <Text fontSize={"lg"}>Ismingizni kiriting:</Text>
                            <Input value={userName} onChange={e => setName(e.target.value)} variant='filled' placeholder='Ismingiz...' />
                        </Box>
                        <Box display={"flex"} flexDirection={"column"} gap={"5px"} justifyContent={"start"}>
                            <Text fontSize={"lg"}>Izohingizni yozing:</Text>
                            <Input value={msg} onChange={e => setMsg(e.target.value)} variant='filled' placeholder='Izohingiz...' />
                            </Box>
                        </ModalBody>

                        <ModalFooter>
                            <Button colorScheme={'blue'} mr={3} onClick={onSubmit}>Jo&apos;natish</Button>
                        </ModalFooter>
                    </ModalContent>
                </Modal>
            </Box>
            <Box maxH={"100vh"} w={{base: "100%", lg: "250px"}} display={"flex"} flexDirection={"column"} alignItems={"start"} marginX={"15px"} pt={"5px"}>
                <Box position={"relative"} w={"100%"}>
                    {loading && 
                        <Box zIndex={"10"} top={"100px"} position={"absolute"} w={"100%"} display={"flex"} justifyContent={"center"}>
                            <Loader/>
                        </Box>
                    }
                </Box>
                {!search &&<Card onClick={() => {
                    setChatNow({
                        photoURL: "https://github.com/itkncoder/devlans/blob/main/src/assets/logo.png?raw=true",
                        displayName: "DEVLANS",
                        description: "Hamma foydalanuvchilar uchun DEVLANSning rasmiy guruhi",
                        isMine: 100,
                        id: 0
                    })
                    swipeRight?.current.slideNext()
                }}
                bg={chatNow?.id === 0 ? "#141D27" : "#1C2835"} border={"2px solid #1F2E3D"} _hover={{bg: "#18222E"}} cursor={"pointer"} marginY={"5px"} paddingX={"12px"} paddingY={"7px"} width={{base: "100%", lg: "250px"}} gap={"10px"} display={"flex"} flexDirection={"row"} justifyContent={"start"} alignItems={"center"}>
                    <Avatar size={"sm"} name="devlans" src="https://github.com/itkncoder/devlans/blob/main/src/assets/logo.png?raw=true"/>
                    <Box display={"flex"} flexDirection={"column"} alignItems={"start"} maxW={"80%"}>
                        <Text fontWeight={"bold"} textOverflow={"ellipsis"} overflow={"hidden"} whiteSpace={"nowrap"} maxW={"100%"} fontSize={"18px"}>DEVLANS</Text>
                        <Text fontSize={"14px"} textOverflow={"ellipsis"} overflow={"hidden"} whiteSpace={"nowrap"} maxW={"180px"}>DEVLANS - community</Text>
                    </Box>
                </Card>}
                {sorted?.map((i: any) => (
                    <Card onClick={() => {
                        setChatNow({
                            displayName: i.data().displayName,
                            photoURL: i.data().photoURL,
                            description: i.data().description,
                            isMine: i.data().isMine,
                            id: i.data().id
                        })
                        swipeRight?.current.slideNext()
                    }}
                    key={i.data().displayName} border={"2px solid #1F2E3D"} bg={chatNow?.id === i.data().id ? "#141D27" : "#1C2835"} _hover={{bg: "#18222E"}} cursor={"pointer"} marginY={"5px"} paddingX={"12px"} paddingY={"7px"} width={{base: "100%", lg: "250px"}} gap={"10px"} display={"flex"} flexDirection={"row"} justifyContent={"start"} alignItems={"center"}>
                        <Avatar size={"sm"} name={i.data().displayName} src={i.data().photoURL}/>
                        <Box display={"flex"} flexDirection={"column"} alignItems={"start"} maxW={"80%"}>
                            <Text fontWeight={"bold"} textOverflow={"ellipsis"} overflow={"hidden"} whiteSpace={"nowrap"} maxW={"100%"} fontSize={"18px"}>{i.data().displayName}</Text>
                            <Text fontSize={"14px"} textOverflow={"ellipsis"} overflow={"hidden"} whiteSpace={"nowrap"} maxW={"180px"}>{i.data().description}</Text>
                        </Box>
                    </Card>
                ))}
            </Box>
        </Box>
    )
}

export default Sidebar