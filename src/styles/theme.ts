import { extendTheme } from "@chakra-ui/react";
import { headingStyles as Heading } from "./headingStyles";
import { linkStyles as Link } from "./linkStyles";

export const theme = extendTheme({
    colors:{
        primary: "#66CCB5"
    },
    components:{
        Heading,
        Link
    }
});