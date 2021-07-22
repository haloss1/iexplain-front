import axios from "axios";

const getUsers = async ({ pageParam = 0 }) =>
  await axios
    .get(`https://iebe-dev.herokuapp.com/users?page=${pageParam}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("auth-token")}`,
      },
    })
    .then((response) => response.data)
    .catch((e) => new Error(e));

export default getUsers;
