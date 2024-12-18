import Header from "../components/Header/Header";
import MainGame from "../components/MainGame/MainGame";
import Footer from "../components/Footer/Footer";
import { useState } from "react";

function Game() {
 const [currentScore, setCurrentScore] = useState(0);
 const [bestScore, setBestScore] = useState(0);
 const [totalScore, setTotalScore] = useState(5);

 return (
  <>
   <Header
    currentScore={currentScore}
    bestScore={bestScore}
    totalScore={totalScore}
   />
   <MainGame
    currentScore={setCurrentScore}
    setCurrentScore={setCurrentScore}
    setBestScore={setBestScore}
    totalScore={totalScore}
   />
   <Footer />
  </>
 );
}

export default Game;
