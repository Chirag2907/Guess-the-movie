import React from "react";
import Timer from "./Timer";
import { useState, useEffect } from "react";

const Game = () => {
  const [Message, setMessage] = useState("");
  const [Movie, setMovie] = useState("");
  const [DashedMovie, setDashedMovie] = useState("...");
  const [Attempts, setAttempts] = useState(5);
  const [WrongAttempts, setWrongAttempts] = useState([]);
  const [CorrectAttempts, setCorrectAttempts] = useState([]);
  const [Score, SetScore] = useState(0);

  const getData = async () => {
    let randomPage = Math.floor(Math.random() * 500) + 1;
    let randomNumber = Math.floor(Math.random() * 19) + 1;

    let response = await fetch(
      "https://api.themoviedb.org/3/movie/popular?api_key=961eac3266854d93b722e893e6485014&language=en-US&page=" +
        randomPage
    );
    
    let data = await response.json();
    let movie = data.results[randomNumber].title;
    let movieLower = movie.toLowerCase();
    let movieWithDash = movieLower.replace(/[qwrtypsdfghjklzxcvbnm]/g, "-");
    setMovie(movieLower);
    setDashedMovie(movieWithDash);
  };

  const checker = (e) => {
    if (e.target.value === "") {
      return;
    }
    if (
      e.target.value === "a" ||
      e.target.value === "e" ||
      e.target.value === "i" ||
      e.target.value === "o" ||
      e.target.value === "u" ||
      e.target.value === "A" ||
      e.target.value === "E" ||
      e.target.value === "I" ||
      e.target.value === "O" ||
      e.target.value === "U"
    ) {
      e.target.value = "";
      return;
    }
    if (e.key === "Enter") {
      let char = e.target.value;
      e.target.value = "";
      char = char.toLowerCase();
      let flag = 0;
      for (let i = 0; i < Movie.length; i++) {
        if (char === Movie[i]) {
          flag = 1;
          let temp = DashedMovie;
          temp = temp.substring(0, i) + char[0] + temp.substring(i + 1);
          setDashedMovie(temp);
        }
      }
      //check if the letter is already in the wrong attempts array
      if (flag === 0) {
        if (WrongAttempts.includes(char[0])) {
          return;
        }
        setAttempts(Attempts - 1);
        //if(wrong attempts is empty then dont add a comma)
        setWrongAttempts([...WrongAttempts, char[0]]);
      }
      //check if the letter is already in the correct attempts
      else {
        if (CorrectAttempts.includes(char[0])) {
          return;
        }
        setCorrectAttempts([...CorrectAttempts, char[0]]);
      }
      e.target.value = "";

      if (Attempts === 1) {
        setMessage("You lost!");
        setDashedMovie(Movie);
        setTimeout(() => {
          getData();
          setAttempts(5);
          setWrongAttempts([]);
          setCorrectAttempts([]);
          setMessage("");
        }, 3000);
      }
      if (DashedMovie === Movie) {
        setMessage("You won!");
        SetScore(Score + 1);
        setTimeout(() => {
          getData();
          setAttempts(5);
          setWrongAttempts([]);
          setCorrectAttempts([]);
          setMessage("");
        }, 3000);
      }
    }
  };

  const pull_time = (time) => {
    if (time === 0) {
      console.log("second");
    }
  };

  useEffect(() => {
    setTimeout(() => {
      getData();
    }, 500);
  }, []);

  return (
    <div className="grey">
      <div className="logo">Guess the Movie!</div>

      <Timer func={pull_time} />

      <div className="movieBackground"></div>

      <p className="movie">{DashedMovie}</p>

      <div className="details">
        <p className="win">{Message}</p>
        <p className="attempts">Remaining attempts: {Attempts}</p>
        <p className="wrong">Wrong Guesses: {WrongAttempts}</p>
        <p className="correct">Correct Guesses: {CorrectAttempts}</p>
        <p className="score">Score: {Score}</p>
      </div>

      <input
        maxLength={1}
        placeholder="Enter guess here"
        className="input"
        type="text"
        onKeyDown={checker}
      ></input>
    </div>
  );
};

export default Game;
