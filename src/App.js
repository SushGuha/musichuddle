import "./App.css";
import Login from "./components/Login";
import {Route,Routes,BrowserRouter as Router} from "react-router-dom"
import { AuthContextProvider } from "./context/AuthContext";
import Header from "./components/Navbar"
import Landing from "./components/Landing";
import { useParams } from "react-router-dom";
import Protected from './components/Protected';
import Addparty from "./components/Addparty";
function App() {
  return (
   
    <div className="App">
      <AuthContextProvider>
        
      <Router>
      <Header/>
        <Routes>
          <Route path = '/' element = {<Login/>}/>
          <Route path = '/landing' element = {<Protected><Landing/></Protected>}/>
          <Route path = '/party/:code' element = {<Protected><RenderAddparty/> </Protected>}/>
        </Routes>
        </Router>

      </AuthContextProvider>
      
    </div>
    
  );
}

function RenderAddparty() {
  let params = useParams();


  return (
    <Addparty
      partyCode={params.code}

    />
  );
  }
export default App;
