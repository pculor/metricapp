import Axios from 'axios';


const baseURL = process.env.REACT_APP_API_URL;

export const axios = Axios.create({ baseURL });

export const trimError = (error:any) => {
    if (!error) {
      return;
    }
    const response = error.message.trim();
    return response;
  };