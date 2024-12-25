import { useState, useEffect } from "react";
import Game from "./pages/Game";
import Home from "./pages/Home";
import fetchPokemonData from "./hooks/fetchPokemonData";
import Difficulty from "./components/Difficulty/Difficulty";
import Collections from "./pages/Collections";
import StateDisplay from "./components/StateDisplay/StateDisplay";
import { getItem } from "./utils/localStorage";
import { nameFormatter, adjustFontSize } from "./utils/nameFormatter";

function App() {
 //  const [gameState, setGameState] = useState(null);
 const [gameState, setGameState] = useState({
  currentScore: 0,
  bestScore: 0,
  difficulty: null,
  state: null,
 });
 //  const [currentScore, setCurrentScore] = useState(0);
 // const [bestScore, setBestScore] = useState(0);
 //  const [difficulty, setDifficulty] = useState(null);
 const [savedCard, setSavedCard] = useState([]);
 const [error, setError] = useState(null);
 const [loading, setLoading] = useState(false);
 const [isFetching, setIsFetching] = useState(false);
 const [pokemonTotal] = useState(1025);
 const [pokemonList, setPokemonList] = useState([]);
 const [isAnimating, setIsAnimating] = useState(false);
 const [isSprite, setIsSprite] = useState(false);
 const [collectedOnly, setCollectedOnly] = useState(false);
 const [helpOpen, setHelpOpen] = useState(false);
 const [flavorText, setFlavorText] = useState(null);

 //  Handle PokemonList
 const addPokemonList = (data) => {
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
   pokemonName: nameFormatter(data.name),
   pokemonHP: data.stats[0].base_stat,
   pokemonAttack: data.stats[1].base_stat,
   pokemonDefense: data.stats[2].base_stat,
   pokemonSpeed: data.stats[5].base_stat,
   pokemonHeight: data.height,
   pokemonWeight: data.weight,
   pokemonAbilities: data.abilities.map((ability) =>
    nameFormatter(ability.ability.name)
   ),
   pokemonCries: data.cries.latest ? data.cries.latest : data.cries.legacy,
   pokemonSpecies: data.species.url.split("/").slice(-2, -1).join("/"),
   type: data.types[0].type.name,
   isClicked: false,
  };

  setPokemonList((prevPokemonList) => [...prevPokemonList, newPokemon]);
 };

 const resetGameState = () => {
  setPokemonList([]);
  setGameState((prevState) => ({
   ...prevState,
   currentScore: 0,
  }));
  setIsAnimating(true);
 };

 //  Handle Start / Restart
 const handleStart = (difficultyValue = undefined) => {
  if (isFetching) return;
  const resolvedDifficulty = difficultyValue || gameState.difficulty;

  resetGameState();

  setGameState((prevState) => ({
   ...prevState,
   difficulty: difficultyValue ? difficultyValue : prevState.difficulty,
   state: "start",
  }));

  setTimeout(() => {
   setIsAnimating(false);
  }, 4500);

  handleFetch(resolvedDifficulty);
 };

 //  Handle Return to Home
 const handleReturn = () => {
  setGameState((prevState) => ({
   ...prevState,
   state: null,
  }));

  resetGameState();

  if (error) {
   setError(null);
  }
 };

 //  Fetching Random Pokemon
 const handleFetch = async (difficultyValue, pokemon = null) => {
  if (isFetching) return;
  setIsFetching(true);

  const resolvedDifficulty = difficultyValue || gameState.difficulty;

  try {
   if (pokemon) {
    const { getDetailPokemon } = fetchPokemonData(setError, setLoading);

    const pokemonData = await getDetailPokemon(pokemon.pokemonSpecies);
    const flavorTextEntry = pokemonData.flavor_text_entries.find(
     (entry) => entry.language.name === "en"
    );

    if (flavorTextEntry) {
     const cleanedText = flavorTextEntry.flavor_text.replace(/\f/g, " ");
     setFlavorText(cleanedText);
    } else {
     setFlavorText("No flavor text available");
    }
   } else {
    const { getRandomPokemon } = fetchPokemonData(setError, setLoading);
    const pokemonData = await getRandomPokemon(
     resolvedDifficulty,
     pokemonTotal,
     setIsFetching
    );

    pokemonData.forEach((data) => {
     addPokemonList(data);
    });
   }
  } catch (error) {
   setError(error);
  } finally {
   setIsFetching(false);
  }
 };

 //  Use Effect
 useEffect(() => {
  const savedScore = getItem("bestScore", setError);
  const savedData = getItem("savedPokemon", setError);
  if (savedData && Array.isArray(savedData)) {
   setSavedCard(savedData);
  }
  if (typeof savedScore === "number") {
   setGameState((prevState) => ({
    ...prevState,
    bestScore: savedScore,
   }));
  }
 }, []);

 useEffect(() => {
  const controller = new AbortController();
  const allCards = [...document.querySelectorAll(".card")];
  allCards.forEach((card) => {
   card.className = `card ${isAnimating ? "backside" : ""}`;
  });

  return () => {
   controller.abort();
  };
 }, [isAnimating]);

 useEffect(() => {
  adjustFontSize();
  if (pokemonList.length > 0) {
   const allClicked = pokemonList.every((pokemon) => pokemon.isClicked);
   if (allClicked) {
    setGameState((prevState) => ({
     ...prevState,
     state: "finished",
    }));
    setIsAnimating(true);
   }
  }
 }, [pokemonList]);

 // Component Renderer
 const renderGameState = () => {
  switch (gameState.state) {
   case null:
    return (
     <Home
      gameState={gameState}
      setGameState={setGameState}
      handleStart={handleStart}
      setSavedCard={setSavedCard}
      setError={setError}
     />
    );
   case "difficulty":
    return <Difficulty handleStart={handleStart} handleReturn={handleReturn} />;
   case "start":
   case "ended":
   case "finished":
    return (
     <Game
      gameState={gameState}
      setGameState={setGameState}
      pokemonList={pokemonList}
      setPokemonList={setPokemonList}
      setSavedCard={setSavedCard}
      handleStart={handleStart}
      handleReturn={handleReturn}
      isAnimating={isAnimating}
      setIsAnimating={setIsAnimating}
      setError={setError}
      helpOpen={helpOpen}
      setHelpOpen={setHelpOpen}
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
      gameState={gameState}
      helpOpen={helpOpen}
      setHelpOpen={setHelpOpen}
      handleFetch={handleFetch}
      flavorText={flavorText}
     />
    );
   default:
    return null;
  }
 };

 return (
  <>
   {(loading || error) && (
    <StateDisplay loading={loading} error={error} handleReturn={handleReturn} />
   )}
   {renderGameState()}
  </>
 );
}

export default App;
