import { Button, useToast } from "@chakra-ui/react";
import firebase from "firebase";

interface SignOutProps {
    onClose(): void
}
export default function SignOut({ onClose }: SignOutProps): JSX.Element {
    const toast = useToast()
    return <Button colorScheme="teal" 
        mt={["3vw", "3vw", "1vw", "1vw", "1vw"]}
        onClick={() => {
        firebase.auth().signOut();
        toast({
            title: "Signed out",
            status: "info",
            duration: 3000,
            isClosable: true,
          });
        onClose()
    }}>Sign out</Button> 
}