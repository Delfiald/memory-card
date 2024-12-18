import "./mainGame.css";
import Card from "../Card/Card";

function MainGame(currentScore, setCurrentScore, setBestScore, totalScore) {
 return (
  <main>
   <section className="card-wrapper">
    <Card />
   </section>
  </main>
 );
}

export default MainGame;
