import React from "react";
import { ThirdwebProvider } from "@thirdweb-dev/react";
import { Menu, Main, NFTData } from "./components";
import { DarkBG, LightBG } from './assets';
import './App.css';

function App() {
  return (
    <ThirdwebProvider>
      <>
        <NFTData />
        <Main />
      </>
    </ThirdwebProvider>
  );
}

export default App;
