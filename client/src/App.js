import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import Button from '@material-ui/core/Button';
// import ResponsiveDrawer from "./components/drawer.js";
import TemporaryDrawer from "./components/TempDrawer";
import Simple from "./pages/Simple.jsx";


class App extends Component {
  render() {
    return (

      
      
      <div className="App">


        <Simple>


        </Simple>

      
        {/* <TemporaryDrawer>
          <div className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h2>Welcome to React</h2>
          </div>
          <p className="App-intro">
            To get started, edit <code>src/App.js</code> and save to reload.
          </p>
        </TemporaryDrawer> */}

        


      </div>
    );
  }
}

export default App;
