import React from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import { Car } from "../Car";

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

  handleChange = (event:
                    | React.ChangeEvent<HTMLInputElement>
                    | React.ChangeEvent<HTMLTextAreaElement>
                    | React.ChangeEvent<HTMLSelectElement>) => {
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

export default AddCar;
