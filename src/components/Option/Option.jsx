import "./option.css";

function Option({ setOptionOpen, handleStart, handleReturn }) {
 return (
  <div className="option">
   <div className="option-wrapper">
    <div className="option-container">
     <h2>Options</h2>
     <button
      className="retry"
      onClick={() => {
       handleStart();
       setOptionOpen(false);
      }}
     >
      Retry
     </button>
     <button
      className="return"
      onClick={() => {
       handleReturn();
       setOptionOpen(false);
      }}
     >
      Return to Menu
     </button>
     <div className="close-option-wrapper">
      <button className="close-option" onClick={() => setOptionOpen(false)}>
       <i className="fas fa-arrow-turn-down"></i>
      </button>
     </div>
    </div>
   </div>
  </div>
 );
}

export default Option;
