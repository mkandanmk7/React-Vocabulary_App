import React from "react";
import {
  Backdrop,
  Box,
  Button,
  Container,
  Fade,
  Modal,
  TextField,
  Typography,
} from "@material-ui/core";
import { AddCircle, ArrowDropDown, Search } from "@material-ui/icons";
import axios from "axios";
import { useEffect, useState } from "react";
import "./SearchBar.css";

function SearchBar() {
  const [word, setWord] = useState("");
  const [defintion, setDefintion] = useState("");

  //modal states
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  //styles for modal
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 300,
    bgcolor: "background.paper",
    border: "2px solid #0da2ff",
    boxShadow: 24,
    borderRadius: 7,
    p: 4,
  };

  const getWords = async () => {
    // const app_id = "9ae9e5dc";
    // const app_key = "b3236e7deff3fc3bab5acaad64fcd6ba";
    const { data } = await axios.get(
      `https://cors-anywhere.herokuapp.com/https://od-api.oxforddictionaries.com/api/v2/entries/en-us/${word}`,
      {
        headers: {
          app_id: "9ae9e5dc",
          app_key: "b3236e7deff3fc3bab5acaad64fcd6ba",
        },
      }
    );
    // https://cors-anywhere.herokuapp.com/https://od-api.oxforddictionaries.com/api/v2/entries/en-us/
    // const res = data.json();
    let define =
      data.results[0].lexicalEntries[0].entries[0].senses[0].definitions[0];

    setDefintion(define);
    console.log(
      data.results[0].lexicalEntries[0].entries[0].senses[0].definitions[0]
    );
    // console.log()
  };

  useEffect(() => {
    getWords();
  }, []);

  return (
    <>
      <Container maxWidth="md">
        <div className="header">
          <div className="header_center">
            <div className="header_search">
              <ArrowDropDown />
              <input
                type="text"
                value={word}
                placeholder="Enter a word..."
                onChange={(e) => setWord(e.target.value)}
                onSubmit={() => getWords()}
              />

              <Search onClick={() => setWord(word)} />
            </div>
          </div>
        </div>
        <div className="definitions">
          <h2>Defintions : {defintion}</h2>
        </div>
        <AddCircle
          style={{
            position: "fixed",
            bottom: 0,
            right: "20%",
            marginBottom: "20px",
            fontSize: "3rem",
          }}
          onClick={handleOpen}
        />
        <div>
          <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            open={open}
            onClose={handleClose}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
              timeout: 500,
            }}
          >
            <Fade in={open}>
              <Box sx={style}>
                <Typography
                  id="transition-modal-title"
                  variant="h6"
                  component="h2"
                >
                  Add word to Dictionary
                </Typography>
                <TextField
                  id="standard-basic"
                  label="New Word"
                  variant="standard"
                />
                <div className="buttons">
                  <Button variant="contained" color="success">
                    cancel
                  </Button>
                  <Button color="success" variant="contained">
                    Add
                  </Button>
                </div>
              </Box>
            </Fade>
          </Modal>
        </div>
      </Container>
    </>
  );
}

export default SearchBar;
