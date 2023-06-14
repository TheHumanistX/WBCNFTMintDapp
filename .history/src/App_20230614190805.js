import React from "react";
import { ThirdwebProvider } from "@thirdweb-dev/react";
import { Main, Intro } from "./components";
import './App.css';

const activeChain = "goerli"

function App() {
  return (
    <ThirdwebProvider activeChain={activeChain}>
      <main className='app__container'>
        <Intro />
        <Main />
      </main>
    </ThirdwebProvider>
  );
}

export default App;
