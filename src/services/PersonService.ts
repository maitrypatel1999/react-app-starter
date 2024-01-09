import http from "../http-common";
import IPerson from "../types/Person";

const getAll = () => {
  return http.get<Array<IPerson>>("/person");
};

const get = (id: any) => {
  return http.get<IPerson>(`/person/${id}`);
};

const create = (data: IPerson) => {
  return http.post<IPerson>("/person", data);
};

const update = (id: any, data: IPerson) => {
  return http.put<any>(`/person/${id}`, data);
};

const remove = (id: any) => {
  return http.delete<any>(`/person/${id}`);
};

const removeAll = () => {
  return http.delete<any>(`/person`);
};

const findByLastName = (lastName: string) => {
  return http.get<Array<IPerson>>(`/person/findByLastName?lastName=${lastName}`);
};

const PersonService = {
  getAll,
  get,
  create,
  update,
  remove,
  removeAll,
  findByLastName,
};

export default PersonService;
