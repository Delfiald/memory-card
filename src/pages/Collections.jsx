import { useState } from "react";
import Card from "../components/Card/Card";
import BackSideCard from "../components/Card/BackSideCard";
import fetchPokemonData from "../hooks/fetchPokemonData";

function CollectionsHeader({
 handleReturn,
 savedCard,
 pokemonTotal,
 dropdownShown,
 setDropdownShown,
 itemPerPage,
 setItemPerPage,
 isSprite,
 setIsSprite,
 collectedOnly,
 setCollectedOnly,
 setHelpOpen,
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
    <button onClick={() => setCollectedOnly((prevState) => !prevState)}>
     {collectedOnly ? "Collected Only" : "All"}
    </button>
    <div className="pokemon-collected">
     <p>Pokemon Collected</p>
     <p>
      {savedCard} / {pokemonTotal}
     </p>
    </div>
    <div className="collections-action">
     <button
      onMouseEnter={() => setDropdownShown(true)}
      className="shown-pokemon"
      onMouseLeave={() => setDropdownShown(false)}
     >
      <div className="shown">
       {itemPerPage}
       {dropdownShown ? (
        <i className="fas fa-chevron-down"> </i>
       ) : (
        <i className="fas fa-chevron-up"></i>
       )}
      </div>
      <div className="shown-list">
       <div onClick={() => setItemPerPage(25)}>25</div>
       <div onClick={() => setItemPerPage(50)}>50</div>
       <div onClick={() => setItemPerPage(100)}>100</div>
      </div>
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

    {page === totalPage && (
     <button onClick={() => setPage(page - 2)}>{page - 2}</button>
    )}

    {page > 2 && <button onClick={() => setPage(page - 1)}>{page - 1}</button>}

    <button className="active">{page}</button>

    {page < totalPage - 1 && (
     <button onClick={() => setPage(page + 1)}>{page + 1}</button>
    )}

    {page === 1 && (
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

function CollectionsHelp({ setHelpOpen }) {
 return (
  <div className="help">
   <div className="help-wrapper">
    <div className="help-container">
     <div className="help-header">
      <h2>Collections Help</h2>
     </div>
     <div className="help-content">
      <div className="content-top">
       <div>
        <i className="fas fa-info"></i> What is Collections
       </div>
       <div className="descriptions">{`Collections is a feature where you can view all the Pokémon you've discovered while playing the Pokémon Memory Card game. It acts as a visual record of your progress and achievements in uncovering new Pokémon.`}</div>
      </div>
      <div className="how-it-works">
       <ul>
        <li>
         <div>1</div>
         <div className="title">Discovering Pokémon</div>
         <div className="">
          Whenever you click on a Pokémon card for the first time in the game,
          it will be added to your Collections.
         </div>
        </li>
        <li>
         <div>2</div>
         <div className="title">No Duplicates</div>
         <div className="">{`Pokémon that you've already discovered won't be added again, even if you click on their card multiple times.`}</div>
        </li>
        <li>
         <div>3</div>
         <div className="title">Your Personal Pokédex</div>
         <div className="">
          Think of Collections as your personal Pokédex! It tracks your unique
          finds and grows as you explore and play more.
         </div>
        </li>
       </ul>
      </div>
     </div>
     <div className="help-footer">
      <button onClick={() => setHelpOpen(false)}>Got It!</button>
     </div>
    </div>
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
}) {
 const [dropdownShown, setDropdownShown] = useState(false);
 const [itemPerPage, setItemPerPage] = useState(100);
 const [page, setPage] = useState(1);
 const [helpOpen, setHelpOpen] = useState(false);
 const [pokemonDetails, setPokemonDetails] = useState(null);
 const [flavorText, setFlavorText] = useState(null);

 const handleClickedCard = (pokemon) => {
  setPokemonDetails(pokemon);
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
    pokemonTotal={pokemonTotal.count}
    dropdownShown={dropdownShown}
    setDropdownShown={setDropdownShown}
    itemPerPage={itemPerPage}
    setItemPerPage={setItemPerPage}
    isSprite={isSprite}
    setIsSprite={setIsSprite}
    collectedOnly={collectedOnly}
    setCollectedOnly={setCollectedOnly}
    setHelpOpen={setHelpOpen}
   />
   <div className="card-list-wrapper">
    {collectedOnly
     ? savedCard.map((pokemon) => (
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
        if (pokemonId > pokemonTotal.count) return null;
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
          handleClickedCard={() => handleClickedCard(pokemon)}
         />
        ) : (
         <div key={`placeholder-${index + 1}`} className="card backside">
          <BackSideCard />
         </div>
        );
       })}
   </div>
   {helpOpen && <CollectionsHelp setHelpOpen={setHelpOpen} />}
   {pokemonDetails && (
    <PokemonDetails
     pokemonDetails={pokemonDetails}
     setPokemonDetails={setPokemonDetails}
     isSprite={isSprite}
     flavorText={flavorText}
    />
   )}
   <CollectionsFooter
    pokemonTotal={collectedOnly ? savedCard.length : pokemonTotal.count}
    itemPerPage={itemPerPage}
    page={page}
    setPage={setPage}
   />
  </section>
 );
}

export default Collections;
