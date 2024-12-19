import Header from "../components/Header/Header";
import MainGame from "../components/MainGame/MainGame";
import Footer from "../components/Footer/Footer";
import { useCallback, useEffect, useState } from "react";
import fetchPokemonData from "../hooks/fetchPokemonData";

function Game() {
 const [gameState, setGameState] = useState(true);
 const [currentScore, setCurrentScore] = useState(0);
 const [bestScore, setBestScore] = useState(0);
 const [savedCard, setSavedCard] = useState([]);

 const [pokemonTotal, setPokemonTotal] = useState(null);
 const [pokemonList, setPokemonList] = useState([]);

 const [error, setError] = useState(null);
 const [loading, setLoading] = useState(true);

 const handlePokemonList = (data) => {
  const newPokemon = {
   id: data.id,
   pokemonImage: data.sprites.other["official-artwork"].front_default
    ? data.sprites.other["official-artwork"].front_default
    : data.sprites.other["official-artwork"].front_shiny,
   pokemonName: data.name,
   type: data.types[0].type.name,
   isClicked: false,
  };

  setPokemonList((prevPokemonList) => [...prevPokemonList, newPokemon]);
 };

 const handleFetch = async (difficulty) => {
  setPokemonList([]);
  setCurrentScore(0);

  const { getRandomPokemon } = fetchPokemonData(setError, setLoading);
  const pokemonData = await getRandomPokemon(difficulty, pokemonTotal);
  pokemonData.map((data) => {
   handlePokemonList(data);
  });
 };

 const initializeTotalPokemon = useCallback(() => {
  if (!pokemonTotal) {
   const { getTotalPokemon } = fetchPokemonData(setError, setLoading);
   getTotalPokemon(setPokemonTotal);
  }
 }, [pokemonTotal]);

 const checkGameCompletion = useCallback(() => {
  if (pokemonList.length > 0) {
   const isFinished = pokemonList.every((pokemon) => pokemon.isClicked);
   if (isFinished) {
    setGameState(false);
    console.log("Game Finished");
   }
  }
 }, [pokemonList]);

 useEffect(() => {
  initializeTotalPokemon();
 }, [initializeTotalPokemon]);

 useEffect(() => {
  checkGameCompletion();
 }, [checkGameCompletion]);

 return (
  <>
   <button onClick={() => handleFetch(5)}>Easy</button>
   <button onClick={() => handleFetch(8)}>Medium</button>
   <button onClick={() => handleFetch(15)}>Hard</button>
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
