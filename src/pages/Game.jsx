import Header from "../components/Header/Header";
import MainGame from "../components/MainGame/MainGame";
import Footer from "../components/Footer/Footer";
import { useState } from "react";
import Modal from "../components/Modal/Modal";
import Option from "../components/Options/Options";

function Game({
 gameState,
 setGameState,
 difficulty,
 pokemonList,
 setPokemonList,
 setSavedCard,
 currentScore,
 setCurrentScore,
 handleStart,
 handleReturn,
 isAnimating,
 setIsAnimating,
 setError,
}) {
 const [bestScore, setBestScore] = useState(0);
 const [optionOpen, setOptionOpen] = useState(false);

 return (
  <section id="game">
   <Header
    currentScore={currentScore}
    bestScore={bestScore}
    pokemonList={pokemonList.length}
    setOptionOpen={setOptionOpen}
   />
   <MainGame
    gameState={gameState}
    setGameState={setGameState}
    currentScore={currentScore}
    setCurrentScore={setCurrentScore}
    setBestScore={setBestScore}
    pokemonList={pokemonList}
    setPokemonList={setPokemonList}
    setSavedCard={setSavedCard}
    isAnimating={isAnimating}
    setIsAnimating={setIsAnimating}
    setError={setError}
   />
   {gameState && gameState !== "start" && (
    <Modal
     gameState={gameState}
     currentScore={currentScore}
     handleStart={handleStart}
     difficulty={difficulty}
     handleReturn={handleReturn}
    />
   )}
   {optionOpen && (
    <Option
     setOptionOpen={setOptionOpen}
     handleStart={handleStart}
     handleReturn={handleReturn}
    />
   )}
   <Footer />
  </section>
 );
}

export default Game;
