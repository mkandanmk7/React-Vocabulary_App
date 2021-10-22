import { Search } from "@material-ui/icons";
import { styled, alpha, InputBase, AppBar } from "@material-ui/core";
import { useState } from "react";
import "./SearchBar.css";

function SearchBar() {
  const [word, setWord] = useState("Enter word: ");

  const SearchStyle = styled("div")(({ theme }) => ({
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto",
    },
  }));

  const SearchIconWrapper = styled("div")(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  }));

  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: "inherit",
    "& .MuiInputBase-input": {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create("width"),
      width: "100%",
      [theme.breakpoints.up("md")]: {
        width: "20ch",
      },
    },
  }));

  return (
    <div className="search_container">
      <div className="input_container">
        <input
          type="search"
          placeholder="Enter the word to search"
          onChange={(event) => setWord(event.target.value)}
        />
        <Search className="search_icon" color="primary" />
        {/* <div>
          <h3 className="word">{word}</h3>
        </div> */}
      </div>
      <AppBar position="static">
        <SearchStyle>
          <SearchIconWrapper>
            <Search />
          </SearchIconWrapper>
          <StyledInputBase
            placeholder="Search…"
            inputProps={{ "aria-label": "search" }}
          />
        </SearchStyle>
      </AppBar>
    </div>
  );
}

export default SearchBar;
