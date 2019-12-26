import React from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import { Car } from "../Car";
import { Button, TextField } from "@material-ui/core";

interface IProps {
  updateCar: (car: Car) => void;
}

interface IState {
  car: Car;
  open: boolean;
}

class EditCar extends React.Component<IProps, IState> {

  constructor(props: Readonly<IProps>) {
    super(props);
    this.state = {
      open: false,
      car: {
        brand: "",
        model: "",
        year: "",
        color: "",
        price: "",
        fuel: "",
        _links: {
          self: {
            href: ""
          }
        }
      }
    };
  }

  handleClickOpen = (car: Car) => {
    this.setState({
      car: {
        brand: car.brand,
        model: car.model,
        color: car.color,
        year: car.year,
        fuel: car.fuel,
        price: car.price,
        _links: car._links
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
    this.props.updateCar(this.state.car);
    this.handleClose();
  };

  render() {
    return (
      <div>
        <Dialog open={this.state.open} onClose={this.handleClose}>
          <DialogTitle>Edit car</DialogTitle>
          <DialogContent>
            <TextField fullWidth autoFocus label="Brand" name="brand" value={this.state.car.brand}
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

export default EditCar;
