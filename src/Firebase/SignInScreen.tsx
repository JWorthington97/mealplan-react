// import firebase from "firebase/app";
import { StyledFirebaseAuth } from "react-firebaseui";
import firebase from 'firebase';
import { Box, Button, Heading } from "@chakra-ui/react";

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
         <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
        {/* <Button onClick={() => firebase.auth().signOut()}>Sign out</Button> */}
      </Box>
    );
}

export default SignInScreen