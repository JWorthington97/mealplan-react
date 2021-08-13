import { TagProps } from '@chakra-ui/react'

export interface IRecipe {
    id: number,
    name: string,
    cuisine: string,
    url: string,
    image_url: string,
    tags: string
}

export interface IRecipeFormatted {
    id: number,
    name: string,
    cuisine: number,
    url: string,
    image_url: string,
    tags: string[]
}

export type ExtendTagProps = TagProps & {
    tagVariant: string,
    isSelected?: boolean,
}

export interface IRecipeTags {
    [index: string]: boolean
    //TypeScript documentation for index signatures
}

export interface ICuisine {
    id: number,
    cuisine: string
}