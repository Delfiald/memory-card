import { useState } from "react";
import { removeItem } from "../utils/localStorage";

function Reset({ handleReset, setResetOpen }) {
 return (
  <div className="reset">
   <div className="reset-wrapper">
    <div className="reset-container">
     <div className="reset-text">
      <div>This will reset all of your progress.</div>
      <div>All saved Pokémon and your best score will be lost.</div>
      <div>Are you sure?</div>
     </div>
     <div className="reset-action">
      <button className="understood-button" onClick={handleReset}>
       Understood
      </button>
      <button onClick={() => setResetOpen(false)} className="close-button">
       Cancel
      </button>
     </div>
    </div>
   </div>
  </div>
 );
}

function Home({ setGameState, setSavedCard, setBestScore, setError }) {
 const [resetOpen, setResetOpen] = useState(false);
 const handleReset = () => {
  setSavedCard([]);
  setBestScore(0);
  removeItem("savedPokemon", setError);
  removeItem("bestScore", setError);
  setResetOpen(false);
 };

 return (
  <section id="home">
   <header>
    <h1>Pokemon</h1>
    <h2>Memory Card</h2>
   </header>
   <div className="home-action">
    <button onClick={() => setGameState("difficulty")}>
     <div className="icon">
      <img src="./menu/card.png" alt="" />
     </div>
     <div>Start Game</div>
    </button>
    <button onClick={() => setGameState("collections")}>
     <div className="icon">
      <img src="./menu/pokedex.png" alt="" />
     </div>
     <div>Collections</div>
    </button>
    <button onClick={() => setGameState("credits")}>
     <div className="icon">
      <img src="./menu/pokestar.png" alt="" />
     </div>
     <div>Credits</div>
    </button>
    <button onClick={() => setResetOpen(true)}>Reset</button>
   </div>
   {resetOpen && (
    <Reset handleReset={handleReset} setResetOpen={setResetOpen} />
   )}
  </section>
 );
}

export default Home;
