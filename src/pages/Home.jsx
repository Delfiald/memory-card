import { useState } from "react";
import { removeItem } from "../utils/localStorage";
import HomeHeader from "../components/Header/HomeHeader";
import MainHome from "../components/MainGame/MainHome";
import Reset from "../components/Reset/Reset";
import Credits from "../components/Credits/Credits";

function Home({ setGameState, setSavedCard, setBestScore, setError }) {
 const [resetOpen, setResetOpen] = useState(false);
 const [creditsOpen, setCreditsOpen] = useState(false);
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
   <MainHome
    handleDifficulty={handleDifficulty}
    setCreditsOpen={setCreditsOpen}
    setResetOpen={setResetOpen}
   />
   {creditsOpen && <Credits setCreditsOpen={setCreditsOpen} />}
   {resetOpen && (
    <Reset handleReset={handleReset} setResetOpen={setResetOpen} />
   )}
  </section>
 );
}

export default Home;
