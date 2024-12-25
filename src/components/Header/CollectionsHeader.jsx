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
  <header>
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
  </header>
 );
}

export default CollectionsHeader;
