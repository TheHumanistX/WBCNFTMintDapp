import React from "react";
import { ThirdwebProvider } from "@thirdweb-dev/react";
import { Menu, NFTData } from "./components";
import { DarkBG, LightBG } from './assets';
import './App.css';

function App() {
  return (
    <ThirdwebProvider>
      <>
        <Menu />
        <NFTData />
      </>
    </ThirdwebProvider>
  );
}

export default App;
