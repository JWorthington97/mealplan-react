// import firebase from "firebase/app";
import { StyledFirebaseAuth } from "react-firebaseui";
import firebase from 'firebase';
import { Box, Heading } from "@chakra-ui/react";


// Initialize Firebase


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
    const user = firebase.auth().currentUser

    return (
      <Box>
        {user ? <Heading>Already Signed In!</Heading> :
         <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />}
        
      </Box>
    );
}

export default SignInScreen