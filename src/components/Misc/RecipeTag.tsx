import { Tag, forwardRef, Box } from "@chakra-ui/react";
import { ExtendTagProps } from "../../Types";
import { variants } from "../../utils/tagVariants";

export const RecipeTag = forwardRef<ExtendTagProps, "div">((props, ref) => {
  let selectedVariant = props.isSelected
    ? props.tagVariant
    : props.tagVariant + "Selected";

  let {tagVariant, isSelected, ...rest} = {...props}
  // Really cool way to take remove a couple of properties from an object
 
  return ( 
    <Box>
      <Tag
        fontWeight="bold"
        fontSize="xs" 
        variant={variants[selectedVariant].type}
        color={variants[selectedVariant].color}
        backgroundColor={variants[selectedVariant].backgroundColor}
        ref={ref}
        {...rest} 
      >
        {variants[selectedVariant].tagName}
      </Tag>
    </Box>
  );
});
