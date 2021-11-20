import React, { useState, useEffect, Fragment } from "react";
import { nanoid } from "nanoid";
import "./Customer.css";
//import data from "./mock-data";
import ReadOnlyRowCustomer from "../components/ReadOnlyRowCustomer";
import EditableRowCustomer from "../components/EditableRowCustomer";

//https://api.npoint.io/db8936f9a89036178988

function Customer() {

  const [contacts, setContacts] = useState([]);
     

  useEffect(() => { 
    const api_url = 
    "https://api.npoint.io/03f147d9f120cfebf707";

    const fetchData = async () => {
        try {
            const response = await fetch(api_url);
            const json = await response.json();
            console.log(json);
            setContacts(json);
        } catch (error) {
            console.log("error", error);
        }
      }

      fetchData();
  }, []);

  const [addFormData, setAddFormData] = useState({
    name: "",
    address: "",
    phoneNumber: "",
    email: "",
  });

  const [editFormData, setEditFormData] = useState({
    name: "",
    address: "",
    phoneNumber: "",
    email: "",
  })

  const [editContactId, setEditContactId] = useState(null);

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

    const newContact = {
      id: nanoid(),
      name: addFormData.name,
      address: addFormData.address,
      phoneNumber: addFormData.phoneNumber,
      email: addFormData.email,
    };

    const newContacts = [...contacts, newContact];
    setContacts(newContacts);
  };

  const handleEditFormSubmit = (event) => {
    event.preventDefault();

    const editedContact = {
      id: editContactId,
      name: editFormData.name,
      address: editFormData.address,
      phoneNumber: editFormData.phoneNumber,
      email: editFormData.email
    };

    const newContacts = [...contacts];

    const index = contacts.findIndex((contact) => contact.id === editContactId);

    newContacts[index] = editedContact;

    setContacts(newContacts);
    setEditContactId(null);
  }

  const handleEditClick = (event, contact) => {
    event.preventDefault();
    setEditContactId(contact.id);

    const formValues = {
      name: contact.name,
      address: contact.address,
      phoneNumber: contact.phoneNumber,
      email:contact.email,
    }

    setEditFormData(formValues);
  };

  const handleCancelClick = () => {
    setEditContactId(null);
  }

  const handleDeleteClick = (contactId) => {
    const newContacts = [...contacts];

    const index = contacts.findIndex((contact) => contact.id === contactId);

    newContacts.splice(index, 1);

    setContacts(newContacts);
  }

  return (
  <div className="customers">
    <form onSubmit={handleEditFormSubmit}>
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Address</th>
          <th>Phone Number</th>
          <th>Email</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {contacts.map((contact) => (
          <Fragment>
            { editContactId === contact.id ?(
              <EditableRowCustomer 
              editFormData={editFormData} 
              handleEditFormChange={handleEditFormChange}
              handleCancelClick={handleCancelClick}
              />
              ) : ( 
              <ReadOnlyRowCustomer 
                contact={contact} 
                handleEditClick={handleEditClick}
                handleDeleteClick={handleDeleteClick}
              />
              )}
          </Fragment>
        ))}
      </tbody>
    </table>
    </form>

    <h2>Add a contact</h2>
    <form onSubmit={handleAddFormSubmit}>
      <input 
      type="text" 
      name="name" 
      required="required"
      placeholder="Enter a name..."
      onChange={handleAddFormChange}
      />
            <input 
      type="text" 
      name="address" 
      required="required"
      placeholder="Enter an address..."
      onChange={handleAddFormChange}
      />
            <input 
      type="text" 
      name="phoneNumber" 
      required="required"
      placeholder="Enter a phone number..."
      onChange={handleAddFormChange}
      />
            <input 
      type="email" 
      name="email" 
      required="required"
      placeholder="Enter an email..."
      onChange={handleAddFormChange}
      />
      <button type="submit">Add</button>
    </form>
  </div>
  );
};

export default Customer;
