import { Button, useToast } from "@chakra-ui/react";
// import firebase from "firebase/app";
import { signOut } from "firebase/auth";
import { useHistory } from "react-router-dom";
import { auth } from '../App'
interface SignOutProps {
    onClose?(): void,

}
export default function SignOut({ onClose }: SignOutProps): JSX.Element {
    const toast = useToast()
    let history = useHistory()

    const userSignOut = async () => {
        // await firebase.auth().signOut();
        signOut(auth)
        history.push("/")
    }

    return <Button colorScheme="teal" 
        m="auto"
        size="sm"
        onClick={() => {
        // firebase.auth().signOut();
        userSignOut();
        toast({
            title: "Signed out",
            status: "info",
            duration: 3000,
            isClosable: true,
          });
        if (onClose) {
            onClose()
        }
        // else {
            
        //     firebase.auth().onAuthStateChanged((user) => {
        //         if (!user) {
        //             window.location.reload()
        //         }
        //     })
        // }
    }}>Sign out</Button> 
}