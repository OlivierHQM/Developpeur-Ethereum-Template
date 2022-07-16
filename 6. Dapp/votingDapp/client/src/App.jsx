import { EthProvider } from "./contexts/EthContext";
import Intro from "./components/Intro/";
import CoreInterface from "./components/CoreInterface";
import "./App.css";

function App() {   
  return (
    <EthProvider>
      <div id="App" >
        <div className="container">
          <Intro />
          <hr />
          <CoreInterface></CoreInterface>
          <hr />
        </div>
      </div>
    </EthProvider>
  );
}

export default App;



