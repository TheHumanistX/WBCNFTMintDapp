import React from "react";
import { ThirdwebProvider } from "@thirdweb-dev/react";
import { Main, NFTData } from "./components";
import { DarkBG, LightBG } from './assets';
import './App.css';

const activeChain = "goerli"

function App() {
  return (
    <ThirdwebProvider activeChain={activeChain}>
      <main className='app__container'>
        <NFTData />
        <Main />
      </main>
    </ThirdwebProvider>
  );
}

export default App;
