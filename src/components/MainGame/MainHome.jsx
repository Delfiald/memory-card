function MainHome({ handleDifficulty, setCreditsOpen, setResetOpen }) {
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
   <button onClick={() => setCreditsOpen(true)}>
    <div className="icon">
     <img src="./menu/pokestar.png" alt="" />
    </div>
    <div>Credits</div>
   </button>
   <button onClick={() => setResetOpen(true)}>Reset</button>
  </main>
 );
}

export default MainHome;
