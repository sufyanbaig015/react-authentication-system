import axios from "axios";  

const api = axios.create({      
    baseURL: "http://localhost:8000/api/v1",
});

// Attach Authorization header automatically if token is present
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers = config.headers || {}
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})


export const getCarByLotId = async (lotId) => {
  try {
    const response = await api.get(`/cars/get-car-by-lot-id?lot_id=${lotId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching car by lot ID:', error);
    throw error;
  }
};


export default api;
