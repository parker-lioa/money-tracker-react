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

// update user data

export const updateUserData = (data)=>{
  console.log(data);
  const {email,name,total_cost,total_money} = data;
  axios.post(`${url}/update?email=${email}&name=${name}&total_cost=${total_cost}&total_money=${total_money}`);
}

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
