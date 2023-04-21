import { Context } from "@/pages/_app"
import { ArrowRightIcon, AttachmentIcon, SmallCloseIcon } from "@chakra-ui/icons"
import { Box, Button, Input, InputGroup, InputLeftElement, InputRightElement, Text } from "@chakra-ui/react"
import { useContext, useState } from "react"
import { useAuthState } from "react-firebase-hooks/auth"
import { doc, setDoc } from "firebase/firestore"; 

const InputField = () => {

    const [value, setValue] = useState('')

    const { auth, db, chatNow, reply, setReply } = useContext(Context)
    const [user]: any = useAuthState(auth)

    const sendMessage = async () => {
        if (value) {
            const messagesRef = doc(db, 'messages', `${new Date().getTime()}`);
            setValue('')
            await setDoc(messagesRef, { uid: user.uid,
                displayName: user.displayName,
                photoURL: user.photoURL,
                text: value,
                chatId: chatNow.id,
                createdAt: `${new Date().getHours()}:${new Date().getMinutes().toString().length == 1 ? `0${new Date().getMinutes()}` : new Date().getMinutes()}`,
                timestamp: `${new Date().getTime()}`,
                replyTo: reply
            }, { merge: true });
            if (reply) {
                setReply(null)
            }
        }
    }

    const handleKeyDown = (e: any) => {
        if (e.key === 'Enter') {
            sendMessage()
        }
    }

    return (
        <>
            { 
            !chatNow.isChannel 
            ? 
            <Box zIndex={"100"} bottom={"0"} w={"100%"} position={{base: "fixed", lg: "static"}}>
                <InputGroup display={"flex"} alignItems={"center"} justifyContent={"center"}>
                    <InputLeftElement height={"100%"} border={"2px solid #1F2E3D"} borderRadius={"10px"} display={reply && "flex" || "none"} justifyContent={"start"} alignItems={"center"} w={"120px"}>
                        <SmallCloseIcon fontSize={"28px"} cursor={"pointer"} px={"5px"} onClick={() => setReply(null)} />
                        <Text height={"25px"} textOverflow={"ellipsis"} overflow={"hidden"} whiteSpace={"nowrap"} fontSize={"14px"} maxW={"100px"} pr={"10px"}>{reply}</Text>
                    </InputLeftElement>
                    <Input onKeyDown={handleKeyDown} value={value} onChange={e => setValue(e.target.value)} variant='flushed' bg={"#18222E"} borderColor={"#18222E"} size={"lg"} fontSize={"14px"} borderRadius={"0"} placeholder='Habaringiz...' pl={reply && "130px" || "20px"} />
                    <InputRightElement>
                        <Box onClick={sendMessage} w={"50px"}>
                            <ArrowRightIcon fontSize={"lg"} _hover={{color: "#B0B0B0"}} cursor={"pointer"} />
                        </Box>
                    </InputRightElement>
                </InputGroup>
            </Box> 
            :
            user?.uid === chatNow.isMine 
            ? 
            <Box zIndex={"100"} bottom={"0"} w={"100%"} position={{base: "fixed", lg: "static"}}>
                <InputGroup display={"flex"} alignItems={"center"} justifyContent={"center"}>
                    <InputLeftElement height={"100%"} border={"2px solid #1F2E3D"} borderRadius={"10px"} display={reply && "flex" || "none"} justifyContent={"start"} alignItems={"center"} w={"120px"}>
                        <SmallCloseIcon fontSize={"28px"} cursor={"pointer"} px={"5px"} onClick={() => setReply(null)} />
                        <Text height={"25px"} textOverflow={"ellipsis"} overflow={"hidden"} whiteSpace={"nowrap"} fontSize={"14px"} maxW={"100px"} pr={"10px"}>{reply}</Text>
                    </InputLeftElement>
                    <Input onKeyDown={handleKeyDown} value={value} onChange={e => setValue(e.target.value)} variant='flushed' bg={"#18222E"} borderColor={"#18222E"} size={"lg"} fontSize={"14px"} borderRadius={"0"} placeholder='Postingiz...' pl={reply && "130px" || "20px"} />
                    <InputRightElement>
                        <Box onClick={sendMessage} w={"50px"}>
                            <ArrowRightIcon fontSize={"lg"} _hover={{color: "#B0B0B0"}} cursor={"pointer"} />
                        </Box>
                    </InputRightElement>
                </InputGroup>
            </Box> 
            :
            <Box display={"flex"} gap={"5px"} alignItems={"center"} justifyContent={"start"} zIndex={"100"} bg={"#18222E"} bottom={"0"} w={"100%"} position={{base: "fixed", lg: "static"}}>
                <Text paddingX={"20px"} py={"12px"} fontWeight={"bold"} visibility={"hidden"}>{chatNow.displayName}</Text>
            </Box> 
            }
        </>
    )
}

export default InputField