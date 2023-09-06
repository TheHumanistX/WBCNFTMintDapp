import React, { useState } from "react";
import { ThirdwebProvider } from "@thirdweb-dev/react";
import { EthersProvider } from './context';
import { Main, Intro } from "./components";
import { switchToGoerli } from './utils';
import './App.css';

const activeChain = "goerli"

function App() {

  const [appCanLoad, setAppCanLoad] = useState(true)

  return (
    <ThirdwebProvider activeChain={activeChain} clientId='254e923d35d33a1d5f3891f97b0afb8ec1b96c268373f52c861cc97147a0204cf4a20e366893ceedf87c29795b921549418feed9b1348c22495c6e5da34277ea'>
      <EthersProvider setAppCanLoad={setAppCanLoad}>
        <main className='app__container'>
          {appCanLoad ? (
            <>
              <Intro />
              <Main />
            </>
          )
            : (
              <>
                <div className='app-not-loaded'>
                  <span>
                    WRONG CHAIN
                  </span>
                  <button className='chain-switch__button' onClick={switchToGoerli}>Switch to Goerli</button>
                </div>
              </>
            )}

        </main>
      </EthersProvider>
    </ThirdwebProvider>
  );
}

export default App;
