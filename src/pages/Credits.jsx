import "../styles/credits.css";

function Credits({ handleReturn }) {
 return (
  <section id="credits">
   <div className="credits-wrapper">
    <div className="credits-header">
     <h2>Credits</h2>
    </div>
    <div className="credits-body">
     <div className="api">
      <div>API from</div>
      <a href="https://pokeapi.co/" target="_blank" rel="noopener noreferrer">
       PokeAPI
      </a>
     </div>
     <div className="other-assets">
      <div>Assets from</div>
      <div className="assets">
       <a
        href="https://github.com/duiker101/pokemon-type-svg-icons"
        target="_blank"
        rel="noopener noreferrer"
       >
        duiker101
       </a>
      </div>
      <div className="assets">
       <a href="https://icons8.com" target="_blank" rel="noopener noreferrer">
        icons8.com
       </a>
      </div>
      <div className="assets">
       <a
        href="https://www.spriters-resource.com/submitter/Sunday_Domeko/"
        target="_blank"
        rel="noopener noreferrer"
       >
        Sunday_Domeko
       </a>
      </div>
     </div>
    </div>
    <button className="return-button" onClick={handleReturn}>
     <i className="fas fa-arrow-turn-down"></i>
    </button>
   </div>
  </section>
 );
}

export default Credits;
