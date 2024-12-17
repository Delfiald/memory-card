import "./header.css";

function Header({ score }) {
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
     <li className="score">Score: {score}</li>
     <li className="best-score">Best Score: 18</li>
     <li className="total-score">0 / 18</li>
    </ul>
   </header>
  </>
 );
}

export default Header;
