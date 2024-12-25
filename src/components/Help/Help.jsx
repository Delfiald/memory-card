import "./help.css";

function GameHelp({ setHelpOpen }) {
 return (
  <>
   <div className="help-header">
    <h2>Game Help</h2>
   </div>
   <div className="help-content">
    <div className="content-top">
     <p>
      Welcome to the Memory Card Game! Your goal is to click on each Pokemon
      without clicking the same one twice. Challenge your memory and try to
      complete each level!
     </p>
    </div>
    <div className="how-it-works">
     <ul>
      <li>
       <div>1</div>
       <div>
        Click on a card to select a Pokemon. Be careful not to click the same
        Pokemon more than once!
       </div>
      </li>
      <li>
       <div>2</div>
       <div>
        If you click a Pokemon that you’ve already selected, the game will end.
       </div>
      </li>
      <li className="level-information">
       <div>3</div>
       <div>There are different difficulty levels:</div>
       <ul>
        <li>Easy: 5 cards</li>
        <li>Medium: 8 cards</li>
        <li>Hard: 15 cards</li>
       </ul>
      </li>
      <li>
       <div>4</div>
       <div>
        Once you complete a level, you can proceed to the next level with more
        cards and a bigger challenge!
       </div>
      </li>
      <li>
       <div>5</div>
       <div>
        As you click on different Pokemon, they will be added to your{" "}
        <strong>Collection</strong>, which can be accessed from the menu.
       </div>
      </li>
     </ul>
    </div>
   </div>
   <div className="help-footer">
    <button onClick={() => setHelpOpen(false)}>Got It!</button>
   </div>
  </>
 );
}

function CollectionsHelp({ setHelpOpen }) {
 return (
  <>
   <div className="help-header">
    <h2>Collections Help</h2>
   </div>
   <div className="help-content">
    <div className="content-top">
     <div>
      <i className="fas fa-info"></i> What is Collections
     </div>
     <div className="descriptions">{`Collections is a feature where you can view all the Pokémon you've discovered while playing the Pokémon Memory Card game. It acts as a visual record of your progress and achievements in uncovering new Pokémon.`}</div>
    </div>
    <div className="how-it-works">
     <ul>
      <li>
       <div>1</div>
       <div className="title">Discovering Pokémon</div>
       <div className="">
        Whenever you click on a Pokémon card for the first time in the game, it
        will be added to your Collections.
       </div>
      </li>
      <li>
       <div>2</div>
       <div className="title">No Duplicates</div>
       <div className="">{`Pokémon that you've already discovered won't be added again, even if you click on their card multiple times.`}</div>
      </li>
      <li>
       <div>3</div>
       <div className="title">Your Personal Pokédex</div>
       <div className="">
        Think of Collections as your personal Pokédex! It tracks your unique
        finds and grows as you explore and play more.
       </div>
      </li>
     </ul>
    </div>
   </div>
   <div className="help-footer">
    <button onClick={() => setHelpOpen(false)}>Got It!</button>
   </div>
  </>
 );
}

function Help({ gameState, setHelpOpen }) {
 return (
  <div className="help">
   <div className="help-wrapper">
    <div className="help-container">
     {(() => {
      switch (gameState.state) {
       case "collections":
        return <CollectionsHelp setHelpOpen={setHelpOpen} />;
       case "start":
        return <GameHelp setHelpOpen={setHelpOpen} />;
       default:
        return null;
      }
     })()}
    </div>
   </div>
  </div>
 );
}

export default Help;
