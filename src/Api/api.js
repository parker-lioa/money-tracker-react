import axios from "axios";
import qs from "querystring";

const cors = "https://cors-anywhere.herokuapp.com/";
const url = "http://35.194.230.183/api";

export const getData = async () => {
  try {
    const { data } = await axios.get(`${cors}${url}/records`);
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
    .post(`${cors}${url}/records`, qs.stringify(data), config)
    .then((response) => {
      console.log(response);
    })
    .catch((err) => {
      console.log(err);
    });
    
};

export default { getData, postData };
