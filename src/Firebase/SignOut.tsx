import { Button, useToast } from "@chakra-ui/react";
import firebase from "firebase/app";
import { useHistory } from "react-router-dom";

interface SignOutProps {
    onClose?(): void,

}
export default function SignOut({ onClose }: SignOutProps): JSX.Element {
    const toast = useToast()
    let history = useHistory()

    const signOut = async () => {
        await firebase.auth().signOut();
        history.push("/")
    }

    return <Button colorScheme="teal" 
        m="auto"
        size="sm"
        onClick={() => {
        // firebase.auth().signOut();
        signOut();
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