import BackSideCard from "./BackSideCard";
import "./card.css";

function Card({
 pokemonId,
 pokemonName,
 pokemonType,
 pokemonImage,
 handleClickedCard,
 isAnimating,
 gameState,
}) {
 const hoverHandler = (e) => {
  if (isAnimating) return;
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
   onClick={(e) => {
    handleClickedCard && handleClickedCard(pokemonId);
    resetRotation(e);
   }}
   className={`card ${gameState === "start" && "backside"}`}
  >
   {isAnimating ? (
    <div className="back-wrapper">
     <BackSideCard />
    </div>
   ) : (
    <div className={`card-wrapper ${pokemonType}`}>
     <div className="card-information">
      <div className="pokemon-name">
       <p>{pokemonName}</p>
      </div>
      <div className="pokemon-type">
       <img
        className={pokemonType}
        src={`/types/${pokemonType}.svg`}
        alt={pokemonType}
       />
      </div>
     </div>
     <div className="pokemon-image">
      <img src={pokemonImage} alt="pokemon-image" />
     </div>
    </div>
   )}
  </div>
 );
}

export default Card;
