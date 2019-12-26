import React from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import { Car } from "../Car";
import { Button, TextField } from "@material-ui/core";

interface IProps {
  addCar: (car: Car) => void;
}

interface IState {
  car: Car;
  open: boolean;
}

class AddCar extends React.Component<IProps, IState> {

  constructor(props: Readonly<IProps>) {
    super(props);
    this.state = {
      open: false,
      car: {
        brand: "",
        model: "",
        color: "",
        year: "",
        fuel: "",
        price: "",
        _links: {
          self: {
            href: ""
          }
        }
      }
    }
  }

  handleClickOpen = () => {
    this.setState({
      car: {
        brand: "",
        model: "",
        color: "",
        year: "",
        fuel: "",
        price: "",
        _links: {
          self: {
            href: ""
          }
        }
      },
      open: true
    });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleChange = (event: any) => {
    this.setState({ car: { ...this.state.car, [event.target.name]: event.target.value } });
  };

  handleSave = () => {
    this.props.addCar(this.state.car);
    this.handleClose();
  };

  render() {
    return (
      <div>
        <Dialog open={this.state.open} onClose={this.handleClose}>
          <DialogTitle>New car</DialogTitle>
          <DialogContent>
            <TextField autoFocus fullWidth label="Brand" name="brand" value={this.state.car.brand}
                   onChange={this.handleChange}/>
            <TextField fullWidth label="Model" name="model" value={this.state.car.model}
                   onChange={this.handleChange}/>
            <TextField fullWidth label="Color" name="color" value={this.state.car.color}
                   onChange={this.handleChange}/>
            <TextField fullWidth label="Year" name="year" value={this.state.car.year}
                   onChange={this.handleChange}/>
            <TextField fullWidth label="Price" name="price" value={this.state.car.price}
                   onChange={this.handleChange}/>
          </DialogContent>
          <DialogActions>
            <Button color="secondary" onClick={this.handleClose}>Cancel</Button>
            <Button color="primary" onClick={this.handleSave}>Save</Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default AddCar;
