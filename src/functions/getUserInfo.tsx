import axios from "axios";

const getUserInfo = async () =>
  await axios
    .get(`https://reqres.in/api/users/${localStorage.getItem("user-id")}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("auth-token")}`,
      },
    })
    .then((response) => response.data)
    .catch((e) => new Error(e));

export default getUserInfo;
