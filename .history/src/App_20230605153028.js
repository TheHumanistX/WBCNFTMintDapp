import React from "react";
import { ThirdwebProvider } from "@thirdweb-dev/react";
import { Header, NFTData } from "./components";
import { DarkBG, LightBG } from './assets';
import './App.css';

function App() {
  return (
    <ThirdwebProvider>
      <>
        <Header />
        {/* <NFTData /> */}
      </>
    </ThirdwebProvider>
  );
}

export default App;
