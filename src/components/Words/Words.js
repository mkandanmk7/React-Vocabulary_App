import { Typography } from "@material-ui/core";
import axios from "axios";
import React, { useEffect, useState } from "react";

function Words() {

    const [meaning,setMeaning]=useState([]) // initially empty
    const [word,setWord]=useState("");
    const [categogy]

    // getting all the words using get Method
    const  getWords= async()=>{
        try{

            const data=await axios.get()
        }
        catch
    }

    //initial mount 
    useEffect(()=>{

    },[])

  return (
    <div className="words_container">
      <Typography
        variant="h5"
        color="primary"
        align="center"
        component="h1"
        gutterBottom="true"
      >
        Welcome to words
      </Typography>
    </div>
  );
}

export default Words;
