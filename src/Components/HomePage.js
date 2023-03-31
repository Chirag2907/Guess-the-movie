import React, { useState } from "react";
import GetMovie from "./GetMovie";
import Zoom from "react-reveal/Zoom";
import Fade from "react-reveal/Fade";
import Bounce from "react-reveal/Bounce";
import "./HomePage.css";

const ZoomExample = () => {
  const [ShowInst, setShowInst] = useState(false);
  const [ShowGame, setShowGame] = useState(false);
  const handleInstructions = (e) => {
    e.preventDefault();
    setShowInst(!ShowInst);
  };
  const handleGame = (e) => {
    e.preventDefault();
    setShowGame(!ShowGame);
  };
  let start = 3500;
  return (
    <>
      {/* HomePage header */}
      <div className="center">
        <div className="flex">
          <Zoom left cascade duration={1500}>
            <div className=" fancyFont headingAnimation">Guess the</div>
          </Zoom>
          <Zoom right cascade duration={1500}>
            <div className=" fancyFont headingAnimation"> Movie!</div>
          </Zoom>
        </div>
      </div>
      <div className="options">
        <Fade left delay={start} duration={2500}>
          <div onClick={handleGame} className="option card fancyFont bigText">
            PLAY
          </div>
        </Fade>
        <Fade right delay={start} duration={2500}>
          <div
            id="instructions"
            onClick={handleInstructions}
            className="option card fancyFont bigText"
          >
            INSTRUCTIONS
          </div>
        </Fade>
      </div>
      {ShowGame ? (
        <Bounce left duration={1000}>
          <div id="instructions" className="inst options newcard  bigText">
            <div className="close" onClick={handleGame}>
              ❌
            </div>
            <GetMovie func={handleGame} />
          </div>
        </Bounce>
      ) : (
        <div></div>
      )}
      {ShowInst ? (
        <Bounce left duration={1000}>
          <div id="instructions" className="inst options newcard  bigText">
            <div className="close" onClick={handleInstructions}>
              ❌
            </div>
            <b>
              <u>INSTRUCTIONS</u>
            </b>
            <br />
            Computer will choose a random movie and display all the vowels,
            <br />
            numbers and special characters present in it..
            <br />
            <br />
            You have to guess the movie letter by letter...
            <br />
            <br />
            You will be given 5 minutes to guess as many movies as you can.
            <br />
            <br />
            eg. if you enter 'n' then the computer will show you all the
            <br />
            places where n is present.
            <br />
            <br />
            You will get 1 point for each correct guess.
            <br />
            <br />
            You can guess a maximum of 5 wrong letters!
            <br />
          </div>
        </Bounce>
      ) : (
        <div></div>
      )}
    </>
  );
};

export default ZoomExample;
