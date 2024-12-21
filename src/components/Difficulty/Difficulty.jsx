import "./difficulty.css";

function Difficulty({ handleStart, handleReturn }) {
 return (
  <section className="difficulty">
   <h2>Select Difficulty</h2>
   <div className="difficulty-wrapper">
    <button className="easy" onClick={() => handleStart(5)}>
     Easy
    </button>
    <button className="medium" onClick={() => handleStart(8)}>
     Medium
    </button>
    <button className="hard" onClick={() => handleStart(15)}>
     Hard
    </button>
   </div>
   <div className="cancel-button-wrapper">
    <button className="cancel" onClick={handleReturn}>
     <i className="fas fa-arrow-turn-down"></i>
    </button>
   </div>
  </section>
 );
}

export default Difficulty;
