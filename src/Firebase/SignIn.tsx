import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import { auth } from "../App";
import { useContext, useState } from "react";
import { UserContext } from "../App";
import { useForm, SubmitHandler } from "react-hook-form";
import { useHistory } from "react-router-dom";
import {
  FormLabel,
  FormControl,
  Input,
  Button,
  Box,
  Flex,
  Divider,
  createStandaloneToast
} from "@chakra-ui/react";
import PasswordReset from "./PasswordReset";
import { theme } from "../styles/theme";

type Inputs = {
  email: string;
  password: string;
};

export default function SignInScreen() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const [firebaseError, setFirebaseError] = useState("");
  const history = useHistory();
  const [signUpOrSignIn, setSignUpOrSignIn] = useState("signin");
  const user = useContext(UserContext);

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    if (user) {
      setFirebaseError("Already logged in!");
      return;
    }

    signUpOrSignIn === "signin"
      ? signInWithEmailAndPassword(auth, data.email, data.password)
          .then(() => {
            // Signed in
            // const user = userCredential.user;
            history.push("/");
            // ...
          })
          .catch((error) => {
            // const errorCode = error.code;
            const errorMessage = error.message;
            console.log(error.message);
            setFirebaseError(errorMessage);
            // need a state to add an error to
          })
      : createUserWithEmailAndPassword(auth, data.email, data.password)
          .then((userCredential) => {
            // Signed in
            // const user = userCredential.user;
            setFirebaseError("");
            sendEmailVerification(userCredential.user) 
            const toast = createStandaloneToast({theme: theme});
            toast({
              title: "Account created!",
              description: "We have sent an email with a confirmation link to your email address.",
              status: "success",
              duration: 5000,
              isClosable: true,
            });
            history.push("/");
            // ...
          })
          .catch((error) => {
            // const errorCode = error.code;
            const errorMessage = error.message;
            // ..
            setFirebaseError(errorMessage);
          });
  };

  // console.log(watch("email")) // watch input value by passing the name of it

  return (
    <Box w={["90%", "90%", "50%", "50%", "50%"]} m="auto">
      <Flex w="100%" m="auto" justifyContent="center" mr="1">
        <Button variant="flushed" onClick={() => setSignUpOrSignIn("signin")}>
          Sign In
        </Button>
        <Divider orientation="vertical" colorScheme="blackAlpha" />
        <Button variant="ghost" onClick={() => setSignUpOrSignIn("signup")}>
          Sign Up
        </Button>
      </Flex>
      <Box>
        {/* "handleSubmit" will validate your inputs before invoking "onSubmit" */}
        <Box>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormControl>
              {/* register your input into the hook by invoking the "register" function */}
              <FormLabel htmlFor="email" />
              <Input
                placeholder="Email"
                {...register("email", { required: true })}
                variant="flushed"
                _focus={{ borderColor: "black" }}
              />

              {/* include validation with required or other standard HTML validation rules */}
              <FormLabel htmlFor="password" />
              <Input
                placeholder="Password"
                type="password"
                {...register("password", { required: true })}
                variant="flushed"
                _focus={{ borderColor: "black" }}
              />
              {/* errors will return when field validation fails  */}
              {errors.email && <Box>Email is Required</Box>}
              {errors.password && (
                <Box>Need to put password validation stuff in here</Box>
              )}

              <Button mt={4} type="submit" backgroundColor="primary" w="10ch">
                {signUpOrSignIn === "signin" ? "Sign In" : "Sign Up"}
              </Button>
            </FormControl>
          </form>
          <PasswordReset />
          {firebaseError && <Box color="red">{firebaseError}</Box>}
        </Box>
        {/* } */}
      </Box>
    </Box>
  );
}
