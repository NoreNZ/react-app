import React, { useState, useEffect, Fragment } from "react";
import { nanoid } from "nanoid";
import "./Customer.css";
//import data from "./mock-data";
import ReadOnlyRowOrders from "../components/ReadOnlyRowOrders";
import EditableRowOrders from "../components/EditableRowOrders";

// customers https://api.npoint.io/db8936f9a89036178988
// orders https://api.npoint.io/cffc6503bfc34e741c1a

function Orders() {

  const [orders, setOrders] = useState([]);
     

  useEffect(() => { 
    const api_url = 
    "https://api.npoint.io/cffc6503bfc34e741c1a";

    const fetchData = async () => {
        try {
            const response = await fetch(api_url);
            const json = await response.json();
            console.log(json);
            setOrders(json);
        } catch (error) {
            console.log("error", error);
        }
      }

      fetchData();
  }, []);

  const [addFormData, setAddFormData] = useState({
    name: "",
    price: "",
    inventory: "",
  });

  const [editFormData, setEditFormData] = useState({
    name: "",
    price: "",
    inventory: "",
  })

  const [editOrderId, setEditOrderId] = useState(null);

  const handleAddFormChange = (event) => {
    event.preventDefault();

    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;

    const newFormData = { ...addFormData };
    newFormData[fieldName] = fieldValue;

    setAddFormData(newFormData);
  };

  const handleEditFormChange = (event) => {
    event.preventDefault();

    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;

    const newFormData = { ...editFormData };
    newFormData[fieldName] = fieldValue;

    setEditFormData(newFormData);
  }

  const handleAddFormSubmit = (event) => {
    event.preventDefault();

    const newOrder = {
      id: nanoid(),
      name: addFormData.name,
      price: addFormData.price,
      inventory: addFormData.inventory,
    };

    const newOrders = [...orders, newOrder];
    setOrders(newOrders);
  };

  const handleEditFormSubmit = (event) => {
    event.preventDefault();

    const editedOrder = {
      id: editOrderId,
      name: addFormData.name,
      price: addFormData.price,
      inventory: addFormData.inventory,
    };

    const newOrders = [...orders];

    const index = orders.findIndex((order) => order.id === editOrderId);

    newOrders[index] = editedOrder;

    setOrders(newOrders);
    setEditOrderId(null);
  }

  const handleEditClick = (event, order) => {
    event.preventDefault();
    setEditOrderId(order.id);

    const formValues = {
      name: addFormData.name,
      price: addFormData.price,
      inventory: addFormData.inventory,
    }

    setEditFormData(formValues);
  };

  const handleCancelClick = () => {
    setEditOrderId(null);
  }

  const handleDeleteClick = (orderId) => {
    const newOrders = [...orders];

    const index = orders.findIndex((order) => order.id === orderId);

    newOrders.splice(index, 1);

    setOrders(newOrders);
  }

  return (
  <div className="orders">
    <form onSubmit={handleEditFormSubmit}>
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Price</th>
          <th>Inventory</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {orders.map((order) => (
          <Fragment>
            { editOrderId === order.id ?(
              <EditableRowOrders 
              editFormData={editFormData} 
              handleEditFormChange={handleEditFormChange}
              handleCancelClick={handleCancelClick}
              />
              ) : ( 
              <ReadOnlyRowOrders 
              order={order} 
                handleEditClick={handleEditClick}
                handleDeleteClick={handleDeleteClick}
              />
              )}
          </Fragment>
        ))}
      </tbody>
    </table>
    </form>

    <h2>Add an order</h2>
    <form onSubmit={handleAddFormSubmit}>
      <input 
      type="text" 
      name="name" 
      required="required"
      placeholder="Enter a product name..."
      onChange={handleAddFormChange}
      />
            <input 
      type="text" 
      name="price" 
      required="required"
      placeholder="Enter a price..."
      onChange={handleAddFormChange}
      />
            <input 
      type="text" 
      name="inventory" 
      required="required"
      placeholder="Enter stock..."
      onChange={handleAddFormChange}
      />
      <button type="submit">Add</button>
    </form>
  </div>
  );
};

export default Orders;