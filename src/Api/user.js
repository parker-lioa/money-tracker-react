import axios from "axios";

const url = "http://35.194.230.183/api/accout";

// fecth user data

export const getUserData = async ({ email, name }) => {
  try {
    console.log(email, name);
    const { data } = await axios.get(`${url}?email=${email}&name=${name}`);
    console.log(data);
    return data;
  } catch (err) {
    console.log(err);
  }
};

// sign in

export const signIn = (data) => {
  const { email, name } = data;
  console.log(data);
  const response = axios
    .post(`${url}/signin`, data)
    .then((response) => {
      return response;
    })
    .catch((err) => {
      console.log(err);
    });

  return response;
};

// sign up

export const signUp = ({ email, name }) => {
  const data = { email, name };
  const response = axios
    .post(`${url}/signup`, data)
    .then((response) => {
      return response;
    })
    .catch((err) => {
      console.log(err);
    });

  return response;
};
