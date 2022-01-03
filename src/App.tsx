import React from "react";
import "./App.css";
import AnimationWrapper from "./components/AnimationWrapper";
import Chessboard from "./components/board/Chessboard";
import "@fortawesome/fontawesome-svg-core/styles.css";
import Logo from "./components/Logo";

function App() {
  return (
    <div>
      <div className="App bg-background lg:overflow-hidden md:overflow-visible">
        <div className="container justify-center items-center h-screen md:m-auto md:flex md:flex-row md:flex-wrap md:flex-grow bg-background">
          <div className="flex flex-row flex-wrap">
            <div className="flex text-center md:hidden text-center">
              <Logo isMobile={true} />
            </div>
            <Chessboard />
            <AnimationWrapper />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
