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
 pokemonList,
 setPokemonList,
 setSavedCard,
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
    currentScore={gameState.currentScore}
    bestScore={gameState.bestScore}
    pokemonList={pokemonList.length}
    setOptionOpen={setOptionOpen}
    setHelpOpen={setHelpOpen}
   />
   <MainGame
    gameState={gameState}
    setGameState={setGameState}
    pokemonList={pokemonList}
    setPokemonList={setPokemonList}
    setSavedCard={setSavedCard}
    isAnimating={isAnimating}
    setIsAnimating={setIsAnimating}
    setError={setError}
   />
   {gameState.state && gameState.state !== "start" && (
    <Modal
     gameState={gameState}
     currentScore={gameState.currentScore}
     handleStart={handleStart}
     difficulty={gameState.difficulty}
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
