import "./reset.css";

function Reset({ handleReset, setResetOpen }) {
 return (
  <div className="reset">
   <div className="reset-wrapper">
    <div className="reset-container">
     <div className="reset-text">
      <div>This will reset all of your progress.</div>
      <div>All saved Pokémon and your best score will be lost.</div>
      <div>Are you sure?</div>
     </div>
     <div className="reset-action">
      <button className="understood-button" onClick={handleReset}>
       Understood
      </button>
      <button onClick={() => setResetOpen(false)} className="close-button">
       Cancel
      </button>
     </div>
    </div>
   </div>
  </div>
 );
}

export default Reset;
