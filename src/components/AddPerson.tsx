import React, { useState, ChangeEvent, useEffect } from "react";
import TutorialDataService from "../services/PersonService";
import ITutorialData from '../types/Person';
import IPerson from "../types/Person";
import PersonService from "../services/PersonService";
import { useNavigate, useParams } from "react-router-dom";

const AddPerson: React.FC = () => {

  const { id }= useParams();
  let navigate = useNavigate();
  const [operation, setOperation] = useState<string>("ADD");

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

  const addPerson = () => {
    var data = {
      lastName: person.lastName,
      firstName: person.firstName,
      address: person.address,
      phone: person.phone
    };

    PersonService.create(data)
    .then((response: any) => {
      setPerson({
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

  const updatePerson = () => {
    var data = {
      id: person.id,
      lastName: person.lastName,
      firstName: person.firstName,
      address: person.address,
      phone: person.phone
    };

    if(id){
      PersonService.update(id, data)
      .then((response: any) => {
        setPerson({
          id: response.data.id,
          firstName: response.data.firstName,
          lastName: response.data.lastName,
          address: response.data.address,
          phone: response.data.phone
        });
        setSubmitted(true);
        setOperation("");
        console.log(response.data);
      })
      .catch((e: Error) => {
        console.log(e);
      });
    }
  };

  const deletePerson = () => {
    
    if(id){
      PersonService.remove(id)
      .then((response: any) => {
        console.log(response.data);
        navigate("/person");

      })
      .catch((e: Error) => {
        console.log(e);
      });
    }
  };


  useEffect(() => {
    if (id)
      getPerson();
    else
      setOperation("ADD");
  }, []);

  const getPerson = () => {
    PersonService.get(id)
      .then((response: any) => {
        setPerson(response.data);
        setOperation("");
        console.log(response.data);
      })
      .catch((e: Error) => {
        console.log(e);
      });
  };

  const newPerson = () => {
    setPerson(initialPersonState);
    setOperation("ADD");
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
          {
            operation && operation == 'ADD'
            ? (
              <button onClick={addPerson} className="btn btn-success">
              ADD Person
            </button>
            )  
            : (
              <div>
                <button onClick={updatePerson} className="btn btn-success">
                  Update Person
                </button>

                <button onClick={deletePerson} className="btn btn-success">
                Delete Person
                </button>
             </div>   
            )  
          }
        </div>
      )}
    </div>
  );
};

export default AddPerson;
