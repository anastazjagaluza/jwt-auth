import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from "react-router-dom";
import Auth from "./pages/Auth";
import PrivatePath from "./components/PrivatePath";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <div className="App">
    <Router>
    <nav id="nav">
      <ul><Link to="/">Home</Link></ul>
      <ul><Link to="/auth">Login or Signup</Link></ul>
      <ul><Link to="/dashboard">Dashboard</Link></ul>
    </nav>
    <Switch>
     <Route exact path="/">
       <h1>Welcome to my special page!</h1>
     </Route> 
     <Route path="/auth">
        <Auth />
     </Route> 
     <Route>
        <PrivatePath path="/dashboard" component={Dashboard} /> 
      </Route> 
    </Switch> 
      </Router>
    </div>
  );
}

export default App;
