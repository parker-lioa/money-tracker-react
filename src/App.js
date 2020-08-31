import React, { useState, useEffect } from "react";
import Main from "./components/Main";
import Login from "./components/Login";
import {BrowserRouter as Router, Switch , Route , Link, BrowserRouter } from 'react-router-dom';

const App = () =>{
  
    return(
       <Router>
         <Route exact path="/" component={Login} />
         <Route path="/app" component={Main} />
       </Router>
    );
}




export default App;
