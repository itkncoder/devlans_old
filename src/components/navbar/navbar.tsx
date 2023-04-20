import { HamburgerIcon } from "@chakra-ui/icons"
import { Avatar, Box, Input, Menu, MenuButton, MenuList, MenuItem } from "@chakra-ui/react"
import { useRouter } from "next/router"
import Link from "next/link"
import { useContext, useEffect, useState } from "react"
import { Context } from "@/pages/_app"
import { useAuthState } from 'react-firebase-hooks/auth';
import { signOut } from "firebase/auth";

const Navbar = (): JSX.Element => {

    const {auth} = useContext(Context)
    const [user]: any = useAuthState(auth)

    const router = useRouter()

    const [isHome, setHome] = useState(true)

    useEffect(() => {
        if (router.pathname !== "/") {
            setHome(false)
        }
    }, [router.pathname])

    return (
        <Box boxShadow={"0px 0px 40px #161616"} bg={"#18222E"} paddingY={"6px"} borderBottom={"0.5px solid #2B2B2B"} paddingX="20px" w={"100%"} display="flex" justifyContent="space-between" alignItems="center">
            {!isHome && <Link className="hover:underline h-fit" style={{padding: "8px", fontSize: "18px"}} href={"https://t.me/kncoder"}>Murojaat uchun</Link>}
            {isHome && <Box display="flex" justifyContent="center" alignItems="center" gap="20px">
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
                <Input fontSize={"sm"} variant='filled' border={"2px solid #1F2E3D"} paddingX="30px" borderRadius="8px" placeholder='Qidiruv...' />
            </Box>}
            {isHome && 
                <Menu>
                    <MenuButton>
                        <Avatar size={"sm"} name={user?.displayName} src={user?.photoURL}/>
                    </MenuButton>
                    <MenuList border="0">
                        <MenuItem onClick={() => signOut(auth)}>Profildan chiqish</MenuItem>
                    </MenuList>
                </Menu>
            }
        </Box>
    )
}

export default Navbar