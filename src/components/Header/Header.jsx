import "./header.css";

function Header({ currentScore, bestScore, pokemonList }) {
 return (
  <>
   <header>
    <aside>
     <button>
      <i className="fas fa-bars"></i>
     </button>
    </aside>
    <h1 className="hero">Pokemon Memory Card</h1>
    <ul className="score-wrapper">
     <li className="score">Score: {currentScore}</li>
     <li className="best-score">Best Score: {bestScore}</li>
     <li className="total-score">
      {currentScore} / {pokemonList}
     </li>
    </ul>
   </header>
  </>
 );
}

export default Header;
