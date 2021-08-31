import { Box, Button, createStandaloneToast, FormControl, FormLabel, Input, useDisclosure } from "@chakra-ui/react";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from '../App'
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalCloseButton,
  } from "@chakra-ui/react"
import { SubmitHandler, useForm } from "react-hook-form";
import { useState } from "react";

type Inputs = {
    email: string;
  };

export default function PasswordReset(): JSX.Element {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [firebaseError, setFirebaseError] = useState("");
    const {
        register,
        handleSubmit,
      } = useForm<Inputs>();
    const onSubmit: SubmitHandler<Inputs> = (data) => {
        sendPasswordResetEmail(auth, data.email)
    .then(() => {
        // Password reset email sent!
        // ..
        const toast = createStandaloneToast();
        toast({
            title: "Password reset email sent",
            // description: "We have sent an email to reset your password.",
            status: "success",
            duration: 5000,
            isClosable: true,
        });
    })
    .catch((error) => { 
        // const errorCode = error.code;
        const errorMessage = error.message;
        setFirebaseError(errorMessage)
        // ..
    })};
  return (
    <>
        <Button variant="link" mt="4" color="#0000FF" fontWeight="light" size="sm" onClick={onOpen}>Forgot your password?</Button> 
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Password Reset</ModalHeader>
                <ModalCloseButton />
                    <ModalBody>
                    <FormControl>
                    <FormLabel htmlFor="email" />
                    <Input 
                        placeholder="Email"
                        {...register("email", { required: true })}
                        variant="flushed"
                        _focus={{ borderColor: "black" }}
                    />
                        <Button mt={4} type="submit" backgroundColor="primary" onClick={handleSubmit(onSubmit)}>
                        Reset
                    </Button> 
                    </FormControl>
                    {firebaseError && <Box color="red">{firebaseError}</Box>}
          </ModalBody>
            </ModalContent> 
        </Modal>
    </>
  ) 
}