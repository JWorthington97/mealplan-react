import { TagProps } from "@chakra-ui/react";

export interface IRecipe {
  id: number;
  name: string;
  cuisine: string;
  url: string;
  image_url: string;
  tags: string;
  infavourites: number;
  specials: number;
}

export interface IRecipeFormatted {
  id: number;
  name: string;
  cuisine: number;
  url: string;
  image_url: string;
  tags: string[];
  infavourites: number;
  specials: number;
}

export type ExtendTagProps = TagProps & {
  tagVariant: string;
  isSelected?: boolean;
};

export interface IRecipeTags {
  [index: string]: boolean;
  //TypeScript documentation for index signatures
}

export interface ICuisine {
  id: number;
  cuisine: string;
}

export interface ShowRecipesProps {
  tagsChosen: IRecipeTags;
  cuisineChosen: string;
  recipeSearch: string;
}

export interface PostAndDeleteFavouritesProps {
  recipeID: number;
  userID: string;
  setRecipes(recipes: IRecipeFormatted[]): void;
  recipes: IRecipeFormatted[];
}