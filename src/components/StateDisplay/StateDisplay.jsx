import "./stateDisplay.css";

function Loading() {
 return (
  <div className="loading">
   <div className="loading-sprite">
    <img src="./pokeball/1.png" alt="" />
   </div>
   <div className="loading-wrapper">
    <div className="circle"></div>
    <div className="circle"></div>
    <div className="circle"></div>
    <div className="circle"></div>
    <div className="circle"></div>
    <div className="circle"></div>
    <div className="circle"></div>
    <div className="circle"></div>
   </div>
  </div>
 );
}

function Error({ error, handleReturn }) {
 return (
  <div className="error">
   <div className="error-image">
    <img src="./error.png" alt="" />
   </div>
   <h2>{error}</h2>
   <button onClick={handleReturn}>Back to Menu</button>
  </div>
 );
}

function StateDisplay({ loading, error, handleReturn }) {
 return (
  <div className="status-wrapper">
   {loading && <Loading />}
   {error && <Error error={error} handleReturn={handleReturn} />}
  </div>
 );
}

export default StateDisplay;
