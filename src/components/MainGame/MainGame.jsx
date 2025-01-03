import "./mainGame.css";
import Card from "../Card/Card";
import { setItem } from "../../utils/localStorage";

function MainGame({
 gameState,
 setGameState,
 pokemonList,
 setPokemonList,
 setSavedCard,
 isAnimating,
 setIsAnimating,
 setError,
}) {
 const handleDifficultyClass = () => {
  if (gameState.difficulty === 5) {
   return "easy";
  } else if (gameState.difficulty === 8) {
   return "medium";
  } else if (gameState.difficulty === 15) {
   return "hard";
  }
 };

 const shufflePokemon = (newPokemonList) => {
  const shuffled = [...newPokemonList];
  for (let i = shuffled.length - 1; i > 0; i--) {
   const randomIndex = Math.floor(Math.random() * (i + 1));
   [shuffled[i], shuffled[randomIndex]] = [shuffled[randomIndex], shuffled[i]];
  }

  setPokemonList(shuffled);
 };

 const handleSavePokemon = (id) => {
  setSavedCard((prevState) => {
   const isPokemonSaved = prevState.some((pokemon) => pokemon.id === id);
   if (isPokemonSaved) return prevState;

   const newPokemon = pokemonList.find((pokemon) => pokemon.id === id);
   const updatedList = [...prevState, newPokemon].sort((a, b) => a.id - b.id);

   setItem("savedPokemon", updatedList, setError);

   return updatedList;
  });
 };

 const handlePokemonList = (id) => {
  handleSavePokemon(id);
  setPokemonList((prevPokemon) => {
   const newPokemonList = prevPokemon.map((pokemon) =>
    pokemon.id === id ? { ...pokemon, isClicked: true } : pokemon
   );
   shufflePokemon(newPokemonList);

   return newPokemonList;
  });
 };

 const handleScore = () => {
  setGameState((prevState) => {
   const bestScore = Math.max(prevState.bestScore, prevState.currentScore + 1);

   setItem("bestScore", bestScore, setError);
   return {
    ...prevState,
    currentScore: prevState.currentScore + 1,
    bestScore: bestScore,
   };
  });
 };

 const handleClickedCard = async (id) => {
  if (gameState.state !== "start") return;
  setIsAnimating(true);

  if (!pokemonList.some((pokemon) => pokemon.id === id && pokemon.isClicked)) {
   handleScore();
   await new Promise((resolve) => {
    setTimeout(() => {
     setIsAnimating(false);
     resolve();
    }, 1000);
   });

   handlePokemonList(id);
  } else {
   setGameState((prevState) => ({
    ...prevState,
    state: "ended",
   }));
  }
 };

 return (
  <main>
   <section className={`cards-list-wrapper ${handleDifficultyClass()}`}>
    {pokemonList.map((pokemon) => (
     <Card
      key={pokemon.id}
      pokemonId={pokemon.id}
      pokemonName={pokemon.pokemonName}
      pokemonType={pokemon.type}
      pokemonImage={pokemon.pokemonImage.artwork}
      handleClickedCard={handleClickedCard}
      isAnimating={isAnimating}
      gameState={gameState.state}
     />
    ))}
   </section>
  </main>
 );
}

export default MainGame;
