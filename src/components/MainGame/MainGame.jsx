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
 const handleClickedCard = (id) => {
  if (!gameState) return;

  if (!pokemonList.some((pokemon) => pokemon.id === id && pokemon.isClicked)) {
   setSavedCard((prevState) => [...prevState, id]);
   setPokemonList((prevPokemon) =>
    prevPokemon.map((pokemon) =>
     pokemon.id === id
      ? {
         ...pokemon,
         isClicked: true,
        }
      : pokemon
    )
   );
   setCurrentScore((prevScore) => prevScore + 1);
   setBestScore((prevBestScore) => Math.max(prevBestScore, currentScore + 1));
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
