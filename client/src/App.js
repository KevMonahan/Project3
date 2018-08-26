import React, { Component } from "react";
import "./App.css";
// import Button from '@material-ui/core/Button';
// import ResponsiveDrawer from "./components/drawer.js";
// import TemporaryDrawer from "./components/TempDrawer";
import PersistentDrawer from "./components/PersistentDrawer";
import Simple from "./pages/Simple.jsx";
import Reactions from "./components/Reactions.jsx";
// import Login from "./components/Login.js";
import TextFields from "./components/TextFields.js";
import ReactionForm from "./components/ReactionForm.js";


// const styles = {
//    fontFamily: "Cardo",
//    fontSize: "20px",
//     width: "80%",
//      textAlign: "center",
//       marginLeft: "auto",
//        marginRight: "auto",
//        overflow: "scroll",
// };


class App extends Component {
  render() {
    return (
      
      <div className="App">

      {/* <TextFields></TextFields> */}

        {/* <Simple>

        </Simple> */}

        <PersistentDrawer> 
          <Reactions></Reactions> 
        
        </PersistentDrawer>


      </div>
    );
  }
}

export default App;
