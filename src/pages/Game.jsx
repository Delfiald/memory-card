import Header from "../components/Header/Header";
import MainGame from "../components/MainGame/MainGame";
import Footer from "../components/Footer/Footer";
import { useState } from "react";
import Modal from "../components/Modal/Modal";
import Option from "../components/Options/Options";
import Help from "../components/Help/Help";

function Game({
 gameState,
 setGameState,
 difficulty,
 pokemonList,
 setPokemonList,
 setSavedCard,
 currentScore,
 setCurrentScore,
 bestScore,
 setBestScore,
 handleStart,
 handleReturn,
 isAnimating,
 setIsAnimating,
 setError,
 helpOpen,
 setHelpOpen,
}) {
 const [optionOpen, setOptionOpen] = useState(false);

 return (
  <section id="game">
   <Header
    currentScore={currentScore}
    bestScore={bestScore}
    pokemonList={pokemonList.length}
    setOptionOpen={setOptionOpen}
    setHelpOpen={setHelpOpen}
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
    difficulty={difficulty}
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
   {helpOpen && <Help gameState={gameState} setHelpOpen={setHelpOpen} />}
   <Footer />
  </section>
 );
}

export default Game;
