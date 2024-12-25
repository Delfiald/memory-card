import { useState } from "react";
import Card from "../components/Card/Card";
import BackSideCard from "../components/Card/BackSideCard";
import Help from "../components/Help/Help";
import PokemonDetails from "../components/Details/PokemonDetails";
import CollectionsHeader from "../components/Header/CollectionsHeader";
import CollectionsFooter from "../components/Footer/CollectionsFooter";

function Collections({
 savedCard,
 pokemonTotal,
 handleReturn,
 isSprite,
 setIsSprite,
 collectedOnly,
 setCollectedOnly,
 gameState,
 helpOpen,
 setHelpOpen,
 handleFetch,
 flavorText,
}) {
 const [dropdownShown, setDropdownShown] = useState(false);
 const [itemPerPage, setItemPerPage] = useState(100);
 const [page, setPage] = useState(1);
 const [pokemonDetails, setPokemonDetails] = useState(null);

 const handleClickedCard = async (pokemon) => {
  await handleFetch(undefined, pokemon);
  setPokemonDetails(pokemon);
 };

 const handlePokemonPerPage = (item) => {
  setItemPerPage(item);
  setPage(1);
 };

 const handleShowCollected = () => {
  setCollectedOnly((prevState) => !prevState);
  setPage(1);
 };

 const renderCard = (pokemon) => {
  return (
   <Card
    key={pokemon.id}
    pokemonId={pokemon.id}
    pokemonName={pokemon.pokemonName}
    pokemonType={pokemon.type}
    pokemonImage={
     isSprite ? pokemon.pokemonImage.sprite : pokemon.pokemonImage.artwork
    }
    handleClickedCard={() => handleClickedCard(pokemon)}
   />
  );
 };

 const renderPokemonCards = () => {
  if (collectedOnly) {
   return savedCard
    .slice((page - 1) * itemPerPage, page * itemPerPage)
    .map((pokemon) => renderCard(pokemon));
  }

  return Array.from({ length: itemPerPage }, (_, index) => {
   const pokemonId = (page - 1) * itemPerPage + index + 1;
   if (pokemonId > pokemonTotal) return null;
   const pokemon = savedCard.find((poke) => poke.id === pokemonId);
   return pokemon ? (
    renderCard(pokemon)
   ) : (
    <div key={`placeholder-${index + 1}`} className="card backside">
     <BackSideCard />
    </div>
   );
  });
 };

 return (
  <section id="collections">
   <CollectionsHeader
    handleReturn={handleReturn}
    savedCard={savedCard.length}
    pokemonTotal={pokemonTotal}
    dropdownShown={dropdownShown}
    setDropdownShown={setDropdownShown}
    itemPerPage={itemPerPage}
    isSprite={isSprite}
    setIsSprite={setIsSprite}
    collectedOnly={collectedOnly}
    setHelpOpen={setHelpOpen}
    handlePokemonPerPage={handlePokemonPerPage}
    handleShowCollected={handleShowCollected}
   />
   <div className="cards-list-wrapper">{renderPokemonCards()}</div>
   {helpOpen && <Help gameState={gameState} setHelpOpen={setHelpOpen} />}
   {pokemonDetails && (
    <PokemonDetails
     pokemonDetails={pokemonDetails}
     setPokemonDetails={setPokemonDetails}
     isSprite={isSprite}
     flavorText={flavorText}
    />
   )}
   <CollectionsFooter
    pokemonTotal={collectedOnly ? savedCard.length : pokemonTotal}
    itemPerPage={itemPerPage}
    page={page}
    setPage={setPage}
   />
  </section>
 );
}

export default Collections;
