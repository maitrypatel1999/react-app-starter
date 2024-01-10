import React, { useState, useEffect, ChangeEvent } from "react";
import IPerson from "../types/Person";
import { Link } from "react-router-dom";
import PersonService from "../services/PersonService";

const PersonList: React.FC = () => {
  const [person, setPerson] = useState<Array<IPerson>>([]);
  const [currentPerson, setCurrentPerson] = useState<IPerson | null>(null);
  const [currentIndexPerson, setCurrentIndexPerson] = useState<number>(-1);
  const [searchLastName, setLastName] = useState<string>("");

  useEffect(() => {
    getPerson();
  }, []);

  const onChangeSearchLastName = (e: ChangeEvent<HTMLInputElement>) => {
    const searchLastName = e.target.value;
    setLastName(searchLastName);
  };

  const getPerson = () => {
    PersonService.getAll()
      .then((response: any) => {
        setPerson(response.data);
        console.log(response.data);
      })
      .catch((e: Error) => {
        console.log(e);
      });
  };

  const refreshList = () => {
    setCurrentPerson(null);
    setCurrentIndexPerson(-1);
    getPerson();
  };

  const setActivePerson = (person: IPerson, index: number) => {
    setCurrentPerson(person);
    setCurrentIndexPerson(index);
  };

  const removePerson = () => {
    PersonService.removeAll()
      .then((response: any) => {
        console.log(response.data);
        refreshList();
      })
      .catch((e: Error) => {
        console.log(e);
      });
  };

  const findByLastName = () => {
    PersonService.findByLastName(searchLastName)
      .then((response: any) => {
        setPerson(response.data);
        setCurrentPerson(null);
        setCurrentIndexPerson(-1);
        console.log(response.data);
      })
      .catch((e: Error) => {
        console.log(e);
      });
  };

  return (
    <div className="list row">
      <div className="col-md-8">
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Search by title"
            value={searchLastName}
            onChange={onChangeSearchLastName}
          />
          <div className="input-group-append">
            <button
              className="btn btn-outline-secondary"
              type="button"
              onClick={findByLastName}
            >
              Search
            </button>
          </div>
        </div>
      </div>
      <div className="col-md-6">
        <h4>Person List</h4>

        <ul className="list-group">
          {person &&
            person.map((p, index) => (
              <li
                className={
                  "list-group-item " + (index === currentIndexPerson ? "active" : "")
                }
                onClick={() => setActivePerson(p, index)}
                key={index}
              >
                {p.firstName}
              </li>
            ))}
        </ul>


        <button
          className="m-3 btn btn-sm btn-danger"
          onClick={removePerson}
        >
          Remove All Person
        </button>
      </div>

      <div className="col-md-6">
        {currentPerson ? (
          <div>
            <h4>Person</h4>
            <div>
              <label>
                <strong>FirstName:</strong>
              </label>{" "}
              {currentPerson.firstName}
            </div>
            <div>
              <label>
                <strong>LastName:</strong>
              </label>{" "}
              {currentPerson.lastName}
            </div>
            <div>
              <label>
                <strong>Address:</strong>
              </label>{" "}
              {currentPerson.address}
            </div>
            <div>
              <label>
                <strong>Phone:</strong>
              </label>{" "}
              {currentPerson.phone}
            </div>
            <Link 
              to={"/addPerson/" + currentPerson.id}
              className="badge badge-warning"
            >
              Edit
            </Link>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a Name for Details...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PersonList;
