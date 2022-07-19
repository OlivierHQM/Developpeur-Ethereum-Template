import { EthProvider } from "./contexts/EthContext";
import Intro from "./components/Intro/";
import CoreInterface from "./components/CoreInterface";
import "./App.css";

function App() {   
  return (
    <EthProvider> {/* Assure la connexion avec la blockchain*/}
      <div id="App" > 
        <div className="container">
          <Intro /> {/* Récupère le component "Intro" */}
          <CoreInterface></CoreInterface> {/* Récupère le component "CoreInterface" */}
        </div>
      </div>
    </EthProvider>
  );
}

export default App; {/* Affiche l'application sur un navigateur si le code est déployé */}



