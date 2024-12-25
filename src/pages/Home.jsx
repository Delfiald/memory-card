import { useState } from "react";
import { removeItem } from "../utils/localStorage";
import "../styles/home.css";

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

function HomeHeader() {
 return (
  <header>
   <h1>
    Pokémon
    <span></span>
   </h1>
   <h2>Memory Card</h2>
  </header>
 );
}

function HomeMain({ handleDifficulty, setResetOpen }) {
 return (
  <main className="home-action">
   <button onClick={() => handleDifficulty("difficulty")}>
    <div className="icon">
     <img src="./menu/card.png" alt="" />
    </div>
    <div>Start Game</div>
   </button>
   <button onClick={() => handleDifficulty("collections")}>
    <div className="icon">
     <img src="./menu/pokedex.png" alt="" />
    </div>
    <div>Collections</div>
   </button>
   <button onClick={() => handleDifficulty("credits")}>
    <div className="icon">
     <img src="./menu/pokestar.png" alt="" />
    </div>
    <div>Credits</div>
   </button>
   <button onClick={() => setResetOpen(true)}>Reset</button>
  </main>
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

 const handleDifficulty = (state) => {
  setGameState((prevState) => ({
   ...prevState,
   state: state,
  }));
 };

 return (
  <section id="home">
   <HomeHeader />
   <HomeMain handleDifficulty={handleDifficulty} setResetOpen={setResetOpen} />
   {resetOpen && (
    <Reset handleReset={handleReset} setResetOpen={setResetOpen} />
   )}
  </section>
 );
}

export default Home;
