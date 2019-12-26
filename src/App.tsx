import React from 'react';
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import './App.css';
import Login from "./components/Login";

const App: React.FC = () => {

  return (
    <div className="App">
      <AppBar position="static" color="default">
        <Toolbar>
          <Typography variant="h6" color="inherit">
            Car List
          </Typography>
        </Toolbar>
      </AppBar>
      <Login/>
    </div>
  );
};

export default App;
