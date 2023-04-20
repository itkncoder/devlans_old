import { Context } from "@/pages/_app";
import {  ExternalLinkIcon } from "@chakra-ui/icons"
import { Avatar, Box, Button, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Popover, PopoverArrow, PopoverBody, PopoverContent, PopoverTrigger, Text, useDisclosure } from "@chakra-ui/react"
import { doc, deleteDoc } from "firebase/firestore";
import { useContext } from "react";
import { useAuthState } from "react-firebase-hooks/auth";

const Message = ({isMine, name, text, ava, createdAt, id}: any) => {
    const { isOpen, onOpen, onClose } = useDisclosure()

    const { auth, db } = useContext(Context)
    const [user]: any = useAuthState(auth)

    const deleteMessage = async () => {
        await deleteDoc(doc(db, "messages", id))
    }

    return (
        <>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader><Text fontWeight={"bold"}>{name}</Text></ModalHeader>
                    <ModalCloseButton />
                    <ModalBody display={"flex"} flexDirection={"column"} gap={"20px"} justifyContent={"start"}>
                    <Box display={"flex"} flexDirection={"row"} gap={"10px"} alignItems={"center"} justifyContent={"start"}>
                        <Avatar onClick={onOpen} cursor={"pointer"} size={"md"} name={name} src={ava}/>
                        <Text fontSize={"xl"} fontWeight={"bold"}>{name}</Text>
                    </Box>
                    <Box display={"flex"} flexDirection={"column"} gap={"5px"} justifyContent={"start"}>
                        <Text fontSize={"lg"}>{name}ga xabar yozing:</Text>
                        <Input variant='filled' placeholder='Xabaringiz...' />
                        </Box>
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme={'blue'} mr={3}>Jo&apos;natish</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
            {!isMine ?<Box w={"100%"} display={"flex"} justifyContent={"start"} alignItems={"end"} gap={"10px"} >
                <Avatar onClick={onOpen} cursor={"pointer"} size={"sm"} name={name} src={ava}/>
                <Box display={"flex"} alignItems={"end"} justifyContent={"center"} gap={"5px"} >
                    <Box position={"relative"} boxShadow={"0px 0px 41px #0D0D0D"} minW={"120px"} border={"1px solid #1F2E3D"} maxWidth={"450px"} paddingX={"15px"} borderRadius={"15px 15px 15px 0"} paddingY={"5px"} bg={"#1F2732"}>
                        <Text onClick={onOpen} fontSize={"15px"} paddingY={"3px"} _hover={{color: "#E2E2E2"}} cursor={"pointer"} fontWeight={"bold"} >{name}</Text>
                        <Text paddingBottom={"15px"} fontSize={"14px"} >{text}</Text>
                        <Text position={"absolute"} bottom={"-5px"} right={"8px"} paddingBottom={"8px"} fontSize={"10px"} >{createdAt}</Text>   
                    </Box>
                    {/* <Box cursor={"pointer"} bg={"#eaeaea12"} display={"flex"} justifyContent={"center"} alignItems={"center"} width={"25px"} height={"25px"} rounded={"50%"}>
                        <ExternalLinkIcon fontSize={"12px"} _hover={{color: "#E2E2E2"}} />
                    </Box> */}
                </Box>
            </Box>
            :
            <Box w={"100%"} display={"flex"} justifyContent={"end"} >
                <Popover>
                    <PopoverTrigger>
                            <Box cursor={"pointer"} display={"flex"} justifyContent={"end"} alignItems={"end"} gap={"10px"} >
                                <Box position={"relative"} boxShadow={"0px 0px 41px #0D0D0D"} minW={"100px"} maxWidth={"450px"} paddingX={"15px"} borderRadius={"15px 15px 0 15px"} paddingY={"8px"} bg={"#088E9A"}>
                                    <Text paddingBottom={"8px"} fontSize={"14px"}>{text}</Text>
                                    <Text position={"absolute"} bottom={"-5px"} right={"8px"} paddingBottom={"8px"} fontSize={"10px"} >{createdAt}</Text>
                                </Box>
                            </Box>
                    </PopoverTrigger>
                    <PopoverContent border={"0"} w={"fit-content"} paddingX={"15px"} outline={"0"}>
                        <PopoverArrow />
                        <PopoverBody>
                            <Text onClick={deleteMessage} cursor={"pointer"} _hover={{color: "#E2E2E2"}}>O&apos;chirish</Text>
                        </PopoverBody>
                    </PopoverContent>
                </Popover>
            </Box>
            }
        </>
    )
}

export default Message