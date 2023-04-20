import { HamburgerIcon } from "@chakra-ui/icons"
import { Avatar, Box, Text, Menu, MenuButton, MenuList, MenuItem } from "@chakra-ui/react"

const Top = () => {
  return (
    <Box bg={"#18222E"} margin={"15px"} borderRadius={"12.5px"} border={"2px solid #1F2E3D"} paddingX={"20px"} paddingY={"10px"} display={"flex"} justifyContent={"space-between"} alignItems={"center"}>
        <Box display={"flex"} justifyContent={"space-between"} alignItems={"center"} gap={"15px"}>
            <Avatar name="USER" size={"sm"} src='https://bit.ly/dan-abramov'/>
            <Text fontSize={"18px"} fontWeight={"bold"} textOverflow={"ellipsis"} overflow={"hidden"} whiteSpace={"nowrap"} maxWidth={"400px"}>KNCODER</Text>
        </Box>
        <Menu>
            <MenuButton>
                <HamburgerIcon fontSize="28px" />
            </MenuButton>
            <MenuList border="0">
                <MenuItem>Download</MenuItem>
                <MenuItem>Create a Copy</MenuItem>
                <MenuItem>Mark as Draft</MenuItem>
                <MenuItem>Delete</MenuItem>
                <MenuItem>Attend a Workshop</MenuItem>
            </MenuList>
        </Menu>
    </Box>
  )
}

export default Top