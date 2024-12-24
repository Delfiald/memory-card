import "./header.css";

function Header({
 currentScore,
 bestScore,
 pokemonList,
 setOptionOpen,
 setHelpOpen,
}) {
 return (
  <>
   <header>
    <button className="option-button" onClick={() => setOptionOpen(true)}>
     <i className="fas fa-bars"></i>
    </button>
    <button className="help-button" onClick={() => setHelpOpen(true)}>
     <i className="fas fa-question"></i>
    </button>
    <h1 className="hero">
     <div className="pokemon-text">Pokémon</div> Memory Card
    </h1>
    <ul className="score-wrapper">
     <li className="score">Score: {currentScore ? currentScore : 0}</li>
     <li className="best-score">Best Score: {bestScore ? bestScore : 0}</li>
     <li className="total-score">
      {currentScore} / {pokemonList}
     </li>
    </ul>
   </header>
  </>
 );
}

export default Header;
