import { useState, useEffect, useCallback } from "react";
import Game from "./pages/Game";
import Home from "./pages/Home";
import fetchPokemonData from "./hooks/fetchPokemonData";
import Difficulty from "./components/Difficulty/Difficulty";
import Collections from "./pages/Collections";
import StateDisplay from "./components/StateDisplay/StateDisplay";
import Credits from "./pages/Credits";
import { getItem } from "./utils/localStorage";

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
 const [isAnimating, setIsAnimating] = useState(false);
 const [isSprite, setIsSprite] = useState(false);
 const [collectedOnly, setCollectedOnly] = useState(false);

 const handlePokemonList = (data) => {
  const newPokemon = {
   id: data.id,
   pokemonImage: {
    artwork: data.sprites.other["official-artwork"].front_default
     ? data.sprites.other["official-artwork"].front_default
     : data.sprites.other["official-artwork"].front_shiny,
    sprite: data.sprites.front_default
     ? data.sprites.front_default
     : data.sprites.front_shiny,
   },
   pokemonName: data.name,
   pokemonHP: data.stats[0].base_stat,
   pokemonAttack: data.stats[1].base_stat,
   pokemonDefense: data.stats[2].base_stat,
   pokemonSpeed: data.stats[5].base_stat,
   pokemonHeight: data.height,
   pokemonWeight: data.weight,
   pokemonAbilities: data.abilities.map((ability) => ability.ability.name),
   pokemonCries: data.cries.latest ? data.cries.latest : data.cries.legacy,
   pokemonSpecies: data.species.url.split("/").slice(-2, -1).join("/"),
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
  setIsAnimating(false);

  handleFetch(resolvedDifficulty);
 };

 const initializeTotalPokemon = useCallback(() => {
  console.log(pokemonTotal);
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
    setIsAnimating(true);
   }
  }
 }, [pokemonList]);

 useEffect(() => {
  const allCards = [...document.querySelectorAll(".card")];
  allCards.map((card) => {
   card.className = `card ${isAnimating ? "backside" : ""}`;
  });
 }, [isAnimating]);

 useEffect(() => {
  const savedData = getItem("savedPokemon", setError);
  if (savedData) {
   setSavedCard(savedData);
  }
 }, []);

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

  if (error) {
   setError(null);
  }
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
   {(loading || error) && (
    <StateDisplay loading={loading} error={error} handleReturn={handleReturn} />
   )}
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
     case "ended":
     case "finished":
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
        isAnimating={isAnimating}
        setIsAnimating={setIsAnimating}
        setError={setError}
       />
      );
     case "collections":
      return (
       <Collections
        savedCard={savedCard}
        pokemonTotal={pokemonTotal}
        handleReturn={handleReturn}
        setIsSprite={setIsSprite}
        isSprite={isSprite}
        collectedOnly={collectedOnly}
        setCollectedOnly={setCollectedOnly}
        setError={setError}
        setLoading={setLoading}
       />
      );
     case "credits":
      return <Credits handleReturn={handleReturn} />;
     default:
      return null;
    }
   })()}
  </>
 );
}

export default App;
