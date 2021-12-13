import React from "react";
import "./App.css";
import Sidebars from "./components/Sidebars";
import Chessboard from "./components/Chessboard";

function App() {
  return (
    <div>
      <div className="App bg-background lg:overflow-hidden md:overflow-visible">
        <div className="container justify-center items-center h-screen md:m-auto md:flex md:flex-row md:flex-wrap md:flex-grow bg-background">
          <div className="flex flex-col no-wrap">
            <span className="font-header text-5xl font-bold">PoliChess</span>
            <div className="flex flex-row flex-wrap">
              <Chessboard />
              <Sidebars />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
