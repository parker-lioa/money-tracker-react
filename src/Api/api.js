import axios from 'axios';

const cors = 'https://cors-anywhere.herokuapp.com/'; 
const url = 'http://35.194.230.183/api';

const getData = async ()=>{
    try {

        const {data} = await axios.get(`${cors}${url}/records`);
        console.log(data);
        return data;

    } catch (error) {
        console.log("something wrong when fecth data!");
        console.log(error);
    }
};


export default getData;