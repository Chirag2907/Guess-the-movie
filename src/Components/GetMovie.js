import React from "react";
import { useState } from "react";
import "./GetMovie.css";
import Timer from "./Timer";

let movieLower = "";
let movieWithDash = "";

const GetMovie = (props) => {
  const getData = async () => {
    const randomPage = Math.floor(Math.random() * 500) + 1;
    const randomNumber = Math.floor(Math.random() * 19) + 1;
    let popularity = 0;
    while (popularity < 50) {
      //response is the object that contains the response from the api
      const response = await fetch(
        "https://api.themoviedb.org/3/movie/popular?api_key=961eac3266854d93b722e893e6485014&language=en-US&page=" +
          randomPage
      );

      //data is the object that contains the data from the api in json format
      const data = await response.json();

      //popularity is the variable that contains the popularity of the movie
      popularity = data.results[randomNumber].popularity;

      const add = document.getElementsByClassName("movie");

      //movie is the variable that contains the movie name
      let movie = data.results[randomNumber].title;

      //movieLower is the variable that contains the movie name in lowercase
      movieLower = movie.toLowerCase();
      //movieWithDash is the variable that contains the movie name with dashes at consonants
      movieWithDash = movieLower.replace(/[qwrtypsdfghjklzxcvbnm]/g, "-");

      //if there is a movie with no consonants, then the function is called again
      if (movieWithDash.indexOf("-") === -1) {
        getData();
        return;
      }

      //dashed movie is displayed on the screen
      add[0].innerHTML = movieWithDash;
      break;
    }

    const win = document.getElementsByClassName("win");
    win[0].innerHTML = "Remaining attemtps: " + 5;
    attempts = 5;
    let at = document.getElementsByClassName("attempts");
    let arr = [];
    mySet1.forEach((Element) => {
      arr.push(Element);
    });
    let corr = [];
    correctSet.forEach((Element) => {
      corr.push(Element);
    });
    at[0].innerHTML = "Incorrect Guesses: " + arr + "<br/> Correct Guesses: " +  corr;
 
  };

  let attempts = 5;
  let mySet1 = new Set();
  let correctSet = new Set();

  //checker function is called when a key is pressed
  const checker = (e) => {

    if (e.target.value === "") {
      e.target.value = "";
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
      alert("Vowels are already displayed! Try again!");
      e.target.value = "";
      return;
    }
    if (e.key === "Enter") {
      if(mySet1.has(e.target.value)){
        e.target.value = "";
        return;
      }
      if(correctSet.has(e.target.value)){
        e.target.value = "";
        return;
      }
      //char is the variable that contains the character that is pressed
      let char = e.target.value;
      let win = document.getElementsByClassName("win");
      let flag = 0;
      for (let i = 0; i < movieLower.length; i++) {
        if (char[0] === movieLower[i]) {
          movieWithDash =
            movieWithDash.substring(0, i) +
            char[0] +
            movieWithDash.substring(i + 1);
          flag = 1;
        }
      }
      if (flag === 0) {
        mySet1.add(char[0]);
        attempts--;
      }
      else{
        correctSet.add(char[0]);
      }

      if (attempts === 0) {
        const add = document.getElementsByClassName("movie");
        win[0].innerHTML = "You lost!";
        movieWithDash = movieLower;
        add[0].innerHTML = movieWithDash;
        e.target.value = "";
        setTimeout(() => {
          mySet1.clear();
          SetScore(0);
          correctSet.clear();
          attempts = 5;
          getData();
          return;
        }, 3000);
      } else {
        win[0].innerHTML = "Remaining attempts: " + attempts;
        let at = document.getElementsByClassName("attempts");
        let arr = [];
        let corr = [];
        correctSet.forEach((Element) => {
          corr.push(Element);
        });
        mySet1.forEach((Element) => {
          arr.push(Element);
        });
        at[0].innerHTML = "Incorrect Guesses: " + arr + "<br/> Correct Guesses: " +  corr;
        e.target.value = "";
        const add = document.getElementsByClassName("movie");
        add[0].innerHTML = movieWithDash;
        if (movieWithDash === movieLower) {
          win[0].innerHTML = "You Win!";
          SetScore(Score + 1);
          e.target.value = "";
          setTimeout(() => {
            mySet1.clear();
            correctSet.clear();
            attempts = 5;
            getData();
            return;
          }, 3000);
        }
      }
    }
  };

  const [Score, SetScore] = useState(0);

  React.useEffect(() => {
    setTimeout(() => getData(), 0);
  });

  const [Show, SetShow] = useState(false);

  const pull_time = (time) => {
    if (time === 0) {
      SetShow(true);
      document.querySelector(".content").style.display = "none";
    }
  };

  return (
    <div className="grey">
      {Show ? (
        <div className="timeup">
          Time Up!
          <br /> <br />
          Well Played!
          <br /> <br />
          Final Score: {Score}
          <br />
          <div className="buttons">
            <span>
              <button onClick={props.func}>Exit to main menu</button>
            </span>
          </div>
        </div>
      ) : null}

      <div className="logo">Guess the Movie!</div>

      <div className="content">
        <div className="MovieDisplay">
          <div className="movieBackground"></div>
          <p className="movie"></p>
        </div>

        <div className="details">
          <p className="win"></p>
          <p className="attempts"></p>
        </div>

        <div className="score-input">
          <input
            maxLength={1}
            placeholder="Enter guess here"
            className="input"
            type="text"
            onKeyDown={checker}
          />

        </div >
        <div className="time">
          <Timer  func={pull_time} />
        </div>

        <div className="scoreDetails">
          <div className="scoreBackground"></div>
          <div className="scores">
            <div className="score">Current Score: {Score}</div>
            <div>High Score: {}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GetMovie;
