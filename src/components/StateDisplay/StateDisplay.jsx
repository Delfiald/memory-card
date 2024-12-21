import "./stateDisplay.css";

function Loading() {
 return (
  <div className="loading">
   <h2>Loading</h2>
  </div>
 );
}

function Error({ error }) {
 return (
  <div className="error">
   <h2>{error}</h2>
  </div>
 );
}

function StateDisplay({ loading, error }) {
 return (
  <div className="status-wrapper">
   {loading && <Loading />}
   {error && <Error error={error} />}
  </div>
 );
}

export default StateDisplay;
