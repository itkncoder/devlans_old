import { Avatar, Box, Text } from "@chakra-ui/react"

const Message = ({isMine, name, text, ava, createdAt}: any) => {

    return (
        <>
            {!isMine ?<Box w={"100%"} display={"flex"} justifyContent={"start"} alignItems={"end"} gap={"10px"} >
                <Avatar cursor={"pointer"} size={"sm"} name="USER" src={ava}/>
                <Box position={"relative"} boxShadow={"0px 0px 41px #0D0D0D"} minW={"120px"} border={"1px solid #1F2E3D"} maxWidth={"450px"} paddingX={"15px"} borderRadius={"15px 15px 15px 0"} paddingY={"5px"} bg={"#1F2732"}>
                    <Text fontSize={"15px"} paddingY={"3px"} _hover={{color: "#E2E2E2"}} cursor={"pointer"} fontWeight={"bold"} >{name}</Text>
                    <Text paddingBottom={"15px"} fontSize={"14px"} >{text}</Text>
                    <Text position={"absolute"} bottom={"-5px"} right={"8px"} paddingBottom={"8px"} fontSize={"10px"} >{createdAt}</Text>
                </Box>
            </Box>
            :
            <Box w={"100%"} display={"flex"} justifyContent={"end"} alignItems={"end"} gap={"10px"} >
                <Box position={"relative"} boxShadow={"0px 0px 41px #0D0D0D"} maxWidth={"450px"} paddingX={"15px"} borderRadius={"15px 15px 0 15px"} paddingY={"8px"} bg={"#088E9A"}>
                    <Text paddingBottom={"8px"} fontSize={"14px"}>{text}</Text>
                    <Text position={"absolute"} bottom={"-5px"} right={"8px"} paddingBottom={"8px"} fontSize={"10px"} >{createdAt}</Text>
                </Box>
            </Box>}
        </>
    )
}

export default Message