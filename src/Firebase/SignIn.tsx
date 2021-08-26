// import firebase from "firebase/app";
import { StyledFirebaseAuth } from "react-firebaseui";
import firebase from 'firebase/app';
import 'firebase/auth'
import { Box, Heading } from "@chakra-ui/react";
import { useContext } from "react";
import { UserContext } from "../App";

const uiConfig = {
    // Popup signin flow rather than redirect flow.
    signInFlow: 'popup',
    // Redirect to /signedIn after sign in is successful. Alternatively you can provide a callbacks.signInSuccess function.
    signInSuccessUrl: '/',
    signInOptions: [
      firebase.auth.EmailAuthProvider.PROVIDER_ID 
    ],
  };

function SignInScreen() {
    const user = useContext(UserContext)
    return (
      <Box textAlign="center">
         {user ? 
          <Heading> Already Signed In!</Heading> : 
          <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />}
      </Box>
    );
}

export default SignInScreen