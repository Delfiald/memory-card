import Header from "../components/Header/Header";
import Main from "../components/Main/Main";
import Footer from "../components/Footer/Footer";
import { useState } from "react";

function Game() {
 const [score, setScore] = useState(0);

 return (
  <>
   <Header score={score} />
   <Main />
   <Footer />
  </>
 );
}

export default Game;
