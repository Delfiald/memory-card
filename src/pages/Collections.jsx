import Card from "../components/Card/Card";

function Collections({ savedCard, pokemonTotal, handleReturn, dropdownShown }) {
 return (
  <section id="collections">
   <h2>Collections</h2>
   <div className="collections-header">
    <button onClick={handleReturn}>
     <i className="fas fa-arrow-turn-down"></i>
    </button>
    <div className="pokemon-collected">
     <p>Pokemon Collected</p>
     <p>
      {savedCard.length} / {pokemonTotal.count}
     </p>
    </div>
    <button className="shown-pokemon">
     <div className="shown">
      25{" "}
      {dropdownShown ? (
       <i className="fas fa-chevron-down"> </i>
      ) : (
       <i className="fas fa-chevron-up"></i>
      )}
     </div>
     <div className="shown-list">
      <div>25</div>
      <div>50</div>
      <div>100</div>
     </div>
    </button>
   </div>
   <div className="card-list-wrapper">
    {savedCard.map((pokemon) => (
     <Card key={pokemon.id} pokemon={pokemon} />
    ))}
   </div>
   <div className="collections-bottom">
    <button>
     <i className="fas fa-chevron-left"></i>
    </button>
    <div className="page-number-wrapper">
     <button>1</button>
     <button className="active">2</button>
     <button>3</button>
     <button>...</button>
     <button>53</button>
    </div>
    <button>
     <i className="fas fa-chevron-right"></i>
    </button>
   </div>
  </section>
 );
}

export default Collections;
