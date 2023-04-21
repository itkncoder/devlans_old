import {
  ThemeProvider,
  theme,
  ColorModeProvider,
  CSSReset,
} from "@chakra-ui/react";
import "../styles/globals.css"
import { createContext, useState } from "react";

import firebase, { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

export const app = initializeApp(
  {
    apiKey: "AIzaSyD1VKtZFhHt-cUP-01kET026A1m30DQbRw",
    authDomain: "devlans-8dcba.firebaseapp.com",
    projectId: "devlans-8dcba",
    storageBucket: "devlans-8dcba.appspot.com",
    messagingSenderId: "1072284730379",
    appId: "1:1072284730379:web:f8093b59d8dad55bca730e",
    measurementId: "G-JQD3TQ5PVT"
  }
);

const auth = getAuth()

const db = getFirestore(app);

const Context = createContext<any>(null)

function MyApp({ Component, pageProps }: any): JSX.Element {

    const [chatNow, setChatNow] = useState({
      photoURL: "https://github.com/itkncoder/devlans/blob/main/src/assets/logo.png?raw=true",
      displayName: "DEVLANS",
      description: "Hamma foydalanuvchilar uchun DEVLANSning rasmiy guruhi",
      id: 0
    })

    const [search, setSearch] = useState('')
    const [reply, setReply] = useState<any>('')

    return (
        <Context.Provider value={{
            firebase,
            auth,
            db,
            chatNow,
            setChatNow,
            search,
            setSearch,
            reply,
            setReply
        }}>
            <ThemeProvider theme={theme}>
                <ColorModeProvider>
                    <CSSReset />
                    <Component {...pageProps} />
                </ColorModeProvider>
            </ThemeProvider>
        </Context.Provider>
    )
}

export default MyApp

export {Context}