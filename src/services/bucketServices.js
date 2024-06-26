import axios from 'axios';
const baseUrl =  import.meta.env.VITE_BASEURL



const axiosInstance = axios.create({
    baseURL: baseUrl, // assuming baseUrl is defined elsewhere
    headers: {
      'Content-Type': 'application/json',
    },
    maxBodyLength: Infinity,
  });


  
export const createBucketService = async (data) => {
    try {
      const response = await axiosInstance.post('/api/v1/bucket/create-bucket', data);
    //   console.log(JSON.stringify(response.data));
      return response.data; // Optionally return data to caller
    } catch (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // console.error('Server Error:', error.response.data);
        return error.response.data
      } else if (error.request) {
        // The request was made but no response was received
        // console.error('Request Error:', error.request);
        return error.request
      } else {
        // Something happened in setting up the request that triggered an Error
        // console.error('Error:', error.message);
        return error.message
      }
      throw error; // Optionally rethrow the error for the caller to handle
    }
  };


export const placeBallService = async (data) => {
    try {
      console.log(' data in service :: ' , data)
      const response = await axiosInstance.post('/api/v1/bucket/add-balls', data);
      return response.data; // Optionally return data to caller
    } catch (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // console.error('Server Error:', error.response.data);
        return error.response.data
      } else if (error.request) {
        // The request was made but no response was received
        // console.error('Request Error:', error.request);
        return error.request
      } else {
        // Something happened in setting up the request that triggered an Error
        // console.error('Error:', error.message);
        return error.message
      }
      throw error; // Optionally rethrow the error for the caller to handle
    }
  };


  export const getBucketService = async () => {
    try {
      const response = await axiosInstance.get('/api/v1/bucket');
      return response.data; // Optionally return data to caller
    } catch (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        console.error('Server Error:', error.response.data);
      } else if (error.request) {
        // The request was made but no response was received
        console.error('Request Error:', error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error('Error:', error.message);
      }
      throw error; // Optionally rethrow the error for the caller to handle
    }
  };