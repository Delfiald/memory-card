import Header from "../components/Header/Header";
import MainGame from "../components/MainGame/MainGame";
import Footer from "../components/Footer/Footer";
import { useEffect, useState } from "react";

function Game() {
 const [gameState, setGameState] = useState(true);
 const [currentScore, setCurrentScore] = useState(0);
 const [bestScore, setBestScore] = useState(0);
 const [savedCard, setSavedCard] = useState([]);

 const [pokemonList, setPokemonList] = useState([
  {
   id: 1,
   pokemonImage: "",
   pokemonName: "Bulbasaur",
   isClicked: false,
  },
  {
   id: 2,
   pokemonImage: "",
   pokemonName: "Charmander",
   isClicked: false,
  },
 ]);

 useEffect(() => {
  const isFinished = pokemonList.every((pokemon) => pokemon.isClicked);

  if (isFinished) {
   setGameState(false);
   console.log("Game Finished");
  }
 }, [pokemonList]);

 return (
  <>
   <Header
    currentScore={currentScore}
    bestScore={bestScore}
    pokemonList={pokemonList.length}
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
   />
   <Footer />
  </>
 );
}

export default Game;
