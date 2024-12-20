import "./modal.css";

function GameFinish({ currentScore, handleStart, difficulty }) {
 const handleNext = () => {
  if (difficulty === 5) {
   handleStart(8);
  } else {
   handleStart(15);
  }
 };
 return (
  <div className="gameFinish">
   <p>You Win</p>
   {difficulty < 15 && <button onClick={() => handleNext()}>Next Game</button>}
   <button onClick={() => handleStart()}>Retry</button>
   <button>Return to Menu</button>
   <p>Score {currentScore}</p>
  </div>
 );
}

function GameOver({ currentScore, handleStart }) {
 return (
  <div className="gameOver">
   <p>Game Over</p>
   <button onClick={() => handleStart()}>Retry</button>
   <button>Return to Menu</button>
   <p>Score {currentScore}</p>
  </div>
 );
}

function Modal({ gameState, currentScore, handleStart, difficulty }) {
 return (
  <section className="modal">
   {gameState === "finished" ? (
    <GameFinish
     currentScore={currentScore}
     handleStart={handleStart}
     difficulty={difficulty}
    />
   ) : (
    <GameOver currentScore={currentScore} handleStart={handleStart} />
   )}
  </section>
 );
}

export default Modal;
