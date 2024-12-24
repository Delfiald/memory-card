import { useState } from "react";
import Card from "../components/Card/Card";
import BackSideCard from "../components/Card/BackSideCard";
import fetchPokemonData from "../hooks/fetchPokemonData";
import "../styles/collections.css";
import Help from "../components/Help/Help";

function CollectionsHeader({
 handleReturn,
 savedCard,
 pokemonTotal,
 dropdownShown,
 setDropdownShown,
 itemPerPage,
 isSprite,
 setIsSprite,
 collectedOnly,
 setHelpOpen,
 handlePokemonPerPage,
 handleShowCollected,
}) {
 return (
  <>
   <h2>Collections</h2>
   <button onClick={() => setHelpOpen(true)} className="help-button">
    <i className="fas fa-question"></i>
   </button>
   <button className="return-button" onClick={handleReturn}>
    <i className="fas fa-arrow-turn-down"></i>
   </button>
   <div className="collections-header">
    <div className="collections-action">
     <button className="show-pokemon" onClick={handleShowCollected}>
      {collectedOnly ? "Collected Only" : "All"}
     </button>
     <div className="image-toggler-wrapper">
      <input
       onChange={(e) => setIsSprite(e.target.checked)}
       id="image-toggler"
       type="checkbox"
       checked={isSprite}
      />
      <label htmlFor="image-toggler">
       {isSprite === true ? `Sprite` : `Artwork`}
       <div
        style={
         isSprite
          ? { left: "100%", transform: "translate(-100%, -50%)" }
          : { left: "0" }
        }
       >
        <img
         src={
          isSprite === true ? `./pokeball/1.png` : "./pokeball/pokeball.svg"
         }
         alt=""
        />
       </div>
      </label>
     </div>
    </div>
    <div className="pokemon-collected">
     <p>Pokemon Collected</p>
     <p>
      {savedCard} / {pokemonTotal}
     </p>
    </div>
    <button
     onMouseEnter={() => setDropdownShown(true)}
     className="pokemon-per-page"
     onMouseLeave={() => setDropdownShown(false)}
    >
     <div className="shown">
      {itemPerPage}
      {dropdownShown ? (
       <i className="fas fa-chevron-up"> </i>
      ) : (
       <i className="fas fa-chevron-down"></i>
      )}
     </div>
     <div className="shown-list">
      <div onClick={() => handlePokemonPerPage(25)}>25</div>
      <div onClick={() => handlePokemonPerPage(50)}>50</div>
      <div onClick={() => handlePokemonPerPage(100)}>100</div>
     </div>
    </button>
   </div>
  </>
 );
}

function CollectionsFooter({ pokemonTotal, itemPerPage, page, setPage }) {
 const totalPage = Math.ceil(pokemonTotal / itemPerPage);

 if (totalPage <= 1) {
  return null;
 }

 return (
  <div className="collections-bottom">
   <div className="arrow-button">
    {page > 1 && (
     <button className="prev-button" onClick={() => setPage(page - 1)}>
      <i className="fas fa-chevron-left"></i>
     </button>
    )}
    {page < totalPage && (
     <button className="next-button" onClick={() => setPage(page + 1)}>
      <i className="fas fa-chevron-right"></i>
     </button>
    )}
   </div>
   <div className="page-number-wrapper">
    {page !== 1 && <button onClick={() => setPage(1)}>1</button>}

    {page > 3 && <button onClick={() => setPage(page - 2)}>...</button>}

    {totalPage > 3 && page === totalPage && (
     <button onClick={() => setPage(page - 2)}>{page - 2}</button>
    )}

    {page > 2 && <button onClick={() => setPage(page - 1)}>{page - 1}</button>}

    <button className="active">{page}</button>

    {page < totalPage - 1 && (
     <button onClick={() => setPage(page + 1)}>{page + 1}</button>
    )}

    {totalPage > 3 && page === 1 && (
     <button onClick={() => setPage(page + 2)}>{page + 2}</button>
    )}

    {page < totalPage - 2 && (
     <button onClick={() => setPage(page + 2)}>...</button>
    )}

    {page !== totalPage && (
     <button onClick={() => setPage(totalPage)}>{totalPage}</button>
    )}
   </div>
  </div>
 );
}

function PokemonDetails({
 pokemonDetails,
 setPokemonDetails,
 isSprite,
 flavorText,
}) {
 const [audio] = useState(new Audio(pokemonDetails.pokemonCries));

 const playPokemonCries = () => {
  audio.currentTime = 0;
  audio.play();
  audio.volume = 0.25;
 };

 return (
  <div className="pokemon-details">
   <div className="pokemon-details-wrapper">
    <div className="pokemon-details-container">
     <Card
      pokemonId={pokemonDetails.id}
      pokemonName={pokemonDetails.pokemonName}
      pokemonType={pokemonDetails.type}
      pokemonImage={
       isSprite
        ? pokemonDetails.pokemonImage.sprite
        : pokemonDetails.pokemonImage.artwork
      }
     />
     <div className="pokemon-information">
      <div className="pokemon-name">{pokemonDetails.pokemonName}</div>
      <div className="pokemon-descriptions">
       <div className="pokemon-basic-information">
        <div className="pokemon-id">NO. {pokemonDetails.id}</div>
        <div className="pokemon-height">
         <div>Height: {pokemonDetails.pokemonHeight / 10} m</div>
        </div>
        <div className="pokemon-weight">
         <div>Weight: {pokemonDetails.pokemonWeight / 10} kg.</div>
        </div>
       </div>
       <div className="pokemon-description">{flavorText}</div>
      </div>
      <div className="pokemon-stats">
       <div className="pokemon-type">
        <div className="stat-name">Type</div>
        <div className="stat-detail">{pokemonDetails.type}</div>
       </div>
       <div className="pokemon-hp">
        <div className="stat-name">HP</div>
        <div className="stat-detail">{pokemonDetails.pokemonHP}</div>
       </div>
       <div className="pokemon-attack">
        <div className="stat-name">Attack</div>
        <div className="stat-detail">{pokemonDetails.pokemonAttack}</div>
       </div>
       <div className="pokemon-defense">
        <div className="stat-name">Defense</div>
        <div className="stat-detail">{pokemonDetails.pokemonDefense}</div>
       </div>
       <div className="pokemon-speed">
        <div className="stat-name">Speed</div>
        <div className="stat-detail">{pokemonDetails.pokemonSpeed}</div>
       </div>
      </div>
      <div className="pokemon-abilities">
       <p>Abilities</p>
       <div className="abilities-wrapper">
        {pokemonDetails.pokemonAbilities.map((ability, index) => (
         <div key={index} className="ability">
          {ability}
         </div>
        ))}
       </div>
      </div>
      <div className="pokemon-cries">
       <button onClick={playPokemonCries}>
        <i className="fas fa-volume-high"></i>
       </button>
      </div>
     </div>
     <button onClick={() => setPokemonDetails(null)} className="close-button">
      <i className="fas fa-turn-down"></i>
     </button>
    </div>
   </div>
  </div>
 );
}

function Collections({
 savedCard,
 pokemonTotal,
 handleReturn,
 isSprite,
 setIsSprite,
 collectedOnly,
 setCollectedOnly,
 setError,
 setLoading,
 gameState,
 helpOpen,
 setHelpOpen,
}) {
 const [dropdownShown, setDropdownShown] = useState(false);
 const [itemPerPage, setItemPerPage] = useState(100);
 const [page, setPage] = useState(1);
 const [pokemonDetails, setPokemonDetails] = useState(null);
 const [flavorText, setFlavorText] = useState(null);

 const handleClickedCard = (pokemon) => {
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

 const fetchPokemonDetails = async (pokemon) => {
  console.log(pokemon);
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
   <div className="card-list-wrapper">
    {collectedOnly
     ? savedCard
        .slice((page - 1) * itemPerPage, page * itemPerPage)
        .map((pokemon) => (
         <Card
          key={pokemon.id}
          pokemonId={pokemon.id}
          pokemonName={pokemon.pokemonName}
          pokemonType={pokemon.type}
          pokemonImage={
           isSprite ? pokemon.pokemonImage.sprite : pokemon.pokemonImage.artwork
          }
          handleClickedCard={() => {
           handleClickedCard(pokemon), fetchPokemonDetails(pokemon);
          }}
         />
        ))
     : Array.from({ length: itemPerPage }, (_, index) => {
        const pokemonId = (page - 1) * itemPerPage + index + 1;
        if (pokemonId > pokemonTotal) return null;
        const pokemon = savedCard.find((poke) => poke.id === pokemonId);
        return pokemon ? (
         <Card
          key={pokemon.id}
          pokemonId={pokemon.id}
          pokemonName={pokemon.pokemonName}
          pokemonType={pokemon.type}
          pokemonImage={
           isSprite ? pokemon.pokemonImage.sprite : pokemon.pokemonImage.artwork
          }
          handleClickedCard={() => {
           handleClickedCard(pokemon), fetchPokemonDetails(pokemon);
          }}
         />
        ) : (
         <div key={`placeholder-${index + 1}`} className="card backside">
          <BackSideCard />
         </div>
        );
       })}
   </div>
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
