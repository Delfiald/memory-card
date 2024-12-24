import "./mainGame.css";
import Card from "../Card/Card";
import { setItem } from "../../utils/localStorage";

function MainGame({
 gameState,
 setGameState,
 currentScore,
 setCurrentScore,
 setBestScore,
 pokemonList,
 setPokemonList,
 setSavedCard,
 isAnimating,
 setIsAnimating,
 setError,
}) {
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
  setCurrentScore((prevScore) => prevScore + 1);
  setBestScore((prevBestScore) => {
   const bestScore = Math.max(prevBestScore, currentScore + 1);

   setItem("bestScore", bestScore, setError);

   return bestScore;
  });
 };

 const handleClickedCard = async (id) => {
  if (gameState !== "start") return;
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
   setGameState("ended");
  }
 };

 return (
  <main>
   <section className="cards-list-wrapper">
    {pokemonList.map((pokemon) => (
     <Card
      key={pokemon.id}
      setCurrentScore={setCurrentScore}
      pokemonId={pokemon.id}
      pokemonName={pokemon.pokemonName}
      pokemonType={pokemon.type}
      pokemonImage={pokemon.pokemonImage.artwork}
      handleClickedCard={handleClickedCard}
      isAnimating={isAnimating}
      gameState={gameState}
     />
    ))}
   </section>
  </main>
 );
}

export default MainGame;
