import "./card.css";

function Card({ pokemon, handleClickedCard }) {
 const hoverHandler = (e) => {
  const { clientX, clientY } = e;
  const card = e.currentTarget.getBoundingClientRect();
  const mouseX = clientX - card.left;
  const mouseY = clientY - card.top;

  const cardWidth = card.width;
  const cardHeight = card.height;

  const xPercent = mouseX / cardWidth - 0.5;
  const yPercent = mouseY / cardHeight - 0.5;

  const rotateX = -yPercent * 40;
  const rotateY = xPercent * 40;

  e.currentTarget.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1, 1, 1)`;
 };

 const resetRotation = (e) => {
  e.currentTarget.style.transform =
   "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)";
 };

 return (
  <div
   onMouseMove={(e) => hoverHandler(e)}
   onMouseLeave={(e) => resetRotation(e)}
   onClick={() => handleClickedCard(pokemon.id)}
   className="card"
  >
   <div className="card-wrapper">
    <div className="card-information">
     <div className="pokemon-name">
      <p>{pokemon.pokemonName}</p>
     </div>
     <div className="pokemon-type">
      <img
       className={pokemon.type}
       src={`/types/${pokemon.type}.svg`}
       alt={pokemon.type}
      />
     </div>
    </div>
    <div className="pokemon-image">
     <img src={pokemon.pokemonImage} alt="pokemon-image" />
    </div>
   </div>
  </div>
 );
}

export default Card;
