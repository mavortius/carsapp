import React, { RefObject } from "react";
import MaterialTable from "material-table";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { SERVER_URL } from "../constants";
import AddCar from "./AddCar";
import EditCar from "./EditCar";
import { Car } from "../Car";

type IState = {
  cars: Car[],
  selectedCar: Car,
  editing: false
}

class CarList extends React.Component<{}, IState> {

  addCarElement: RefObject<AddCar>;
  editCarElement: RefObject<EditCar>;

  constructor(props: Readonly<{}>) {
    super(props);
    this.addCarElement = React.createRef();
    this.editCarElement = React.createRef();

    this.state = {
      cars: [],
      selectedCar: {
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
      },
      editing: false
    };
  }

  componentDidMount() {
    this.fetchCars();
  }

  fetchCars = () => {
    const jwt = sessionStorage.getItem("jwt");

    fetch<>(SERVER_URL + "api/cars",
      {
        headers: { "Authorization": jwt }
      })
      .then((response: Response) => response.json())
      .then((data: any) => {
        this.setState({ cars: data._embedded.cars });
      })
      .catch(err => {
        toast.error("Error fetching Car list", {
          position: toast.POSITION.BOTTOM_LEFT
        });
        console.error(err);
      });
  };

  onDeleteClick = (link: string) => {
    if (window.confirm("Are you sure to delete?")) {
      const jwt = sessionStorage.getItem("jwt");

      fetch<>(link,
        {
          method: "DELETE",
          headers: { "Authorization": jwt }
        })
        .then(() => {
          toast.success("Car deleted", {
            position: toast.POSITION.BOTTOM_LEFT
          });
          this.fetchCars();
        })
        .catch(err => {
          toast.error("Error when deleting", {
            position: toast.POSITION.BOTTOM_LEFT
          });
          console.error(err);
        });
    }
  };

  onEditClick = (car: Car) => {
    if (this.editCarElement.current) {
      this.editCarElement.current.handleClickOpen(car);
    }
  };

  onAddClick = () => {
    if (this.addCarElement.current) {
      this.addCarElement.current.handleClickOpen();
    }
  };

  addCar = (car: Car) => {
    const jwt = sessionStorage.getItem("jwt");

    fetch<>(SERVER_URL + "api/cars", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": jwt
      },
      body: JSON.stringify(car)
    })
      .then(() => {
        toast.success("New car saved successfully", {
          position: toast.POSITION.BOTTOM_LEFT
        });
        this.fetchCars();
      })
      .catch(() => toast.error("Error when saving", {
        position: toast.POSITION.BOTTOM_LEFT
      }));
  };

  updateCar = (car: Car) => {
    const jwt = sessionStorage.getItem("jwt");

    fetch(car._links.self.href, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": jwt
      },
      body: JSON.stringify(car)
    })
      .then(() => {
        toast.success("Changes saved", {
          position: toast.POSITION.BOTTOM_LEFT
        });
        this.fetchCars();
      })
      .catch(() => toast.error("Error when saving", {
        position: toast.POSITION.BOTTOM_LEFT
      }));
  };

  render() {
    const columns = [
      {
        title: 'Brand',
        field: 'brand'
      }, {
        title: 'Model',
        field: 'model',
      }, {
        title: 'Color',
        field: 'color',
      }, {
        title: 'Year',
        field: 'year',
      }, {
        title: 'Price €',
        field: 'price',
      }
    ];
    const actions = [
      {
        icon: "add",
        tooltip: "Add New Car",
        isFreeAction: true,
        onClick: (event: any) => this.onAddClick()
      },
      {
        icon: "edit",
        tooltip: "Edit Car",
        onClick: (event: any, rowData: any) => this.onEditClick(rowData)
      },
      {
        icon: "delete",
        tooltip: "Delete Car",
        onClick: (event: any, rowData: any) => this.onDeleteClick(rowData._links.self.href)
      }
    ];

    return (
      <div>
        <AddCar ref={this.addCarElement} addCar={this.addCar}/>
        <EditCar ref={this.editCarElement} updateCar={this.updateCar}/>
        <MaterialTable columns={columns} data={this.state.cars} title="Cars" actions={actions}
                       options={{ exportButton: true, exportDelimiter: ";" }}/>
        <ToastContainer autoClose={1500}/>
      </div>
    )
  }
}

export default CarList;
