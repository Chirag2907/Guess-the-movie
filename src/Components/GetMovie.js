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
      const response = await fetch(
        "https://api.themoviedb.org/3/movie/popular?api_key=961eac3266854d93b722e893e6485014&language=en-US&page=" +
          randomPage
      );
      const data = await response.json();
      popularity = data.results[randomNumber].popularity;
      const add = document.getElementsByClassName("movie");
      let movie = data.results[randomNumber].title;
      movieLower = movie.toLowerCase();
      movieWithDash = movieLower.replace(/[qwrtypsdfghjklzxcvbnm]/g, "-");
      if (movieWithDash.indexOf("-") === -1) {
        getData();
      }
      add[0].innerHTML = movieWithDash;
      break;
    }
    const win = document.getElementsByClassName("win");
    win[0].innerHTML = "Number of attempts left: " + 5;
    attempts = 5;
    let at = document.getElementsByClassName("attempts");
    let arr = [];
    mySet1.forEach((Element) => {
      arr.push(Element);
    });
    at[0].innerHTML = "Wrong Attempts: " + arr;
  };

  let attempts = 5;
  let mySet1 = new Set();

  const checker = (e) => {
    if (e.target.value === "") {
      return;
    }
    if (e.key === "Enter") {
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
      if (attempts === 0) {
        const add = document.getElementsByClassName("movie");
        win[0].innerHTML = "You lost!";
        movieWithDash = movieLower;
        add[0].innerHTML = movieWithDash;
        setTimeout(() => {
          e.target.value = "";

          mySet1.clear();

          attempts = 5;
        }, 3000);
        getData();
        SetScore(0);
      } else {
        win[0].innerHTML = "Number of attempts left: " + attempts;
        let at = document.getElementsByClassName("attempts");
        let arr = [];
        mySet1.forEach((Element) => {
          arr.push(Element);
        });
        at[0].innerHTML = "Wrong Attempts: " + arr;
        e.target.value = "";
        const add = document.getElementsByClassName("movie");
        add[0].innerHTML = movieWithDash;
        if (movieWithDash === movieLower) {
          win[0].innerHTML = "You Win!";
          SetScore(Score + 1);
          setTimeout(() => {
            mySet1.clear();
            attempts = 5;
            e.target.value = "";
          }, 3000);
          getData();
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

      <Timer func={pull_time} />

      <div className="movieBackground"></div>
      <p className="movie"></p>

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
        <div className="scoreBackground"></div>
        <div className="scores">
          <div className="score">Current Score: {Score}</div>
          <div>High Score: {}</div>
        </div>
      </div>

      <br />
      <br />
      <br />
    </div>
  );
};

export default GetMovie;
