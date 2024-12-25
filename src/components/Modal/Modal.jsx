import "./modal.css";

function GameFinish({ currentScore, handleStart, difficulty, handleReturn }) {
 const handleNext = () => {
  if (difficulty === 5) {
   handleStart(8);
  } else {
   handleStart(15);
  }
 };
 return (
  <div className="game-finish">
   <h2>You Win</h2>
   <p className="score">Score {currentScore}</p>
   {difficulty < 15 && (
    <button className="next" onClick={() => handleNext()}>
     Next Game <i className="fas fa-chevron-right"></i>
    </button>
   )}
   <div className="modal-action">
    <button className="retry" onClick={() => handleStart()}>
     Retry
    </button>
    <button className="return" onClick={handleReturn}>
     Return to Menu
    </button>
   </div>
  </div>
 );
}

function GameOver({ currentScore, handleStart, handleReturn }) {
 return (
  <div className="game-over">
   <h2>Game Over</h2>
   <p className="score">Score {currentScore}</p>
   <div className="modal-action">
    <button className="retry" onClick={() => handleStart()}>
     Retry
    </button>
    <button className="return" onClick={handleReturn}>
     Return to Menu
    </button>
   </div>
  </div>
 );
}

function Modal({ gameState, handleStart, handleReturn }) {
 return (
  <section className="modal">
   <div className="modal-wrapper">
    {gameState.state === "finished" ? (
     <GameFinish
      currentScore={gameState.currentScore}
      handleStart={handleStart}
      difficulty={gameState.difficulty}
      handleReturn={handleReturn}
     />
    ) : (
     <GameOver
      currentScore={gameState.currentScore}
      handleStart={handleStart}
      handleReturn={handleReturn}
     />
    )}
   </div>
  </section>
 );
}

export default Modal;
