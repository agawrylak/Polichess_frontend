import React from "react";
import "./App.css";
import { MainScreen } from "./components/GameScreen/MainScreen";
import Sidebars from "./components/GameScreen/Sidebars";

function App() {
  return (
    <div>
      <div className="App bg-background lg:overflow-hidden md:overflow-visible">
        <div className="container justify-center items-center h-screen md:m-auto md:flex md:flex-row md:flex-wrap md:flex-grow bg-background">
          <div className="flex flex-row flex-wrap">
            <MainScreen />
            <Sidebars />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
