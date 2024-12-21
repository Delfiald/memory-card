import Header from "../components/Header/Header";
import MainGame from "../components/MainGame/MainGame";
import Footer from "../components/Footer/Footer";
import { useCallback, useEffect, useState } from "react";
import fetchPokemonData from "../hooks/fetchPokemonData";
import Modal from "../components/Modal/Modal";
import Option from "../components/Option/Option";

function Game() {
 const [gameState, setGameState] = useState(null);
 const [isFetching, setIsFetching] = useState(false);
 const [difficulty, setDifficulty] = useState(null);
 const [currentScore, setCurrentScore] = useState(0);
 const [bestScore, setBestScore] = useState(0);
 const [savedCard, setSavedCard] = useState([]);

 const [pokemonTotal, setPokemonTotal] = useState(null);
 const [pokemonList, setPokemonList] = useState([]);

 const [error, setError] = useState(null);
 const [loading, setLoading] = useState(true);

 const [optionOpen, setOptionOpen] = useState(false);

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

 return (
  <>
   <button onClick={() => handleStart(5)}>Easy</button>
   <button onClick={() => handleStart(8)}>Medium</button>
   <button onClick={() => handleStart(15)}>Hard</button>
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
  </>
 );
}

export default Game;
