import React from "react";
import { Router, Link } from "react-static";
import { hot } from "react-hot-loader";
import Routes from "react-static-routes";

import "./app.css";

const App = () => (
  <Router>
    <div>
      <nav>
        <Link exact to="/">Home</Link>
        <Link to="/news">News</Link>
        <a className="login" href="https://developer.myriota.com/" target="_blank"><button className="button"><span>Login</span></button></a>
      </nav>
      <div className="content">
        <Routes />
      </div>
    </div>
  </Router>
);

export default hot(module)(App);
