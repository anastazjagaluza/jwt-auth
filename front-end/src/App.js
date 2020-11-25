import React, { useState, useEffect } from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
  useHistory,
} from "react-router-dom";
import Auth from "./pages/Auth";
import Authorized from "./components/Authorized";
import Dashboard from "./pages/Dashboard";
import LogOut from "./pages/LogOut";
function App() {
  const [hasAccess, updateHasAccess] = useState(false);

  useEffect(()=> {
    const authorize = async () => {
    const response = await Authorized();
    updateHasAccess(response);
    }
    authorize(); 
   })

   function noAccess(e) {
   }
   
   return (
    <div className="App">
    <Router>
    <nav id="nav">
      <ul><Link to="/">Home</Link></ul>
      {hasAccess ? null : <ul><Link to="/auth">Login or Signup</Link></ul>}
      <ul><Link to="/dashboard">Dashboard</Link></ul>
      {hasAccess 
        ? <ul><Link to="/logout">Logout</Link></ul>
        : null}
    </nav>
    <Switch>
     <Route exact path="/">
       <h1>Welcome to my special page!</h1>
     </Route> 
     <Route path="/auth">
        <Auth onAuth={() => updateHasAccess(true)} />
     </Route> 
     <Route path="/dashboard">
       {hasAccess 
       ? <Dashboard />
       : <Redirect to="/auth" /> }
      </Route> 
      <Route path="/logout">
        <LogOut onLogOut={() => updateHasAccess(false)} />
      </Route>
    </Switch> 
      </Router>
    </div>
  );
}

export default App;
