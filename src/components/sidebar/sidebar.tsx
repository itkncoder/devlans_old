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

const Sidebar = (): JSX.Element => {

    const { auth, db, firebase } = useContext(Context)
    const [user]: any = useAuthState(auth)

    const { isOpen, onOpen, onClose } = useDisclosure()

    const [ userName, setName ] = useState('')
    const [ msg, setMsg ] = useState('')

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

    return (
        <Box bg={"#18222E"} height={"100%"} maxHeight={'100%'} display={"flex"} alignItems={"start"} justifyContent={"start"}>
            <Box w={"70px"} display={"flex"} borderRight={"0.5px solid #2B2B2B"} padding={"20px"} justifyContent={"center"} alignItems={"end"} h={"100%"}>
                <ChatIcon cursor={"pointer"} _hover={{color: "#B0B0B0"}} fontSize={"24px"} onClick={onOpen}/>
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
            <Box w={"250px"} display={"flex"} flexDirection={"column"} alignItems={"start"} marginX={"15px"} pt={"15px"}>
                <Card border={"2px solid #1F2E3D"} bg={"#1C2835"} _hover={{bg: "#18222E"}} cursor={"pointer"} marginY={"5px"} paddingX={"12px"} paddingY={"7px"} width={"100%"} gap={"10px"} display={"flex"} flexDirection={"row"} justifyContent={"start"} alignItems={"center"}>
                    <Avatar size={"sm"} name="DEVLANS" src="https://github.com/itkncoder/devlans/blob/main/src/assets/logo.png?raw=true"/>
                    <Box display={"flex"} flexDirection={"column"} alignItems={"start"} maxW={"80%"}>
                        <Text fontWeight={"bold"} textOverflow={"ellipsis"} overflow={"hidden"} whiteSpace={"nowrap"} maxW={"100%"} fontSize={"18px"}>DEVLANS</Text>
                        <Text fontSize={"14px"} textOverflow={"ellipsis"} overflow={"hidden"} whiteSpace={"nowrap"} maxW={"180px"}>DEVLANS - community</Text>
                    </Box>
                </Card>
                {value?.docs.map(i => (
                    <Card border={"2px solid #1F2E3D"} bg={"#1C2835"} _hover={{bg: "#18222E"}} cursor={"pointer"} marginY={"5px"} paddingX={"12px"} paddingY={"7px"} width={"100%"} gap={"10px"} display={"flex"} flexDirection={"row"} justifyContent={"start"} alignItems={"center"}>
                        <Avatar size={"sm"} name={i.data().displayName} src={i.data().photoURL}/>
                        <Box display={"flex"} flexDirection={"column"} alignItems={"start"} maxW={"80%"}>
                            <Text fontWeight={"bold"} textOverflow={"ellipsis"} overflow={"hidden"} whiteSpace={"nowrap"} maxW={"100%"} fontSize={"18px"}>{i.data().displayName}</Text>
                            <Text fontSize={"14px"} textOverflow={"ellipsis"} overflow={"hidden"} whiteSpace={"nowrap"} maxW={"180px"}>- bu kanaldagi oxrigi post eng oxrigisi psot</Text>
                        </Box>
                    </Card>
                ))}
            </Box>
        </Box>
    )
}

export default Sidebar