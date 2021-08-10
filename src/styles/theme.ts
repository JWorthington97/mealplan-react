import { extendTheme } from "@chakra-ui/react";
import { headingStyles as Heading } from "./headingStyles";

export const theme = extendTheme({
    colors:{
        primary: "#66CCB5"
    },
    components:{
        Heading,
    }
});