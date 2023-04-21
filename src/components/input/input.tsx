import { Context } from "@/pages/_app"
import { ArrowRightIcon, AttachmentIcon } from "@chakra-ui/icons"
import { Box, Input, InputGroup, InputLeftElement, InputRightElement } from "@chakra-ui/react"
import { useContext, useState } from "react"
import { useAuthState } from "react-firebase-hooks/auth"
import { doc, setDoc } from "firebase/firestore"; 

const InputField = () => {

    const [value, setValue] = useState('')

    const { auth, db, chatNow } = useContext(Context)
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
                timestamp: `${new Date().getTime()}`
            }, { merge: true });
        }
    }

    const handleKeyDown = (e: any) => {
        if (e.key === 'Enter') {
            sendMessage()
        }
    }

    return (
        <Box>
            <InputGroup display={"flex"} alignItems={"center"} justifyContent={"center"}>
                <Input onKeyDown={handleKeyDown} value={value} onChange={e => setValue(e.target.value)} variant='flushed' bg={"#18222E"} borderColor={"#18222E"} paddingLeft={"20px"} size={"lg"} fontSize={"14px"} borderRadius={"0"} placeholder='Habaringiz...' />
                <InputRightElement>
                    <Box onClick={sendMessage} w={"50px"}>
                        <ArrowRightIcon fontSize={"lg"} _hover={{color: "#B0B0B0"}} cursor={"pointer"} />
                    </Box>
                </InputRightElement>
            </InputGroup>
        </Box>
    )
}

export default InputField