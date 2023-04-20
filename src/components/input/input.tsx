import { Context } from "@/pages/_app"
import { ArrowRightIcon, AttachmentIcon } from "@chakra-ui/icons"
import { Box, Input, InputGroup, InputLeftElement, InputRightElement } from "@chakra-ui/react"
import { useContext, useEffect, useState } from "react"
import { useAuthState } from "react-firebase-hooks/auth"
import { collection, doc, getFirestore, setDoc } from "firebase/firestore"; 

const InputField = () => {

    const [value, setValue] = useState('')

    const { auth, db, firebase } = useContext(Context)
    const [user]: any = useAuthState(auth)

    const sendMessage = async () => {
        const messagesRef = doc(db, 'messages', `${new Date().getMilliseconds()}`);
        setValue('')
        await setDoc(messagesRef, { uid: user.uid,
            displayName: user.displayName,
            photoURL: user.photoURL,
            text: value,
            createdAt: `${new Date().getHours()}:${new Date().getMinutes().toString().length == 1 ? `0${new Date().getMinutes()}` : new Date().getMinutes()}`,
            timestamp: `${new Date().getTime()}`
        }, { merge: true });
    }

    const handleKeyDown = (e: any) => {
        if (e.key === 'Enter') {
            sendMessage()
        }
    }

    return (
        <Box>
            <InputGroup display={"flex"} alignItems={"center"} justifyContent={"center"}>
                <InputLeftElement
                    marginX={"10px"}
                    color='gray.300'
                    children={
                        <Box display={"flex"} justifyContent={"center"} alignItems={"center"}>
                            <input style={{display: "none", width: "70px"}} id="file" type="file" />
                            <label style={{width: "70px"}} htmlFor="file">
                                <AttachmentIcon w={"70px"} fontSize={"lg"} _hover={{color: "#B0B0B0"}} cursor={"pointer"} />
                            </label>
                        </Box>
                    }
                />
                <Input onKeyDown={handleKeyDown} value={value} onChange={e => setValue(e.target.value)} variant='flushed' bg={"#18222E"} borderColor={"#18222E"} paddingLeft={"55px"} size={"lg"} fontSize={"14px"} borderRadius={"0"} placeholder='Yozing...' />
                <InputRightElement children={
                    <Box onClick={sendMessage} w={"50px"}>
                        <ArrowRightIcon fontSize={"lg"} _hover={{color: "#B0B0B0"}} cursor={"pointer"} />
                    </Box>
                } />
            </InputGroup>
        </Box>
    )
}

export default InputField