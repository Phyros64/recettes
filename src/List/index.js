import React from "react";
import Fuse from 'fuse.js'
import {
  Grid,
  Container,
} from "@material-ui/core";

import SearchBar from "./SearchBar";
import RecipeCard from "../RecipeCard";
import { compareLastDate } from "../utils/date";
import { useRecipesState } from "../contexts/recipes";
import { useStyles } from "./styles";

function reducer(state, { type, payload }) {
  switch (type) {
    case 'SEARCH':
      return { ...state, search: payload };
    case 'RESET_SEARCH':
      return { ...state, search: "" };
    case 'TOGGLE_VEG':
      return { ...state, veg: !state.veg };
    case 'TOGGLE_SORT_BY_DATE':
      return { ...state, sortByDate: !state.sortByDate };
    default:
      throw new Error(`Unhandled type: ${type}`);
  }
};

export default function List({ onPick }) {
  const classes = useStyles();
  const { recipes, isError } = useRecipesState();

  const [state, dispatch] = React.useReducer(reducer, {
    search: '',
    veg: false,
    sortByDate: true,
  });
  const { search, veg, sortByDate } = state;

  const fuse = React.useCallback(
    () => {
      const fuseOptions = {
        keys: ['title'],
        threshold: 0.35,
      };
      const fuse = new Fuse(recipes, fuseOptions);
      return fuse.search(search);
    },
    [recipes, search],
  );

  const listRecipes = (search ? fuse() : recipes)
    .filter(recipe => {
      if (veg) {
        return recipe.vegetarian;
      }
      return true;
    })
    .sort((a, b) => {
      if (sortByDate) {
        return compareLastDate(a.dates, b.dates);
      }
      return null;
    });

  return (
    <>
      <SearchBar classes={classes} dispatch={dispatch} {...state} />
      <Container>
        {isError && "Une erreur est apparue."}
        <Grid container spacing={2} className={classes.gridContainer}>
          {listRecipes.map(recipe => (
            <Grid item xs={12} key={recipe._id}>
              <RecipeCard recipe={recipe} onPick={onPick} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
}
