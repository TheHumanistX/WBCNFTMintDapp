import React from "react";
import { ThirdwebProvider } from "@thirdweb-dev/react";
import { Main, Intro } from "./components";
import { DarkBG, LightBG } from './assets';
import './App.css';

const activeChain = "goerli"

function App() {
  return (
    <ThirdwebProvider>
      <main className='app__container'>
        <Intro />
        <Main />
      </main>
    </ThirdwebProvider>
  );
}

export default App;
