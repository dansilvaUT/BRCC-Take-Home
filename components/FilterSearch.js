import React from "react";
import { TextField, makeStyles } from "@material-ui/core";
import propTypes from "prop-types";

const useStyles = makeStyles(() => ({
  searchField: {
    width: "100%",
    gridColumn: "1 / 3",
  },
}));

const FilterSearch = ({ search, setSearch }) => {
  const classes = useStyles();
  return (
    <TextField
      id="outlined-dense"
      label="Search for specific todo"
      className={classes.searchField}
      margin="dense"
      variant="outlined"
      value={search}
      onChange={(e) => setSearch(e.target.value)}
    />
  );
};

FilterSearch.propTypes = {
  search: propTypes.string,
  setSearch: propTypes.func,
};

export default FilterSearch;
