import { Context } from '@/pages/_app'
import { Box, Button, Input, MenuItem, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, useDisclosure } from '@chakra-ui/react'
import { doc, setDoc } from 'firebase/firestore'
import React, { useContext, useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'

const Channel = () => {

    const { isOpen, onOpen, onClose } = useDisclosure()

    const { auth, db } = useContext(Context)
    const [user]: any = useAuthState(auth)

    const [imgUrl, setImgUrl] = useState('')
    const [descChat, setDescChat] = useState('')
    const [nameChat, setNameChat] = useState('')

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

                isChannel: true,

                id: `${new Date().getTime()}`
            }, { merge: true });
        }
    }

    return (
        <>
            <MenuItem onClick={onOpen}>Kanal ochish</MenuItem>

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Kanal ochish</ModalHeader>
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
                        <Button onClick={addChannel} colorScheme={'blue'} mr={3}>Ochish</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

export default Channel