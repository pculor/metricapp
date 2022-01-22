import Axios from 'axios';


const baseURL = process.env.REACT_APP_API_URL;

export const axios = Axios.create({ baseURL });

export const trimError = (error:any) => {
    if (!error) {
      return;
    }
    console.log(error.error.response.data.errors.message);
    const response = error.error.response && error.error.response.data.errors && error.error.response.data.errors.message.trim() || '';
    return response;
  };