import React from "react";
import { Router } from "@reach/router";
import CssBaseline from "@material-ui/core/CssBaseline";
import { makeStyles } from "@material-ui/core/styles";
import Recipe from "./Recipe/index";
// import NewRecipe from "./NewRecipe";
import List from "./List";
import HeaderBar from "./HeaderBar";
import { Box } from "@material-ui/core";
import Planning from "./Planning";

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  box: {
    position: "relative",
    top: "50px",
    flexGrow: 1,
    padding: theme.spacing(3)
  }
}));

export default function App() {
  const classes = useStyles();
  const [loading, setLoading] = React.useState(false);
  return (
    <div className={classes.root}>
      <CssBaseline />
      <HeaderBar loading={loading} />
      <Box className={classes.box}>
        <Router>
          <List path="/" setLoading={setLoading} />
          <Planning path="/planning" setLoading={setLoading}/>
          {/* <NewRecipe path="/new" /> */}
          <Recipe path="/:id" setLoading={setLoading} />
        </Router>
      </Box>
    </div>
  );
}
