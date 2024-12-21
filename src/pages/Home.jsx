function Home({ setGameState }) {
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
   </div>
  </section>
 );
}

export default Home;
