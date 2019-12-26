import React, { Component } from "react";
import { Button, TextField } from "@material-ui/core";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { SERVER_URL } from "../constants";
import CarList from "./CarList";

interface IUser {
  username: string;
  password: string;
}

interface IState {
  user: IUser;
  isAuthenticated: boolean;
}

class Login extends Component<{}, IState> {

  constructor(props: Readonly<{}>) {
    super(props);
    this.state = {
      user: { username: "", password: "" },
      isAuthenticated: false
    };
  }

  handleChange = (event: any) => {
    this.setState({ user: { ...this.state.user, [event.target.name]: event.target.value } });
  };

  login = () => {
    fetch(SERVER_URL + "login", {
      method: "POST",
      body: JSON.stringify(this.state.user)
    })
      .then(response => {
        const jwt = response.headers.get("Authorization");
        if (jwt !== null) {
          sessionStorage.setItem("jwt", jwt);
          this.setState({ isAuthenticated: true });
        } else {
          toast.warn("Login fails. Check your username and password",
            { position: toast.POSITION.BOTTOM_LEFT });
        }
      })
      .catch(err => {
        toast.error("Error while processing login");
        console.error(err);
      });
  };

  logout = () => {
    sessionStorage.removeItem("jwt");
    this.setState({ isAuthenticated: false });
  };

  render() {
    if (this.state.isAuthenticated) {
      return <CarList/>;
    } else {
      return (
        <div>
          <TextField name="username" label="Username" onChange={this.handleChange}/><br/>
          <TextField type="password" name="password" label="Password" onChange={this.handleChange}/><br/><br/>
          <Button variant="outlined" color="primary" onClick={this.login}>Login</Button>
          <ToastContainer autoClose={1500}/>
        </div>
      );
    }
  }
}

export default Login;
