/* eslint-disable import/no-anonymous-default-export */
import axios from "axios";

const url = "http://localhost:3001/persons";

const getAll = () => {
  return axios
    .get(url)
    .then((response) => response.data)
    .catch((error) => console.log(error));
};

const addPerson = (newPerson) => {
  return axios
    .post(url, newPerson)
    .then((request) => request.data)
    .catch((error) => console.log(error));
};

const deletePerson = (id) => axios.delete(`${url}/${id}`);

const updatePerson = (id, newObject) =>
  axios.put(`${url}/${id}`, newObject).then((response) => response.data);

export default { getAll, addPerson, deletePerson, updatePerson };
