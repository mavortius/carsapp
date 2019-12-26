import React from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import { Car } from "../Car";

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

  handleChange = (event:
                    | React.ChangeEvent<HTMLInputElement>
                    | React.ChangeEvent<HTMLTextAreaElement>
                    | React.ChangeEvent<HTMLSelectElement>) => {
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
            <input type="text" placeholder="Brand" name="brand" value={this.state.car.brand}
                   onChange={this.handleChange}/><br/>
            <input type="text" placeholder="Model" name="model" value={this.state.car.model}
                   onChange={this.handleChange}/><br/>
            <input type="text" placeholder="Color" name="color" value={this.state.car.color}
                   onChange={this.handleChange}/><br/>
            <input type="text" placeholder="Year" name="year" value={this.state.car.year}
                   onChange={this.handleChange}/><br/>
            <input type="text" placeholder="Price" name="price" value={this.state.car.price}
                   onChange={this.handleChange}/><br/>
          </DialogContent>
          <DialogActions>
            <button onClick={this.handleClose}>Cancel</button>
            <button onClick={this.handleSave}>Save</button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default EditCar;
