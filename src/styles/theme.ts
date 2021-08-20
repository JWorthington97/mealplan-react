import { extendTheme } from "@chakra-ui/react";
import { headingStyles as Heading } from "./headingStyles";
import { linkStyles as Link } from "./linkStyles";
import { tagStyles as Tag } from "./tagStyles";

export const theme = extendTheme({
  colors: {
    primary: "#66CCB5",
  },
  components: {
    Tag,
    Heading,
    Link,
  },
});
