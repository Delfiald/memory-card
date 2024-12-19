import "./mainGame.css";
import Card from "../Card/Card";

function MainGame({
 gameState,
 setGameState,
 currentScore,
 setCurrentScore,
 setBestScore,
 pokemonList,
 setPokemonList,
 setSavedCard,
}) {
 const shufflePokemon = (newPokemonList) => {
  const shuffled = [...newPokemonList];
  for (let i = shuffled.length - 1; i > 0; i--) {
   const randomIndex = Math.floor(Math.random() * (i + 1));
   [shuffled[i], shuffled[randomIndex]] = [shuffled[randomIndex], shuffled[i]];
  }

  setPokemonList(shuffled);
 };

 const handlePokemonList = (id) => {
  setSavedCard((prevState) => [...prevState, id]);
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
  setBestScore((prevBestScore) => Math.max(prevBestScore, currentScore + 1));
 };

 const handleClickedCard = (id) => {
  if (!gameState) return;

  if (!pokemonList.some((pokemon) => pokemon.id === id && pokemon.isClicked)) {
   handlePokemonList(id);
   handleScore();
  } else {
   setGameState(false);
   console.log("Game Over");
  }
 };

 return (
  <main>
   <section className="cards-list-wrapper">
    {pokemonList.map((pokemon) => (
     <Card
      key={pokemon.id}
      setCurrentScore={setCurrentScore}
      pokemon={pokemon}
      handleClickedCard={handleClickedCard}
     />
    ))}
   </section>
  </main>
 );
}

export default MainGame;
