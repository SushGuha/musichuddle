import "./App.css";
import Login from "./components/Login";
import {Route,Routes,BrowserRouter as Router} from "react-router-dom"
import { AuthContextProvider } from "./context/AuthContext";
import Header from "./components/Navbar"
import Landing from "./components/Landing";
import Protected from './components/Protected';

function App() {
  return (
   
    <div className="App">
      <AuthContextProvider>
        
      <Router>
      <Header/>
        <Routes>
          <Route path = '/' element = {<Login/>}/>
          <Route path = '/landing' element = {<Protected><Landing/></Protected>}/>
        </Routes>
        </Router>

      </AuthContextProvider>
      
    </div>
    
  );
}

export default App;
