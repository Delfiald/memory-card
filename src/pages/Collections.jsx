import { useState } from "react";
import Card from "../components/Card/Card";
import BackSideCard from "../components/Card/BackSideCard";

function CollectionsHeader({
 handleReturn,
 savedCard,
 pokemonTotal,
 dropdownShown,
 itemPerPage,
 setItemPerPage,
 isSprite,
 setIsSprite,
}) {
 return (
  <>
   <h2>Collections</h2>
   <div className="collections-header">
    <button onClick={handleReturn}>
     <i className="fas fa-arrow-turn-down"></i>
    </button>
    <div className="pokemon-collected">
     <p>Pokemon Collected</p>
     <p>
      {savedCard} / {pokemonTotal}
     </p>
    </div>
    <button className="shown-pokemon">
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
     </label>
    </div>
   </div>
  </>
 );
}

function CollectionsFooter({ pokemonTotal, itemPerPage, page, setPage }) {
 const totalPage = Math.ceil(pokemonTotal.count / itemPerPage);

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

function Collections({
 savedCard,
 pokemonTotal,
 handleReturn,
 dropdownShown,
 isSprite,
 setIsSprite,
}) {
 const [itemPerPage, setItemPerPage] = useState(100);
 const [page, setPage] = useState(1);
 return (
  <section id="collections">
   <CollectionsHeader
    handleReturn={handleReturn}
    savedCard={savedCard.length}
    pokemonTotal={pokemonTotal.count}
    dropdownShown={dropdownShown}
    itemPerPage={itemPerPage}
    setItemPerPage={setItemPerPage}
    isSprite={isSprite}
    setIsSprite={setIsSprite}
   />
   <div className="card-list-wrapper">
    {Array.from({ length: itemPerPage }, (_, index) => {
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
      />
     ) : (
      <div key={`placeholder-${index + 1}`} className="card backside">
       <BackSideCard />
      </div>
     );
    })}
   </div>
   <CollectionsFooter
    pokemonTotal={pokemonTotal}
    itemPerPage={itemPerPage}
    page={page}
    setPage={setPage}
   />
  </section>
 );
}

export default Collections;
