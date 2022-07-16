import { EthProvider } from "./contexts/EthContext";
import Intro from "./components/Intro/";
import AdministratorInterface from "./components/AdministratorInterface";
import VoterInterface from "./components/VoterInterface";
import Footer from "./components/Footer";
import "./App.css";
import PublicView from "./components/PublicView";

function App() {
  return (
    <EthProvider>
      <div id="App" >
        <div className="container">
          <Intro />
          <hr />
          <PublicView />
          <hr />
          <VoterInterface />
          <hr />
          <AdministratorInterface />
          <hr />
          <Footer />
        </div>
      </div>
    </EthProvider>
  );
}

export default App;
