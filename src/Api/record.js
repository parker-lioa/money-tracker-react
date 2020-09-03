import axios from "axios";
import qs from "querystring";

const url = "http://35.194.230.183/api";

export const getData = async ({ id }) => {
  try {
    const { data } = await axios.get(`${url}/records?id=${id}`);
    console.log(data);
    return data;
  } catch (error) {
    console.log("something wrong when fecth data!");
    console.log(error);
  }
};

export const postData = (data) => {
  console.log(data);

  const config = {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  };

  axios
    .post(`${url}/records/`, qs.stringify(data), config)
    .then((response) => {
      console.log(response);
    })
    .catch((err) => {
      console.log(err);
    });
};

export const deleteData = ({ id }) => {
  console.log(id);
  const response = axios
    .delete(`${url}/records/update/${id}`)
    .then((response) => {
      return response;
    });
  return response;
};

export default { getData, postData };
