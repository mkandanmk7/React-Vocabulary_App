import { ArrowDropDown, Language, Search } from "@material-ui/icons";
import axios from "axios";
import { useEffect, useState } from "react";
import "./SearchBar.css";

function SearchBar() {
  const [word, setWord] = useState("");

  // const language = "en-us";
  // const url=`https://od-api.oxforddictionaries.com/api/v2/entries/${language}/${word}`

  const getWords = async () => {
    // const app_id = "9ae9e5dc";
    // const app_key = "b3236e7deff3fc3bab5acaad64fcd6ba";
    const { data } = await axios.get(
      "https://cors-anywhere.herokuapp.com/https://od-api.oxforddictionaries.com/api/v2/entries/en-us/mobile",
      {
        headers: {
          app_id: "9ae9e5dc",
          app_key: "b3236e7deff3fc3bab5acaad64fcd6ba",
        },
      }
    );
    // https://cors-anywhere.herokuapp.com/https://od-api.oxforddictionaries.com/api/v2/entries/en-us/
    // const res = data.json();

    console.log(data);
  };

  useEffect(() => {
    getWords();
  }, []);

  return (
    <div className="header">
      <div className="header_center">
        <div className="header_search">
          <Search />
          <input
            type="text"
            value={word}
            placeholder="Enter a word..."
            onChange={(e) => setWord(e.target.value)}
          />
          <ArrowDropDown />
        </div>
      </div>
    </div>
  );
}

export default SearchBar;
