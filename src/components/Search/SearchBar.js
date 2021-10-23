import axios from "axios";
import React, { useEffect, useState } from "react";
import "./SearchBar.css";

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
import {
  AddCircle,
  ArrowDropDown,
  Search,
  CancelSharp,
} from "@material-ui/icons";

function SearchBar() {
  const [word, setWord] = useState("");
  const [enteredWord, setEnteredWord] = useState("");
  const [defintion, setDefintion] = useState("");
  // const [example, setExample] = useState("");

  //modal states
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  //contentModal
  const [content, setContent] = useState(false);
  const [category, setCategory] = useState("");
  const [advCategory, setAdvCategory] = useState("");
  const [adverb, setAdVerb] = useState("");
  const [advExample1, setAdvExample1] = useState("");
  const [advExample2, setAdvExample2] = useState("");
  const [example, setExample] = useState("");
  const [origin, setOrigin] = useState("");

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
    const { data } = await axios.get(
      `https://cors-anywhere.herokuapp.com/https://od-api.oxforddictionaries.com/api/v2/entries/en-us/piecemeal`,
      {
        headers: {
          app_id: "9ae9e5dc",
          app_key: "b3236e7deff3fc3bab5acaad64fcd6ba",
        },
      }
    );
    console.log(data);
    setEnteredWord(data.id);
    setCategory(data.results[0].lexicalEntries[0].lexicalCategory.id);
    setOrigin(data.results[0].lexicalEntries[0].entries[0].etymologies[0]);
    // setVerb(data.results[0].lexicalEntries[0].phrasalVerbs[0].text);
    setExample(
      data.results[0].lexicalEntries[0].entries[0].senses[0].examples[0].text
    );

    //adverb
    setAdVerb(
      data.results[0].lexicalEntries[1].entries[0].senses[0].definitions[0]
    );
    setAdvCategory(data.results[0].lexicalEntries[1].lexicalCategory.id);
    setAdvExample1(
      data.results[0].lexicalEntries[1].entries[0].senses[0].examples[0].text
    );
    setAdvExample2(
      data.results[0].lexicalEntries[1].entries[0].senses[0].examples[1].text
    );

    let define =
      data.results[0].lexicalEntries[0].entries[0].senses[0].definitions[0];
    setDefintion(define);

    console.log(
      data.results[0].lexicalEntries[0].entries[0].senses[0].definitions[0]
    );
  };

  useEffect(() => {
    getWords();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
                // onSubmit={() => getWords()}
              />

              <Button
                variant="contained"
                color="secondary"
                startIcon={<Search />}
                onSubmit={() => setWord(word)}
              ></Button>
            </div>
          </div>
        </div>
        <div className="definitions" onClick={() => setContent(true)}>
          <h3 className="word_heading">Words List</h3>
          <h2>{enteredWord}</h2>
          <h3>
            <b>({category})</b> <span> {defintion}</span>
          </h3>
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

        {/* content modal */}
        <div>
          <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            open={content}
            onClose={() => setContent(false)}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
              timeout: 500,
            }}
          >
            <Fade in={content}>
              <Box className="content_modal">
                <Typography variant="h2" className="content_modal_heading">
                  {enteredWord}
                  <CancelSharp
                    className="modal_cancel"
                    color="disabled"
                    onClick={() => setContent(false)}
                    style={{
                      fontSize: "3rem",
                    }}
                  />
                </Typography>

                <Typography
                  variant="subtitle1"
                  component="h2"
                  className="content_adjective"
                >
                  <span className="content_adj">{category}</span>
                  <span className="content_origin"> Origin: {origin}</span>
                </Typography>

                <Typography
                  id="transition-modal-title"
                  variant="h4"
                  component="h2"
                  className="content_definition"
                >
                  {defintion}
                </Typography>
                <Typography
                  id="transition-modal-title"
                  variant="h6"
                  component="h2"
                  className="content_example"
                >
                  <li>{example}</li>
                </Typography>
                <Typography
                  variant="subtitle1"
                  component="h2"
                  className="content_adjective"
                >
                  <span className="content_adj">{advCategory}</span>
                  <span className="content_origin"> {adverb}</span>
                </Typography>

                <Typography
                  id="transition-modal-title"
                  variant="h6"
                  component="h2"
                  className="content_example"
                >
                  <li>{advExample1}</li>
                </Typography>
                <Typography
                  id="transition-modal-title"
                  variant="h6"
                  component="h2"
                  className="content_example"
                >
                  <li>{advExample2}</li>
                </Typography>
              </Box>
            </Fade>
          </Modal>
        </div>

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
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={handleClose}
                  >
                    cancel
                  </Button>
                  <Button variant="contained" color="primary">
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
