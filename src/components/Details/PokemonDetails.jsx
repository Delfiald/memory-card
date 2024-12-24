import Card from "../Card/Card";
import { useState } from "react";
import "./pokemonDetails.css";

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
  <section className="pokemon-details">
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
  </section>
 );
}

export default PokemonDetails;
