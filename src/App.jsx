import { useState, useEffect, useCallback } from "react";
import Game from "./pages/Game";
import Home from "./pages/Home";
import fetchPokemonData from "./hooks/fetchPokemonData";
import Difficulty from "./components/Difficulty/Difficulty";
import Collections from "./pages/Collections";
import StateDisplay from "./components/StateDisplay/StateDisplay";

function App() {
 const [gameState, setGameState] = useState(null);
 const [difficulty, setDifficulty] = useState(null);
 const [savedCard, setSavedCard] = useState([]);
 const [error, setError] = useState(null);
 const [loading, setLoading] = useState(true);
 const [isFetching, setIsFetching] = useState(false);
 const [pokemonTotal, setPokemonTotal] = useState(null);
 const [pokemonList, setPokemonList] = useState([]);
 const [currentScore, setCurrentScore] = useState(0);

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

 const handleStart = (difficultyValue = null) => {
  if (isFetching) return;
  const resolvedDifficulty = difficultyValue || difficulty;

  if (difficultyValue) {
   setDifficulty(difficultyValue);
  }

  setGameState("start");
  setPokemonList([]);
  setCurrentScore(0);

  handleFetch(resolvedDifficulty);
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
    setGameState("finished");
   }
  }
 }, [pokemonList]);

 useEffect(() => {
  initializeTotalPokemon();
 }, [initializeTotalPokemon]);

 useEffect(() => {
  checkGameCompletion();
 }, [checkGameCompletion]);

 const handleReturn = () => {
  setDifficulty(null);
  setGameState(null);
  setPokemonList([]);
  setCurrentScore(0);
 };

 const handleFetch = async (difficultyValue) => {
  if (isFetching) return;
  setIsFetching(true);
  const resolvedDifficulty = difficultyValue || difficulty;

  const { getRandomPokemon } = fetchPokemonData(setError, setLoading);
  const pokemonData = await getRandomPokemon(
   resolvedDifficulty,
   pokemonTotal,
   setIsFetching
  );

  pokemonData.map((data) => {
   handlePokemonList(data);
  });
 };

 return (
  <>
   {(() => {
    switch (gameState) {
     case null:
      return (
       <Home
        gameState={gameState}
        setGameState={setGameState}
        handleStart={handleStart}
       />
      );
     case "difficulty":
      return (
       <Difficulty handleStart={handleStart} handleReturn={handleReturn} />
      );
     case "start":
      return (
       <Game
        gameState={gameState}
        setGameState={setGameState}
        difficulty={difficulty}
        pokemonList={pokemonList}
        setPokemonList={setPokemonList}
        setSavedCard={setSavedCard}
        currentScore={currentScore}
        setCurrentScore={setCurrentScore}
        handleStart={handleStart}
        handleReturn={handleReturn}
       />
      );
     case "collections":
      return <Collections savedCard={savedCard} />;
     default:
      return null;
    }
   })()}
   {(loading || error) && <StateDisplay loading={loading} error={error} />}
  </>
 );
}

export default App;
