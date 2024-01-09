import React, { useState, ChangeEvent } from "react";
import TutorialDataService from "../services/PersonService";
import ITutorialData from '../types/Person';
import IPerson from "../types/Person";
import PersonService from "../services/PersonService";

const AddPerson: React.FC = () => {
  const initialPersonState = {
    id: null,
    firstName: "",
    lastName: "",
    address: "",
    phone: "",
  };
  const [person, setPerson] = useState<IPerson>(initialPersonState);
  const [submitted, setSubmitted] = useState<boolean>(false);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setPerson({ ...person, [name]: value });
  };

  const savePerson = () => {
    var data = {
      lastName: person.lastName,
      firstName: person.firstName,
      address: person.address,
      phone: person.phone
    };

    PersonService.create(data)
      .then((response: any) => {
        setPerson({
          id: response.data.id,
          firstName: response.data.firstName,
          lastName: response.data.lastName,
          address: response.data.address,
          phone: response.data.phone
        });
        setSubmitted(true);
        console.log(response.data);
      })
      .catch((e: Error) => {
        console.log(e);
      });
  };

  const newPerson = () => {
    setPerson(initialPersonState);
    setSubmitted(false);
  };

  return (
    <div className="submit-form">
      {submitted ? (
        <div>
          <h4>You submitted successfully!</h4>
          <button className="btn btn-success" onClick={newPerson}>
            Add Person
          </button>
        </div>
      ) : (
        <div>
          <div className="form-group">
            <label htmlFor="firstName">First Name</label>
            <input
              type="text"
              className="form-control"
              id="firstName"
              required
              value={person.firstName}
              onChange={handleInputChange}
              name="firstName"
            />
          </div>

          <div className="form-group">
            <label htmlFor="lastName">Last Name</label>
            <input
              type="text"
              className="form-control"
              id="lastName"
              required
              value={person.lastName}
              onChange={handleInputChange}
              name="lastName"
            />
          </div>

          <div className="form-group">
            <label htmlFor="address">Address</label>
            <input
              type="text"
              className="form-control"
              id="address"
              required
              value={person.address}
              onChange={handleInputChange}
              name="address"
            />
          </div>

          <div className="form-group">
            <label htmlFor="phone">Phone</label>
            <input
              type="text"
              className="form-control"
              id="phone"
              required
              value={person.phone}
              onChange={handleInputChange}
              name="phone"
            />
          </div>

          <button onClick={savePerson} className="btn btn-success">
            Submit
          </button>
        </div>
      )}
    </div>
  );
};

export default AddPerson;
