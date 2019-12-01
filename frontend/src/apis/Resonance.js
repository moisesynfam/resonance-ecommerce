import axios from 'axios';


export default { 
    setAuthToken: (token) => {
        if(token) {
            axios.defaults.headers.common['Authorization'] = token;
        } else {
            delete axios.defaults.headers.common['Authorization'];

        }
    },
    auth: {
        register: async (formData) => {
            
            const response = await axios.post('/api/users/register', formData);
            const { data } = response;
            return data;
        },
        login: async (loginData) => {
            
            const response = await axios.post('/api/users/login', loginData);
            const { data } = response;
            return data;
        },
    }
}