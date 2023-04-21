import { Context } from "@/pages/_app";
import {  ExternalLinkIcon } from "@chakra-ui/icons"
import { Avatar, Box, Button, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Popover, PopoverArrow, PopoverBody, PopoverContent, PopoverTrigger, Text, useDisclosure } from "@chakra-ui/react"
import { doc, deleteDoc } from "firebase/firestore";
import Image from "next/image";
import Link from "next/link";
import { useContext } from "react";
import { useAuthState } from "react-firebase-hooks/auth";

const Message = ({isMine, name, text, ava, createdAt, id, isAllow, reply}: any) => {
    const { isOpen, onOpen, onClose } = useDisclosure()

    const { auth, db, setReply } = useContext(Context)
    const [user]: any = useAuthState(auth)

    const deleteMessage = async () => {
        await deleteDoc(doc(db, "messages", id))
    }

    return (
        <>{isAllow ? <>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader><Text fontWeight={"bold"}>{name}</Text></ModalHeader>
                    <ModalCloseButton />
                    <ModalBody display={"flex"} flexDirection={"column"} gap={"20px"} justifyContent={"start"}>
                    <Box display={"flex"} flexDirection={"row"} gap={"10px"} alignItems={"center"} justifyContent={"start"}>
                        <Avatar onClick={onOpen} cursor={"pointer"} size={"md"} name={name} src={ava}/>
                        <Text fontSize={"lg"} fontWeight={"bold"}>{name}</Text>
                    </Box>

                    </ModalBody>

                    <ModalFooter>
                        <Button onClick={onClose} colorScheme={'blue'} mr={3}>Yopish</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
            {!isMine ? <Box w={"100%"} display={"flex"} justifyContent={"start"} alignItems={"end"} gap={"10px"} >
                <Avatar onClick={onOpen} cursor={"pointer"} size={"sm"} name={name} src={ava}/>
                <Box display={"flex"} alignItems={"end"} justifyContent={"center"} gap={"5px"} >
                    <Box position={"relative"} boxShadow={"0px 0px 41px #0D0D0D"} minW={"120px"} border={"1px solid #1F2E3D"} maxWidth={"450px"} paddingX={"15px"} borderRadius={"15px 15px 15px 0"} paddingY={"5px"} bg={"#1F2732"}>
                        {!reply && <Text onClick={onOpen} fontSize={"15px"} paddingY={"3px"} _hover={{color: "#E2E2E2"}} cursor={"pointer"} fontWeight={"bold"} >{name}</Text>}
                        {reply && <Box paddingY={"4px"} display={"flex"} justifyContent={"start"} alignItems={"end"}>
                            <Text fontSize={"16px"} color={"#E2E2E2"} fontWeight={"bold"}>|</Text>
                            <Text textOverflow={"ellipsis"} overflow={"hidden"} whiteSpace={"nowrap"} maxW={"200px"} fontSize={"12px"} color={"#E2E2E2"}>{reply}</Text>
                        </Box>}
                        <Text paddingBottom={"15px"} fontSize={"14px"} >
                            {
                                text.includes("https://") 
                                ? 
                                    <>
                                        {
                                            text.includes("jpg") 
                                            ? <Image className="rounded-[30px] max-w-[250px] md:max-w-xs py-4" width={500} height={500} alt={text} src={text} /> 
                                            : 
                                            text.includes("png") 
                                            ? <Image className="rounded-[30px] max-w-[250px] md:max-w-xs py-4" width={500} height={500} alt={text} src={text} /> 
                                            : <a target="_blank" className="hover:underline" href={text}>{text}</a>
                                        }
                                    </>
                                : 
                                text
                            }  
                        </Text>
                        <Text position={"absolute"} bottom={"-5px"} right={"8px"} paddingBottom={"8px"} fontSize={"10px"} >{createdAt}</Text>   
                    </Box>
                    <Box onClick={() => setReply(text)} cursor={"pointer"} bg={"#eaeaea12"} display={"flex"} justifyContent={"center"} alignItems={"center"} width={"25px"} height={"25px"} rounded={"50%"}>
                        <ExternalLinkIcon fontSize={"12px"} _hover={{color: "#E2E2E2"}} />
                    </Box>
                </Box>
            </Box>
            :
            <Box w={"100%"} display={"flex"} justifyContent={"end"} >
                <Popover>
                    <PopoverTrigger>
                        <Box cursor={"pointer"} display={"flex"} justifyContent={"end"} alignItems={"end"} gap={"10px"} >
                            <Box position={"relative"} boxShadow={"0px 0px 41px #0D0D0D"} minW={"100px"} maxWidth={"450px"} paddingX={"15px"} borderRadius={"15px 15px 0 15px"} paddingY={"8px"} bg={"#088E9A"}>
                                {reply && <Box display={"flex"} justifyContent={"start"} alignItems={"end"}>
                                    <Text fontSize={"16px"} color={"#E2E2E2"} fontWeight={"bold"}>|</Text>
                                    <Text textOverflow={"ellipsis"} overflow={"hidden"} whiteSpace={"nowrap"} maxW={"200px"} fontSize={"12px"} color={"#E2E2E2"}>{reply}</Text>
                                </Box>}
                                <Text paddingBottom={"8px"} fontSize={"14px"}>
                                {
                                    text.includes("https://") 
                                    ? 
                                        <>
                                            {
                                                text.includes("jpg") 
                                                ? <Image className="rounded-[30px] max-w-[250px] md:max-w-xs py-4" width={500} height={500} alt={text} src={text} /> 
                                                : 
                                                text.includes("png") 
                                                ? <Image className="rounded-[30px] max-w-[250px] md:max-w-xs py-4" width={500} height={500} alt={text} src={text} /> 
                                                : <a target="_blank" className="hover:underline" href={text}>{text}</a>
                                            }
                                        </>
                                    : 
                                    text
                                }  
                                </Text>
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
        </> : "" }</>
    )
}

export default Message